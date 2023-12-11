const supertest = require('supertest');
const { app, server, closeServer } = require('../../../src/server/server'); // Adjust the path accordingly

const request = supertest(app);

describe('Server Tests', () => {
  afterAll(() => {
    closeServer();
  });

  it('should return the main HTML file for GET /', async () => {
    const response = await request.get('/');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });

//   it('should store data and return it for POST /add', async () => {
//     const postData = {
//       depCity: 'Departure City',
//       arrCity: 'Arrival City',
//       depDate: '2023-05-01',
//       weather: 'Sunny',
//       daysLeft: 5,
//     };

//     const response = await request.post('/add').send(postData);

//     expect(response.status).toBe(200);
//     expect(response.body).toEqual(postData);
//   });
});
