const path = require('path');

const express = require('express');
const bodyParser = require('body-parser'); //To handle HTTP POST request in Express "I need to install middleware module called body-parser."

const app = express(); //creates a new instance of express that you can then assign to a variable and interact with.

const adminData = require('./routes/admin'); //adminData the name is optional // got to routes folder then admin.js
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
//app.use() loads a function to be used as middleware
//urlencoded means URL encoded and its object for bodyParser
// This object will contain key-value pairs,
// where the value can be a string or array (when extended is false), or any type (when extended is true).


app.use(express.static(path.join(__dirname, 'public')));
//express.static() is a function that takes a path, and returns a middleware
//main thing is to serve images, CSS files, and JavaScript files in a directory named public
//and this sentence If you run the express app from another directory, it’s safer to use the path of the directory that you want to serve
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); // sendFile() function which will basically send HTML files to browser
});

app.listen(3000);
// next(); // allow the request to continue to rhe next middleware in line
