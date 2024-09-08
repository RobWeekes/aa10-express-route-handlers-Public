// Phase 2
const {
  getAllArtists,
  getLatestArtist,
  getArtistByArtistId,
  addArtist,
  editArtistByArtistId,
  deleteArtistByArtistId,
  getAlbumsForLatestArtist,
  getAlbumsByArtistId,
  getAlbumByAlbumId,
  addAlbumByArtistId,
  editAlbumByAlbumId,
  deleteAlbumByAlbumId,
  getFilteredAlbums,
  getSongsByArtistId,
  getSongsByAlbumId,
  getSongBySongId,
  addSongByAlbumId,
  editSongBySongId,
  deleteSongBySongId
} = require('./data');

const express = require('express');
const app = express();
// Your Express API server should expect to accept requests with bodies with
// a Content-Type of application/json. When it does, it should deserialize the
// JSON in the request body. \/
app.use(express.json());
// The request object generated by the Express server will have the deserialized
// body saved to the body property. (req.body)

// middleware helper \/ logs the request body before every request!
// app.use((req, res, next) => {
//   console.log('Request Body:', req.body);
//   next();
// });

// testing post, req.body \/
app.post('/', (req, res) => {
    // let newUser = {
    //     name: 'Phyllis',
    //     age: 68
    // }
    console.log('POST "/" Request Body:', req.body);
    // res.send(newUser);
    return res.send(req.body);
})

// Get all the artists
// app.get('/artists', (req, res) => {
//     const artistList = getAllArtists();
//     console.log('GET /artists :', artistList);
//     return res.send(artistList);
// })

app.get('/artists', (req, res) => {
    return res.json(getAllArtists());    // returns json format explicitely
})

// Add an artist
app.post('/artists', (req, res) => {
    addArtist(req.body);
    console.log('POST /artists :', req.body);
    // res.statusCode = 201;   // redirect code for successful POST
    // return res.send(req.body);
    return res.status(201).json(req.body);
    // return res.status(201).json(addArtist(req.body));    // 1 liner
})

app.get('/artists/latest', (req, res) => {
    let latestArtist = getLatestArtist();
    console.log('GET /artists/latest :', latestArtist);
    return res.send(latestArtist);
})

app.get('/artists/latest/albums', (req, res) => {
    let latestArtistAlbums = getAlbumsForLatestArtist();
    console.log('GET /artists/latest/albums :', latestArtistAlbums);
    return res.send(latestArtistAlbums);
})

app.get('/artists/:artistId', (req, res) => {
    let artistID = req.params.artistId;
    let matchingArtist = getArtistByArtistId(artistID);
    console.log('GET /artists/:artistId :', matchingArtist);
    return res.send(matchingArtist);
})

app.put('/artists/:artistId', (req, res) => {
    // let artistID = req.params.artistId;
    // let artistEdit = editArtistByArtistId(artistID, req.body);
    // console.log('PUT /artists/:artistId :', artistEdit);
    // return res.send(artistEdit);     // res.send works because express interprets json automatically(?)
    return res.json(editArtistByArtistId(req.params.artistId, req.body));   // 1 liner, res.json is more precise to issue a json-ified response
})

app.patch('/artists/:artistId', (req, res) => {
    let artistID = req.params.artistId;
    let artistEdit = editArtistByArtistId(artistID, req.body);
    console.log('PATCH /artists/:artistId :', artistEdit);
    return res.send(artistEdit);
})

app.delete('/artists/:artistId', (req, res) => {
    // let artistID = req.params.artistId;
    // deleteArtistByArtistId(artistID);
    // console.log('DELETE /artists/:artistId :', artistID)
    // res.body = { message: 'Successfully deleted' }
    // console.log('RES object: ', res.body);
    // return res.send(res.body);
    deleteArtistByArtistId(req.params.artistId);
    return res.json({ message: 'Successfully deleted' });
    // returns a message of 'Successfully deleted'
})

app.get('/artists/:artistId/albums', (req, res) => {
    let artistID = req.params.artistId;
    let albums = getAlbumsByArtistId(artistID);
    console.log('GET /artists/:artistId/albums :', albums);
    return res.json(albums);
})

app.get('/albums/:albumId', (req, res) => {
    let album = getAlbumByAlbumId(req.params.albumId);
    console.log('GET /albums/:albumId :', album);
    return res.json(album);
})

app.post('/artists/:artistId/albums', (req, res) => {
    let newAlbum = addAlbumByArtistId(req.params.artistId, req.body);
    console.log('POST /artists/:artistId/albums : ', newAlbum);
    res.statusCode = 201;       // 2 lines works
    return res.json(newAlbum);  // 2 lines works
    // return res.status(201).json(newAlbum);   // 1 line also works
})

app.put('/albums/:albumId', (req, res) => {
    let editedAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
    console.log('PUT or PATCH /albums/:albumId :', editedAlbum);
    return res.json(editedAlbum);
})

app.patch('/albums/:albumId', (req, res) => {
    let editedAlbum = editAlbumByAlbumId(req.params.albumId, req.body);
    console.log('PUT or PATCH /albums/:albumId :', editedAlbum);
    return res.json(editedAlbum);
})

app.delete('/albums/:albumId', (req, res) => {
    deleteAlbumByAlbumId(req.params.albumId);
    console.log('DELETE /albums/:albumId :')
    return res.json({ message: 'Successfully deleted' });
})

app.get('/albums', (req, res) => {   // path is just /albums - let the browser pass in the search query "?startsWith={letter}"
    // with search query parameter - ?startsWith={letter} - "startsWith" is key, "letter" is value passed in w/ string interpolation
    let ltr = req.query.startsWith;  // finds the "startsWith" key's value, "S" in the test cases
    console.log(ltr);   // show filter letter ("S" for test code 13). Will return "Stadium Arcadium" album for any string matching incl. 1 space between words
    let matchingAlbums = getFilteredAlbums(ltr);
    console.log('GET /albums?startsWith={letter}: ', matchingAlbums);
    return res.json(matchingAlbums);
})

app.get('/songs/:songId', (req, res) => {
    let song = getSongBySongId(req.params.songId);
    console.log('GET /songs/:songId :', song);
    return res.json(song);
})


// https://appacademy.instructure.com/courses/334/pages/express-route-handlers-2?module_item_id=58206
// The res object also supports sending JSON back to the client through the .json() method:

// app.get('/json', (req, res) => {
//     const resp = {
//         property1: "value1",
//         property2: "value2"
//     };
//     res.json(resp);
// })
// This will call JSON.stringify() on the input to res.json(), thereby serializing
// it, and it will be the job of the client to deserialize the response to properly
// interact with it as a JavaScript object.


// DO NOT MODIFY
if (require.main === module) {
  const port = 8000;
  app.listen(port, () => console.log('Server is listening on port', port));
} else {
  module.exports = app;
}
