const request = require('supertest');
const api = require('../../api/index');

let server;
describe('Server', () => {
  before(async () => {
    server = await api.start();
  });

  after(async () => {
    await api.close();
  });

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
