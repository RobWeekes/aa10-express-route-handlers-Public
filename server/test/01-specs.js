const chai = require("chai");
let chaiHttp = require("chai-http");
let server;
// WAS getting error msg when running npm test \/ - I had to run "npm install" in server folder!
// Instead change the require of chai.js in C:\Users\weeke\Git\aa10-express-route-handlers\server\test\01-specs.js to a dynamic import() which is available in all CommonJS modules.
chai.use(chaiHttp);
const expect = chai.expect;

describe("01 - GET /artists", () => {
  // Reset all the data:
  before(() => {
    const path = require('path');

    const data = path.resolve(__dirname, '../data.js');
    const app = path.resolve(__dirname, '../app.js');
    const artists = path.resolve(__dirname, '../seeds/artists.json');
    const albums = path.resolve(__dirname, '../seeds/albums.json');
    const songs = path.resolve(__dirname, '../seeds/songs.json');

    delete require.cache[data];
    delete require.cache[app];
    delete require.cache[artists];
    delete require.cache[albums];
    delete require.cache[songs];

    server = require("../app");
  });

  describe("GET /artists", () => {
    it("returns all the artists in the server data as an array of artist objects", async () => {
      await chai
        .request(server)
        .get("/artists")
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.eql([ { artistId: 1, name: 'Red Hot Chili Peppers' } ]);
        });
    });
  });
});
