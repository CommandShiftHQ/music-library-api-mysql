const request = require('supertest');
const { Artist } = require('../src/sequelize');
const app = require('../src/app');

describe('/artists', () => {
  beforeAll(async (done) => {
    try {
      await Artist.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
    done();
  });

  beforeEach(async (done) => {
    try {
      await Artist.destroy({ where: {} });
    } catch (err) {
      console.log(err);
    }
    done();
  });

  afterAll(async (done) => {
    try {
      await Artist.sequelize.close();
    } catch (err) {
      console.log(err);
    }
    done();
  });

  describe('POST /artists', () => {
    it('creates a new artist in the database', async () => {
      const response = await request(app).post('/artists').send({
        name: 'Tame Impala',
        genre: 'Rock',
      });

      await expect(response.status).toBe(201);
      await expect(response.body.name).toBe('Tame Impala');

      const insertedArtistRecords = await Artist.findByPk(response.body.id, { raw: true });
      await expect(insertedArtistRecords.name).toBe('Tame Impala');
      await expect(insertedArtistRecords.genre).toBe('Rock');
    });
  });

  describe('with artists in the database', () => {
    let artists;
    beforeEach((done) => {
      Promise.all([
        Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
        Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
        Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
      ]).then((documents) => {
        artists = documents;
        done();
      });
    });

    describe('GET /artists', () => {
      it('gets all artist records', (done) => {
        request(app)
          .get('/artists')
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);
            res.body.forEach((artist) => {
              const expected = artists.find((a) => a.id === artist.id);
              expect(artist.name).toBe(expected.name);
              expect(artist.genre).toBe(expected.genre);
            });
            done();
          });
      });
    });

    describe('GET /artists/:artistId', () => {
      it('gets artist record by id', (done) => {
        const artist = artists[0];
        request(app)
          .get(`/artists/${artist.id}`)
          .then((res) => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(artist.name);
            expect(res.body.genre).toBe(artist.genre);
            done();
          });
      });

      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .get('/artists/12345')
          .then((res) => {
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('The artist could not be found.');
            done();
          });
      });
    });

    describe('PATCH /artists/:artistId', () => {
      it('updates artist genre by id', (done) => {
        const artist = artists[0];
        request(app)
          .patch(`/artists/${artist.id}`)
          .send({ genre: 'Psychedelic Rock' })
          .then((res) => {
            expect(res.status).toBe(200);
            Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
              expect(updatedArtist.genre).toBe('Psychedelic Rock');
              done();
            });
          });
      });

      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .patch('/artists/12345')
          .send({ genre: 'Psychedelic Rock' })
          .then((res) => {
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('The artist could not be found.');
            done();
          });
      });
    });

    describe('DELETE /artists/:artistId', () => {
      it('deletes artist record by id', (done) => {
        const artist = artists[0];
        request(app)
          .delete(`/artists/${artist.id}`)
          .then((res) => {
            expect(res.status).toBe(204);
            Artist.findByPk(artist.id, { raw: true }).then((updatedArtist) => {
              expect(updatedArtist).toBe(null);
              done();
            });
          });
      });

      it('returns a 404 if the artist does not exist', (done) => {
        request(app)
          .delete('/artists/12345')
          .then((res) => {
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('The artist could not be found.');
            done();
          });
      });
    });
  });
});
