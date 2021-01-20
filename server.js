'use strict';

const express = require('express');
const superagent = require('superagent');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

<<<<<<< HEAD
app.post('/searches', searchResults)
=======
require('dotenv').config();
require('ejs');

function collectSearchResults(request, response) {
    let query = respsonse.body.search[0];
    let category = response.body.search[1];
    let url = "http://googleapis.com/books/v1/volumes?q="
>>>>>>> d9f114f0a565943297cd32e7356ac96b0d1fe227

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

function handleError(res){
    return res.status(500).render('pages/error.ejs');
}


app.get('/', homeHandler);

function homeHandler(request, response) {
    response.status(200).render('index');
}

<<<<<<< HEAD

//Routes


//Constructors
function Book (obj){
    this.title =
    this.author =
    this.description =
    this.images =
}
=======
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
>>>>>>> d9f114f0a565943297cd32e7356ac96b0d1fe227
