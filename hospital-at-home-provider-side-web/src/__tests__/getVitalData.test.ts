import {expect, jest, test} from '@jest/globals'
import {getWeight} from "../BackendFunctionCall/getVitalData";


beforeEach(() => {
  // This is needed since the gitHub Auto test server is running in a different timezone
  jest.spyOn(Date.prototype, 'getTimezoneOffset').mockImplementation(
    jest.fn(
      () => {
        return 300;
      }
    )
  )
})


afterEach(() => {
  // this sets everything back to normal after each test so other tests are not affected.
  jest.restoreAllMocks()
})


test('Get Weight Data', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
        jest.fn(
          () => {
              return Promise.resolve({
                json: () => {
                  return Promise.resolve(
                    [
                      {
                        "UniqueID": 707,
                        "PatientID": 100000001,
                        "DateTimeTaken": "2023-12-11T20:31:00.090Z",
                        "WeightInPounds": 123,
                        "IfManualInput": true
                      },
                      {
                        "UniqueID": 708,
                        "PatientID": 100000001,
                        "DateTimeTaken": "2023-12-11T20:53:35.207Z",
                        "WeightInPounds": 124,
                        "IfManualInput": true
                      },
                      {
                        "UniqueID": 709,
                        "PatientID": 100000001,
                        "DateTimeTaken": "2023-12-11T20:57:47.393Z",
                        "WeightInPounds": 125,
                        "IfManualInput": false
                      }
                    ]
                  );
                }
              })
          }
        )
    );



    await expect(getWeight(100000001,
      "2023-12-11T00:00:00.000Z",
      "2023-12-12T00:00:00.000Z")).resolves.toStrictEqual(
      [
        [
          "12-11-2023\n3:31 PM",
          123,
          true
        ],
        [
          "12-11-2023\n3:53 PM",
          124,
          true
        ],
        [
          "12-11-2023\n3:57 PM",
          125,
          false
        ]
      ]
    )

})
