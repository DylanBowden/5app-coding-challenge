const request = require('supertest');
const assert = require('chai').assert;

const app = require('../index').app;
const server = require('../index').server;

describe('5app', () => {
  after((done) => {
    server.close(done);
  });

  it('returns 400 for missing payload', () => {
    return request(app)
      .post('/')
      .set('Accept', 'application/json')
      .send({ payloaded: [] })
      .expect(400);
  });

  it('returns 400 for invalid payload', () => {
    return request(app)
      .post('/')
      .set('Accept', 'application/json')
      .send({ payload: 'string' })
      .expect(400);
  });

  it('returns 200 for an empty payload', () => {
    return request(app)
      .post('/')
      .set('Accept', 'application/json')
      .send({ payload: [] })
      .expect(200);
  });

  it('filters out payloads with count not greater than 1', async () => {
    const payload = {
      payload: [
        {
          name: 'test',
          count: 1,
          logos: [
            { size: '64x64', url: 'goodUrl' }
          ]
        }
      ]
    };

    const res = await request(app)
      .post('/')
      .set('Accept', 'application/json')
      .send(payload)
      .expect(200);

    assert.equal(res.body.response.length, 0);
  });

  it('filters correct logo', async () => {
    const payload = {
      payload: [
        {
          name: 'test',
          count: 2,
          logos: [
            { size: '63x64', url: 'badUrl' },
            { size: '64x64', url: 'goodUrl' }
          ]
        }
      ]
    };

    const res = await request(app)
      .post('/')
      .set('Accept', 'application/json')
      .send(payload)
      .expect(200);

    const response = res.body.response;

    assert.equal(response[0].name, 'test');
    assert.equal(response[0].count, 2);
    assert.equal(response[0].thumbnail, 'goodUrl');
  });

  it('handles the sample request', async () => {
    const payload = {
      payload: [
        {
          name: 'Molly',
          count: 12,
          logos: [{
            size: '16x16',
            url: 'https://example.com/16x16.png'
          }, {
            size: '64x64',
            url: 'https://example.com/64x64.png'
          }]
        },
        {
          name: 'Dolly',
          count: 0,
          logos: [{
            size: '128x128',
            url: 'https://example.com/128x128.png'
          }, {
            size: '64x64',
            url: 'https://example.com/64x64.png'
          }]
        },
        {
          name: 'Polly',
          count: 4,
          logos: [{
            size: '16x16',
            url: 'https://example.com/16x16.png'
          }, {
            size: '64x64',
            url: 'https://example.com/64x64.png'
          }]
        }
      ]
    };

    const res = await request(app)
      .post('/')
      .set('Accept', 'application/json')
      .send(payload)
      .expect(200);

    const response = res.body.response;

    assert.equal(response.length, 2);

    assert.equal(response[0].name, 'Molly');
    assert.equal(response[0].count, 12);
    assert.equal(response[0].thumbnail, 'https://example.com/64x64.png');

    assert.equal(response[1].name, 'Polly');
    assert.equal(response[1].count, 4);
    assert.equal(response[1].thumbnail, 'https://example.com/64x64.png');
  });
});
