const request = require('supertest');
const api = require('../../src/index');

let server;
describe('Server', () => {
  before(async () => {
    server = await api.start();
  });

  after(async () => {
    await api.close();
  });

  it('GET / redirects to /docs', async () => {
    const response = await request(server).get('/');
    expect(response.status).to.equal(302);
  });

  it('response to 404 unsupported routes', async () => {
    const response = await request(server).get('/invalid');
    expect(response.status).to.equal(404);
  });
});
