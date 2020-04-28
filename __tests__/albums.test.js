const request = require('supertest');
const app = require('../src/app');
const { Artist, Album } = require('../src/sequelize');

describe('/albums', () => {
  let artist;

  beforeEach(done => {
    Artist.destroy({
      where: {},
    }).then(() => {
      Artist.create(
        {
          name: 'Tame Impala',
          genre: 'Rock',
        },
        (_, document) => {
          artist = document;
          done();
        },
      );
    });
  });

  afterAll(done => {
    Artist.destroy({
      where: {},
    })
      .then(() =>
        Album.destroy({
          where: {},
        }),
      )
      .then(() => Artist.sequelize.close().then(() => done()));
  });

  describe('POST /artists/:artistId/albums', () => {
    xit('creates a new album for a given artist', done => {
      request(app)
        .post(`/artists/${artist.id}/albums`)
        .send({
          name: 'InnerSpeaker',
          year: 2010,
        })
        .then(res => {
          expect(res.status).toBe(201);

          Album.findByPk({ where: { id: artist.id } }, album => {
            expect(album.dataValues.name).toBe('InnerSpeaker');
            expect(album.dataValues.year).toBe(2010);
            expect(album.dataValues.artist).toEqual(artist.id);
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
