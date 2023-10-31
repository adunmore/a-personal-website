import OpenAI from 'openai';
import * as fs from 'fs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

let cssGenPrompt: string

try {
    cssGenPrompt = fs.readFileSync('./src/prompts/cssGen.txt', 'utf8')
} catch (err) {
    console.error(err)
}

export async function getTestCompletion() {

    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "user", content: "Please say 'Hello, Aaron'" }
        ],
        max_tokens: 30,
    });

    return completion.choices[0].message.content;
}

export async function getCustomStyle(userPrompt: string) {
    
    const completion = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
            { role: "system", content: cssGenPrompt },
            { role: "user", content: userPrompt }
        ]
    });
    
    return completion.choices[0].message.content;

}