const express = require('express');
const morgan = require('morgan');

const app = express();

app.listen(80)
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

app.get('/', (req, res) => {
    res.render('index', { title: 'Søk' });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'Om' });
});

app.get('/kart', (req, res) => {
    res.render('kart', { title: 'Kart' })
})


app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});