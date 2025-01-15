import express from 'express';
const app = express();
const port = 3005;

app.get('/', (req, res) => {
    res.send('<h1>Hello backend</h1>')
});

app.listen(port, () => {
    console.log(
        `Server is running on http://localhost:${port}`
    )
});