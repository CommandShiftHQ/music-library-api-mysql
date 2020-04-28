const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/sequelize');

describe('/albums', () => {
  let artist;

  beforeEach(done => {
    Artist.create({
      name: 'Tame Impala',
      genre: 'Rock',
    }).then(document => {
      artist = document;
      done();
    });
  });

  afterEach(done => {
    Artist.destroy({ where: {} }).then(() => done());
  });

  afterAll(done => {
    Album.sequelize.close().then(() => done());
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', done => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then(res => {
          expect(res.status).toBe(201);

          Album.findByPk(res.body.id, { raw: true }).then(album => {
            expect(album.name).toBe('InnerSpeaker');
            expect(album.year).toBe(2010);
            expect(album.artistId).toEqual(artist.id);
            done();
          });
        });
    });

    xit('returns a 404 and does not create an album if the artist does not exist', done => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then(res => {
          expect(res.status).toBe(404);
          expect(res.body.error).toBe('The artist could not be found.');

          Album.findAll({}, (err, albums) => {
            expect(err).toBe(null);
            expect(albums.length).toBe(0);
            done();
          });
        });
    });
  });
});
