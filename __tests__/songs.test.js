/* eslint-disable no-console */
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/sequelize');

describe('/songs', () => {
  let artist;
  let album;

  beforeAll(async (done) => {
    try {
      await Artist.sequelize.sync();
      await Album.sequelize.sync();
      await Song.sequelize.sync();
    } catch (err) {
      console.log(err);
    }
    done();
  });

  beforeEach(async (done) => {
    try {
      await Artist.destroy({ where: {} });
      await Album.destroy({ where: {} });
      await Song.destroy({ where: {} });
      artist = await Artist.create({
        name: 'Tame Impala',
        genre: 'Rock',
      });
      album = await Album.create({
        name: 'InnerSpeaker',
        year: 2010,
        artistId: artist.id,
      });
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

  describe('POST /album/:albumId/song', () => {
    it('creates a new song under an album', (done) => {
      request(app)
        .post(`/album/${album.id}/song`)
        .send({
          artist: artist.id,
          name: 'Solitude Is Bliss',
        })
        .then((res) => {
          expect(res.status).toBe(201);
          const songId = res.body.id;
          expect(res.body.id).toBe(songId);
          expect(res.body.name).toBe('Solitude Is Bliss');
          expect(res.body.artistId).toBe(artist.id);
          expect(res.body.albumId).toBe(album.id);
          done();
        });
    });
  });
});
