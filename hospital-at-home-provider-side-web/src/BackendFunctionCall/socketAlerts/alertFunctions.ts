export function viewedAlerts(id: string, providerId: number) {
  let datetime: string = new Date().toISOString();
  fetch('https://hosptial-at-home-js-api.azurewebsites.net/api/addDoctorView', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({'AlertID' : id, 'ProviderId': providerId, 'DateTimeViewed': datetime})
  })
}


export async function getHistoricalAlerts() {
  let url = "https://hosptial-at-home-js-api.azurewebsites.net/api/getPastAlerts";
  const res = await fetch(url);
  return await res.json();
}

export async function getAlertViews(alertId: string){
  let url = `https://hosptial-at-home-js-api.azurewebsites.net/api/getAlertViews?AlertId=${alertId}`;
  const res= await fetch(url);
  return await res.json();
}
