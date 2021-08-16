const express = require("express");
const data = require("./data.json");

const app = express();
app.use(express.urlencoded({ extended: false }));


const TICKETS_PER_PAGE = 25;
const NUMBER_OF_PAGES = Math.ceil(data.length / TICKETS_PER_PAGE);
let tickets = null;

app.use((_, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

app.get('/tickets', (req, res) => {
    const pageNumber = Number(req.query.page);
    console.log(pageNumber);
    console.log(req.protocol + '://' + req.get('host') + req.originalUrl);
    tickets = data.slice((pageNumber - 1) * TICKETS_PER_PAGE, pageNumber * TICKETS_PER_PAGE);
    tickets.push({ "pages": NUMBER_OF_PAGES });
    res.json(tickets);
})

app.listen(4000, (err) => {
    if (err) {
        console.log(`Error: ${err}`);
    } else {
        console.log("Listening on port 4000");
    }
});