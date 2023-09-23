"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const OpenAI_1 = require("./OpenAI");
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3001;
app.get('/api/openaiTest', (req, res) => {
    (0, OpenAI_1.getTestCompletion)()
        .then((comp) => { res.send(comp); })
        .catch((err) => { console.error(err); res.send(null); });
});
app.get('/api/style', (req, res) => {
    console.log(`someone hit /api/style/ with request ${req}`);
    res.send('body, body * { background-color: black; }');
});
app.post('/api/openaiStyle', (req, res) => {
    const prompt = req.body.input;
    console.log(`someone hit /api/openaiStyle with request "${prompt}"`);
    (0, OpenAI_1.getCustomStyle)(prompt)
        .then((style) => {
        console.log(style);
        res.send(style);
    }).catch((err) => { console.error(err); res.send(null); });
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
