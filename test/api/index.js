const request = require('supertest');
const server = require('../../api/index');

describe('Server', () => {
  it('GET / redirects to /docs', (done) => {
    request(server)
      .get('/')
      .expect(302, done);
  });

  it('response to 404 unsupported routes', (done) => {
    request(server)
      .get('/invalid')
      .expect(404, done);
  });
});
