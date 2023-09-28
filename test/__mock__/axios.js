const axios = jest.createMockFromModule('axios');

axios.get = jest.fn((link) => {
  if (link === 'valid-example') {
    return Promise.resolve({ 
      text: 'Valid Link',
      href: 'valid-example',
      file: 'valid.md',
      status: 200,
      statusText: 'OK',
    });
  } else if (link === 'invalid-example') {
    return Promise.reject({ 
      response: {
        text: 'Invalid Link',
        href: 'invalid-example',
        file: 'invalid.md',
        status: 404,
        statusText: 'Fail',
      },
    });
  } else {
    return Promise.resolve(); // Simulate no response
  }
});

module.exports = axios;