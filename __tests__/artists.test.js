const request = require('supertest');
const { Artist } = require('../src/sequelize');
const app = require('../src/app');

describe('/artists', () => {
  beforeEach(done => {
    Artist.destroy({
      where: {},
    }).then(() => done());
  });

  afterAll(() => {
    Artist.sequelize.close();
  });

  describe('POST /artists', () => {
    it('creates a new artist in the database', done => {
      request(app)
        .post('/artists')
        .send({
          name: 'Tame Impala',
          genre: 'Rock',
        })
        .then(res => {
          expect(res.status).toBe(201);
          expect(res.body.name).toBe('Tame Impala');
          Artist.findAll({}).then(artists => {
            expect(artists.length).toBe(1);
            done();
          });
        });
    });
  });
});
