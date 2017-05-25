var express = require('express')
var cors = require('cors')

var rp = require('request-promise');
var app = express()
app.use(cors())

app.get('/', function (req, res, next) {
  rp('http://www.google.com')
    .then(function (htmlString) {
        // Process html...
    })
    .catch(function (err) {
        // Crawling failed...
    });
})

app.listen(3000)