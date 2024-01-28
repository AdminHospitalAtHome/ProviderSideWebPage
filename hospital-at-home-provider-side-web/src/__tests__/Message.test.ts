import {getCommunicationId} from "../BackendFunctionCall/Message";
// it is very important to import jest and the other things you need just like this. Otherwise the mock function
// calls may break in weird ways.
import {expect, jest, test} from '@jest/globals'


// Mocking Learned from Stack Overflow
// https://stackoverflow.com/questions/64818305/simple-fetch-mock-using-typescript-and-jest
// https://stackoverflow.com/questions/32055287/what-is-the-difference-between-describe-and-it-in-jest

// Describe allows you to group Tests
describe('Gets Communication ID', () => {
  // Here I am creating a test case to test getCommunicationID which uses a fetch call.
  test('Patient: Get Communication ID', async () => {
    // jest.spyOn allows you to get a method from a class, in this case fetch from global and modify its behavior
    // I use mockImplementationOnce to ensure that my new fake fetch function is only used once, so it does not
    // get used by the other tests. other tests.
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      // jest.fn is used to create a fake "Mock" function that can be run instead of the real function you are spying on.
      // The ts ignore is necissary or it will get angry...
      //@ts-ignore
      jest.fn(
        // here, we don't need the input to the fetch call, so we can just pretend it isn't there
        () => {
          // because we are mocking a fetch call, we need it to return the exact same type of thing that a normal fetch
          // would, or it could break our test. In this case we return a promise, that can has a .json attribute which is
          // another promise that actually returns our json.
          return Promise.resolve({
            json: () => Promise.resolve(
              // Put whatever JSON you want to be output from the function here.
              [{CommunicationId: "Sample_Communication_Id"}])
          });
        },
      )
    )

    await expect(getCommunicationId(100000001)).resolves.toBe("Sample_Communication_Id");

  })

  // Here I use another test to for the provider's
  test('Provider: Get Communication ID', async () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
      //@ts-ignore
      jest.fn(
        () => {
          return Promise.resolve({
            json: () => Promise.resolve(
              [{FirstName: "Sample_FirstName", LastName: "Sample_LastName", CommunicationId: "Sample_Communication_Id"}])
          });
        },
      )
    )

    await expect(getCommunicationId(100001)).resolves.toBe("Sample_Communication_Id");

  })

})

