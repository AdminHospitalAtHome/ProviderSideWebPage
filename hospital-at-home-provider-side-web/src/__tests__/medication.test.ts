import { addPatientMedication, getPatientMedication, updatePatientMedication } from "../BackendFunctionCall/MedicationFunctions"
import { addPatientNote, getPatientNotes } from "../BackendFunctionCall/NoteFunctions"
import {expect, jest, test} from '@jest/globals'
describe('Add patient Medication', () => {
  test('Add Patient Medication', async () => {
   const addedSuccessMessage =  {
    message:"Patient medication record successfully added."
    }
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
    await expect(addPatientMedication(100000001, "Amiodarone", "2", "pill", "heart", 3),).resolves.toStrictEqual(addedSuccessMessage);
   
    
  })

  
})

describe('Update patient medication', () => {
    test('Update patient medication', async () => {
     const mockPatientMedication = [
      {
        "id": 1,
        "amount": "2",
        "unit": "pill",
      }
    ]
  
      jest.spyOn(global, 'fetch').mockImplementationOnce(
        //@ts-ignore
        jest.fn(
          () => {
            return Promise.resolve({
              json: () => {
                return Promise.resolve(
                  mockPatientMedication
                )
              }
            })
          }
        )
      )
  
  
   await expect(updatePatientMedication(1, "2","pill")).resolves.toStrictEqual(mockPatientMedication);
  
    })
  
  })
