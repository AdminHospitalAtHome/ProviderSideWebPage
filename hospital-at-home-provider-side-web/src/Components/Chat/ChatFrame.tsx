import React, {useMemo} from 'react'
import {
  ChatAdapter,
  ChatComposite, fromFlatCommunicationIdentifier,
  useAzureCommunicationChatAdapter
} from "@azure/communication-react";
import {ChatThreadClient} from "@azure/communication-chat";
import {endpointUrl} from '../../BackendFunctionCall/Message'
import {AzureCommunicationTokenCredential, CommunicationUserIdentifier} from "@azure/communication-common";

export default function ChatFrame({thread, communicationID, communicationToken}: {
  thread: ChatThreadClient,
  communicationID: string,
  communicationToken: string
}): React.JSX.Element {

  const userId = useMemo(() => {
    return fromFlatCommunicationIdentifier(communicationID) as CommunicationUserIdentifier
  }, [communicationID]);

  const credential = useMemo(() => {
    return new AzureCommunicationTokenCredential(communicationToken);
  }, [communicationToken]);

  const adapter: ChatAdapter | undefined = useAzureCommunicationChatAdapter({
    endpoint: endpointUrl,
    userId: userId,
    displayName: "TEMP NAME",
    credential: credential,
    threadId: thread.threadId
  });

  if (adapter) {
    return (
      <div>
        <ChatComposite adapter={adapter}
                       options={{
                         errorBar: true
                       }}
        ></ChatComposite>
      </div>
    );
  } else {
    return <div/>
  }
}
