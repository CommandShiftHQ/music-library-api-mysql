const request = require('supertest');
const { Artist } = require('../src/sequelize');
const app = require('../src/app');

describe('/artists', () => {
  beforeEach(done => {
    Artist.destroy({
      where: {},
    }).then(() => done());
  });

  afterAll(done => {
    Artist.destroy({
      where: {},
    }).then(() => Artist.sequelize.close().then(() => done()));
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

  describe('with artists in the database', () => {
    let artists;
    beforeEach(done => {
      Promise.all([
        Artist.create({ name: 'Tame Impala', genre: 'Rock' }),
        Artist.create({ name: 'Kylie Minogue', genre: 'Pop' }),
        Artist.create({ name: 'Dave Brubeck', genre: 'Jazz' }),
      ]).then(documents => {
        artists = documents;
        done();
      });
    });

    describe('GET /artists', () => {
      xit('gets all artist records', done => {
        request(app)
          .get('/artists')
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(3);

            res.body.forEach(artist => {
              const expected = artists.find(a => a.id.toString() === artist.id);
              expect(artist.name).toBe(expected.name);
              expect(artist.genre).toBe(expected.genre);
            });
            done();
          });
      });
    });

    describe('GET /artist/:artistId', () => {
      xit('gets artist record by id', done => {
        const artist = artists[0];
        request(app)
          .get(`/artists/${artist.id}`)
          .then(res => {
            expect(res.status).toBe(200);
            expect(res.body.name).toBe(artist.name);
            expect(res.body.genre).toBe(artist.genre);
            done();
          });
      });

      xit('returns a 404 if the artist does not exist', done => {
        request(app)
          .get('/artists/12345')
          .then(res => {
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('The artist could not be found.');
            done();
          });
      });
    });

    describe('PATCH /artists/:artistId', () => {
      xit('updates artist genre by id', done => {
        const artist = artists[0];
        request(app)
          .patch(`/artists/${artist.id}`)
          .send({ genre: 'Psychedelic Rock' })
          .then(res => {
            expect(res.status).toBe(200);
            Artist.find({ where: { id: artist.id } }, (_, updatedArtist) => {
              expect(updatedArtist.genre).toBe('Psychedelic Rock');
              done();
            });
          });
      });

      xit('returns a 404 if the artist does not exist', done => {
        request(app)
          .patch('/artists/12345')
          .send({ genre: 'Psychedelic Rock' })
          .then(res => {
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('The artist could not be found.');
            done();
          });
      });
    });

    describe('DELETE /artists/:artistId', () => {
      xit('deletes artist record by id', done => {
        const artist = artists[0];
        request(app)
          .delete(`/artists/${artist.id}`)
          .then(res => {
            expect(res.status).toBe(204);
            Artist.find({ where: { id: artist.id } }, (error, updatedArtist) => {
              expect(error).toBe(null);
              expect(updatedArtist).toBe(null);
              done();
            });
          });
      });

      xit('returns a 404 if the artist does not exist', done => {
        request(app)
          .delete('/artists/12345')
          .then(res => {
            expect(res.status).toBe(404);
            expect(res.body.error).toBe('The artist could not be found.');
            done();
          });
      });
    });
  });
});
