/* eslint-disable no-console */
const { expect } = require('chai');
const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/models');

describe('/albums', () => {
  let artist;

  before((done) => {
    Promise.all([
      Artist.sequelize.sync(),
      Album.sequelize.sync()
    ])
      .then(() => done())
      .catch((error) => done(error));
  });

  beforeEach((done) => {
    Promise.all([
      Artist.destroy({ where: {} }),
      Album.destroy({ where: {} }),
    ])
      .then(() => Artist.create({ name: "Tame Impala", genre: "Rock" }))
      .then((artistDocument) => {
        artist = artistDocument;
        done();
      })
      .catch((error) => done(error));
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
          console.log(res.body)
          expect(res.status).to.equal(201);
          return Album.findByPk(res.body.id, { raw: true });
        })
        .then((album) => {
          expect(album.name).to.equal('InnerSpeaker');
          expect(album.year).to.equal(2010);
          expect(album.artistId).to.equal(artist.id);
          done();
        })
        .catch((error) => done(error));;
    });

    xit('returns a 404 and does not create an album if the artist does not exist', (done) => {
      request(app)
        .post('/artists/1234/albums')
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then((res) => {
          expect(res.status).to.equal(404);
          expect(res.body.error).to.equal('The artist could not be found.');

          return Album.findAll();
        })
        .then((albums) => {
          expect(albums.length).to.equal(0);
          done();
        })
        .catch((error) => done(error));
    });
  });
});
