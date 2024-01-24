import {ChatClient, ChatThreadClient} from "@azure/communication-chat";
import {AzureCommunicationTokenCredential} from "@azure/communication-common";
import {getAllPatients} from "./getPatientList";
import React from "react";

export const endpointUrl =
  'https://hospitalathomechat.unitedstates.communication.azure.com';
//reference of mobile app function:https://github.com/AdminHospitalAtHome/2023-2024seniorProjectTest/blob/main/SeniorProjectApp/BackEndFunctionCall/ChatFunctions/Message.ts
//reference of web app functions: https://github.com/AdminHospitalAtHome/ProviderWebPage/blob/main/ProviderWebPage/app/BackendFunctions/Chat/Message.ts

export let temp_communicationId: string = ''
let temp_provider_name: string = ''

export function initChatClient(userId: number): Promise<ChatClient | undefined> {
  return new Promise<ChatClient | undefined>((resolve) => {
    getCommunicationId(userId).then(res => {
      temp_communicationId = res
      getCommunicationToken(res).then(accessToken => {
        resolve(new ChatClient(endpointUrl, new AzureCommunicationTokenCredential(accessToken)));
      }).catch(() => {
        console.error("Failed to init chat client");
        resolve(undefined);
      });
    }).catch(() => {
      console.error("Failed to init chat client");
      resolve(undefined);
    });
  });
}

export function getAllThreads(chatClient: ChatClient): Promise<ChatThreadClient[]> {
  return new Promise<ChatThreadClient[]>(async (resolve) => {
    const threads = chatClient.listChatThreads()
    let threadClients: ChatThreadClient[] = [];
    for await (const t of threads) {
      try {
        if (!t.deletedOn) {
          threadClients.push(chatClient.getChatThreadClient(t.id))
        }

      } catch {

      }
    }
    resolve(threadClients);
  })
}


export function getCommunicationId(userId: number): Promise<string> {
  return new Promise((resolve, reject) => {
    // Checking if we have a providerID or a PatinetID. PatientIDs are 9 digits and providerIDs are 6. Both can not have a leading zero so this works.
    let fetchString: string = '';
    if (userId > 999999) {
      fetchString = `/getCommunicationId?patientID=${userId}`;
    } else {
      fetchString = `/getProviderById?providerID=${userId}`;
    }
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api${fetchString}`,
    )
      .then(res => res.json())
      .then(res => {
        if (res.length === 1) {
          if (userId < 1000000) {
            temp_provider_name = res[0].FirstName + ' ' + res[0].LastName
          }

          // noinspection JSUnresolvedReference
          resolve(res[0].CommunicationId);


        } else {
          reject('failed to get communicationId');
        }
      });
  });
}

export function getCommunicationToken(communicationId: string): Promise<string> {
  return new Promise((resolve) => {
    fetch(
      `https://hosptial-at-home-js-api.azurewebsites.net/api/getUserToken?userId=${communicationId}`,
    )
      .then(res => res.json())
      .then(res => {
        resolve(res.token);
      });
  });
}

export async function getParticipantInThread(chatThreadClient: ChatThreadClient, communicationID: string) {
  return new Promise<string | undefined>(async (resolve) => {

    try {
      let participants = chatThreadClient.listParticipants()
      for await (const p of participants) {
        //@ts-ignore
        if (p.id.communicationUserId !== communicationID) {
          resolve(p.displayName);
        }
      }
    } catch {
      console.log('error: get participant in thread function')
    }
    resolve("Error");
  });
}

export function getThreadLastMessage(chatThreadClient: ChatThreadClient) {
  return new Promise(async (resolve) => {
    try {
      let messages = chatThreadClient.listMessages()
      messages.next().then((res) => {
        resolve(res.value)
        return;
      }).catch(() => {
        resolve(undefined);
      })
    } catch {
      console.log('error: [function]getThreadLastMessage')
      resolve(undefined)
    }

  })
}

export function getPatients(): Promise<{ name: string, value: number }[]> {
  return new Promise((resolve) => {
    let patients: { name: string, value: number }[] = []
    getAllPatients().then((output) => {

      //@ts-ignore
      const patientIdsAndLastNames = output.map(patient => ({
        value: patient.PatientID,
        name: (patient.FirstName + " " + patient.LastName)
      }));


      resolve(patientIdsAndLastNames);
    })

  })
}

// Based Off Azure Sample Code: https://github.com/Azure-Samples/communication-services-javascript-quickstarts/blob/main/add-chat/client.js
export function createNewThread(selectedPatient: number,
                                chatClient: ChatClient,
                                providerCommunicationID: string,
                                dropDownOptions: {
                                  name: string,
                                  value: number
                                }[],
                                threadClients: ChatThreadClient[]
): Promise<ChatThreadClient | undefined> {

  let patientName = '';
  dropDownOptions.map(patient => {
    if (patient.value === selectedPatient) {
      patientName = patient.name;
    }
  })

  return new Promise((resolve) => {
    getCommunicationId(selectedPatient).then(async (patientCommunicationID) => {

        // Check if Chat already Exists:
        for (const threadClient of threadClients) {
          let participants = threadClient.listParticipants()
          for await (const p of participants) {
            try {
              //@ts-ignore
              if (p.id.communicationUserId === patientCommunicationID) {
                resolve(threadClient);
                return;
              }
            } catch {
            }
          }
        }

        const createChatThreadRequest = {
          topic: 'Chat with ' + patientName + ' (' + selectedPatient + ')'
        }
        const createChatThreadOptions = {
          participants: [
            { // Provider
              id: {communicationUserId: providerCommunicationID},
              displayName: temp_provider_name,
            },
            { // Patient
              id: {communicationUserId: patientCommunicationID},
              displayName: patientName,
            }
          ]
        }

        chatClient.createChatThread(createChatThreadRequest, createChatThreadOptions)
          .then(res => {
            if (res.chatThread) {
              resolve(chatClient.getChatThreadClient(res.chatThread.id));
            } else {
              resolve(undefined); // Todo: Maybe Change
            }


          })
      }
    )

  })

}

export function deleteThread(chatClient: ChatClient, setThread: React.Dispatch<React.SetStateAction<ChatThreadClient | undefined>>, currentThread: ChatThreadClient) {
  return new Promise((resolve) => {
    let threadId = currentThread.threadId;
    chatClient.deleteChatThread(threadId).then(() => {

      setThread(undefined);
      resolve(null);
    })

  })


}


export function parseDateTime(dateTime: string): string {
  let tempDateObject: Date = new Date(dateTime);
  tempDateObject.setMinutes(
    tempDateObject.getMinutes() - tempDateObject.getTimezoneOffset(),
  );
  let tmpDate = tempDateObject.toISOString().split('T')[0].split('-');
  let tmpDateString = tmpDate[1] + '-' + tmpDate[2] + '-' + tmpDate[0];
  let tmpTime = tempDateObject.toISOString().split('T')[1].split(':');
  let tmpHour = parseInt(tmpTime[0]);
  let tmpTimeString = '';
  if (tmpHour > 12) {
    tmpTimeString = String(tmpHour - 12) + ':' + tmpTime[1] + ' PM';
  } else if (tmpHour === 0) {
    tmpTimeString = String(tmpHour + 12) + ':' + tmpTime[1] + 'AM';
  } else {
    tmpTimeString = String(tmpHour) + ':' + tmpTime[1] + ' AM';
  }
  return tmpDateString + ' '  + tmpTimeString;

}

