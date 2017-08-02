const StickyService = {

  fetchStickies: (success) => {

    return fetch('/stickies', {
      headers: {
        Accept: 'application/json',
      },
    }).then(StickyService.checkStatus)
      .then(StickyService.parseJSON)
      .then(success);
  },

  updateSticky : (data) => {
    return fetch('/stickies', {
      method: 'put',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(StickyService.checkStatus);
  },

  createSticky : (data) => {
    return fetch('/stickies', {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(StickyService.checkStatus);
  },

  deleteSticky: (data) => {
    return fetch('/stickies', {
      method: 'delete',
      body: JSON.stringify(data),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(StickyService.checkStatus);
  },

  checkStatus: (response) => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const error = new Error(`HTTP Error ${response.message}`);
      error.status = response.message;
      error.response = response;
      console.log(error);
      throw error;
    }
  },



  parseJSON: (response) => {
    return response.json();
  }

}

export default StickyService;
