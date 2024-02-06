import { addPatientNote, getPatientNotes } from "../BackendFunctionCall/NoteFunctions"
import {expect, jest, test} from '@jest/globals'
describe('Add patient Notes', () => {
  test('Add Patient Notes', async () => {
   const addedSuccessMessage = {message: "Added Patient Note"}

    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
      jest.fn(
        () => {
          return Promise.resolve({
            json: () => {
              return Promise.resolve(
                addedSuccessMessage
              )
            }
          })
        }
      )
    )
    await expect(addPatientNote("Subjective", "testing", 100000001),).resolves.toStrictEqual(addedSuccessMessage);
   
    
  })

  

})


describe('Gets Patient Notes', () => {
  test('Get Patient Notes', async () => {
   const mockPatientNote = [
    {
      "patientID": 200001,
      "noteText": "testing",
      "noteType": "Subjective",
      "id": 20
    }
  ]

    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
      jest.fn(
        () => {
          return Promise.resolve({
            json: () => {
              return Promise.resolve(
                mockPatientNote
              )
            }
          })
        }
      )
    )


 await expect(getPatientNotes(200001)).resolves.toStrictEqual(mockPatientNote);

  })

})


describe('Update Patient Notes', () => {
  test('Update Patient Note', async () => {
   const updatedSuccessMessage = {message: "Patient notes updated successfully."}

    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
      jest.fn(
        () => {
          return Promise.resolve({
            json: () => {
              return Promise.resolve(
                updatedSuccessMessage
              )
            }
          })
        }
      )
    )


  await expect(getPatientNotes(200001)).resolves.toStrictEqual(updatedSuccessMessage);

  })

})




describe('Delete Patient Notes', () => {
  test('Delete Patient Note', async () => {
   const deleteSuccessMessage = {message:"note deleted successfully"}


    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
      jest.fn(
        () => {
          return Promise.resolve({
            json: () => {
              return Promise.resolve(
                deleteSuccessMessage
              )
            }
          })
        }
      )
    )


  await expect(getPatientNotes(200001)).resolves.toStrictEqual(deleteSuccessMessage);

  })

})