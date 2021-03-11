const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album, Song } = require('../src/models');

describe('/songs', () => {
  let artist;
  let album;

  before((done) => {
    Promise.all([
      Artist.sequelize.sync(),
      Album.sequelize.sync(),
      Song.sequelize.sync()
    ])
      .then(() => done())
      .catch((error) => done(error));
  });

  beforeEach((done) => {
    Promise.all([
      Artist.destroy({ where: {} }),
      Album.destroy({ where: {} }),
      Song.destroy({ where: {} })
    ])
      .then(() => Artist.create({ name: "Tame Impala", genre: "Rock" }))
      .then((artistDocument) => {
        artist = artistDocument;
      })
      .then(() => Album.create({ name: 'InnerSpeaker', year: 2010, artistId: artist.id }))
      .then((albumDocument) => {
        album = albumDocument;
        done();
      })
      .catch((error) => done(error));
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
          expect(res.status).to.equal(201);
          expect(res.body.name).to.equal('Solitude Is Bliss');
          expect(res.body.artistId).to.equal(artist.id);
          expect(res.body.albumId).to.equal(album.id);
          done();
        });
    });
  });
});
