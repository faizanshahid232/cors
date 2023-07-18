const express = require('express');
const app = express();
app.use(express.static('public'))

app.get('/', (req, res) => {
    //res.sendFile('index.html', {root: path.join(__dirname, 'public')});
    res.send('hello');
});
module.exports = app;