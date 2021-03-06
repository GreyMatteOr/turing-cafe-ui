const url = 'http://localhost:3001/api/v1/';

const reqs = {
  getResos() {
    return fetch(url + 'reservations')
    .then(response => {
      if (response.ok) return response.json();
      else return 'error';
    });
  },

  postNewReso(reso) {
    return fetch(url + 'reservations', {
      method: 'POST',
      body: JSON.stringify(reso),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json());
  },

  deleteRose(id) {
    return fetch(url+ `reservations/${id}`, {
      method: 'DELETE'
    }).then(response => response.json());
  }
}

export default reqs;
