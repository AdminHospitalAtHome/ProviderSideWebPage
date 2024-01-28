import {getCommunicationId, getCommunicationToken} from "./BackendFunctionCall/Message";
import {expect, jest, test} from '@jest/globals'


// Mocking Learned from Stack Overflow
// https://stackoverflow.com/questions/64818305/simple-fetch-mock-using-typescript-and-jest

test('Init Chat Client', () => {
    jest.spyOn(global, 'fetch').mockImplementationOnce(
        jest.fn(
            () => Promise.resolve({
                json: () => Promise.resolve(
                    [{FirstName: "Jake", LastName: "Bob", CommunicationId: "ABCD"}])
            }),
        )
    )

    expect(getCommunicationId(1000)).resolves.toBe("ABCD");

})
