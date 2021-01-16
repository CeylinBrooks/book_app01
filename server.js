'use strict';

const express = require('express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
app.set('view engine', 'ejs');



app.listen(PORT, ()=> {
    console.log(`Now listening on port ${PORT}`)
});

app.get('/',homeHandler);

function homeHandler(request, response) {
    response.status(200).render('index');
}

