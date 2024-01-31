import {expect, jest, test} from '@jest/globals'
import { getPatientNotes } from '../BackendFunctionCall/NoteFunctions';

describe('Gets Alert Level', () => {
  test('Has Data: Get Alert Level', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
      jest.fn(
        () => {
          return Promise.resolve({
            json: () => Promise.resolve(
              [
                {
                  "UniqueID": 1,
                  "PatientID": 100000001,
                  "Weight_Level": 1,
                  "Heart_Rate_Level": 2,
                  "Blood_Oxygen_Level": 0,
                  "Blood_Pressure_Level": 0
                }
              ]
            )
          })
        }
      )
    )


    await expect(getAlertLevel(100000001)).resolves.toStrictEqual([1, 2, 0, 0]);

  })

  test('No Data: Get Alert Level', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
      jest.fn(
        () => {
          return Promise.resolve({
            json: () => Promise.resolve(
              []
            )
          })
        }
      )
    )


    await expect(getAlertLevel(100000002)).resolves.toStrictEqual([-1, -1, -1, -1]);

  })
});
