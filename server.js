'use strict';

const express = require('express');
const superagent = require('superagent');
const pg = require('pg');
const cors = require('cors');
const { response } = require('express');

const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));
console.log(client);

const app = express();
const PORT = process.env.PORT || 3000;


// Express Middleware

// const client = new pg.Client(process.env.DATABASE_URL);
// client.connect();
// client.on('error', err => console.error(err));


app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

require('dotenv').config();
require('ejs');

function collectSearchResults(request, response) {
    let query = respsonse.body.search[0];
    let category = response.body.search[1];
    let url = "http://googleapis.com/books/v1/volumes?q="

    if (category === 'title') { url += `intitle:${query}` };
    if (category === 'author') { url += `inauthor:${category}` };

    superagent.get(url)
        .then(results => {
            let bookArray = results.body.items;

            const finalBookArray = bookArray.map(book => {
                return new Book(book.value)
            });
            response.render('pages/searches/show.ejs', { collectSearchResults: finalBookArray })
        })
}


function handleError(res) {
    return res.status(500).render('pages/error.ejs');
}

// function handleError(res){
//     return res.status(500).render('pages/error.ejs');
// }


// Routes
app.get('/', homeHandler);
app.put('/update/:id', updateBook);
app.delete('/delete/:id', deleteBook);



function homeHandler(request, response) {
    const SQL = 'SELECT * FROM books;';
    return client.query(SQL)
        .then(results => {
            let books = results.rows;
            response.render('pages/index.ejs'), {
                saved: books} });
}


function renderTest(request, response) {
    response.render('pages/index.ejs');

}

function updateBook (request, response) {
    let id = request.params.id;
    let { author, title, isbn, image_url, description} = request.body;
    let SQL = 'UPDATE books SET author = $1, title = $2, isbn = $3, image_url = $4, description = $5 WHERE  id = $6;' 
    let safeValues = [author, title, isbn, image_url, description, id];
    client.query (SQL, safeValues)
    .then( ()=> {
        response.status(200).redirect('/');
    })
}

function deleteBook (resquest, response){
    let id = request.params.id;
    let SQL = 'DELETE FROM books WHERE id = $1;'
    let safeValues = [id];
    client.query(SQL, safeValues)
    .then(() => {
        response.status(200).redirect('/');
    })
}

function Book(obj) {
    this.title = data.title ? data.title : 'No Title Available';
    this.author = data.author ? data.author[0] : 'No Author Available';
    this.description = data.description ? data.description : '*** No Description Available ***';
    this.images = data.imageLinks ? imageLinks.thumbnail : 'No Image Available';
}

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
});
