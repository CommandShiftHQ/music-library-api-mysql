const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/sequelize');

describe('/albums', () => {
  let artist;

  beforeAll(async (done) => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
    done();
  });

  beforeEach(async (done) => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
    } catch (err) {
      console.log(err);
    }
    done();
  });

  afterAll(async (done) => {
    try {
      await Album.sequelize.close();
    } catch (err) {
      console.log(err);
    }
    done();
  });

  describe('POST /artists/:artistId/albums', () => {
    it('creates a new album for a given artist', (done) => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).toBe(201);

          Album.findByPk(res.body.id, { raw: true }).then((album) => {
            expect(album.name).toBe('InnerSpeaker');
            expect(album.year).toBe(2010);
            expect(album.artistId).toEqual(artist.id);
            done();
          });
        });
    });

    it('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).toBe(404);
          expect(res.body.error).toBe('The artist could not be found.');

          Album.findAll().then((albums) => {
            expect(albums.length).toBe(0);
            done();
          });
        });
    });
  });
});
