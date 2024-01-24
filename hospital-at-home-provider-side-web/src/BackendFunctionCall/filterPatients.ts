export function filterPatients(queryString:string) {
    const url = `https://hosptial-at-home-js-api.azurewebsites.net/api/filterPatient2?code=HxYJ_tPohRTKCOZKfinm9f49rfEUxjvT5HfafRtVnRKKAzFujz7zkg==&${queryString}`;

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.json())
        .then(json => {
          resolve(json);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
  