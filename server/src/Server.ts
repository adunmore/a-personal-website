import express = require('express');
import { Request, Response } from 'express';

import { getTestCompletion, getCustomStyle } from './OpenAI';

const app = express();
app.use(express.json())


const PORT = process.env.PORT || 3001;


app.get('/api/openaiTest', (req: Request, res: Response) => {
    getTestCompletion()
        .then((comp) => { res.send(comp) })
        .catch((err) => { console.error(err); res.send(null) })
})

app.get('/api/style', (req: Request, res: Response) => {
    console.log(`someone hit /api/style/ with request ${req}`);
    res.send('body, body * { background-color: black; }');
})

app.post('/api/openaiStyle', (req: Request, res: Response) => {
    const prompt = req.body.input;
    console.log(`someone hit /api/openaiStyle with request "${prompt}"`)

    getCustomStyle(prompt)
        .then((style) => { 
            console.log(style);
            res.send(style) 
        }).catch((err) => { console.error(err); res.send(null) })

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
