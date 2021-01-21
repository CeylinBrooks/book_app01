'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3000;

const client = new pageXOffset.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));

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

// function handleError(res){
//     return res.status(500).render('pages/error.ejs');
// }

// Routes
app.get('/', homeHandler);
//app.get('/', )


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

function Book(obj) {
    this.title = data.title ? data.title : 'No Title Available';
    this.author = data.author ? data.author[0] :'No Author Available';
    this.description = data.description ? data.description : '*** No Description Available ***';
    this.images = data.imageLinks ? imageLinks.thumbnail : 'No Image Available';
}

app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`)
});