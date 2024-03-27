export function getWebSocketAddressURL():Promise<string> {
  return new Promise(resolve => {
    fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/getWebSocketAccessToken')
      .then(response => response.json())
      .then(json => {
        resolve(json.url);
      });
  })

}
