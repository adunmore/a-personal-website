import OpenAI from 'openai';
import * as fs from 'fs';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

let cssGenPrompt = ''

try {
    const promptHeader = fs.readFileSync('./src/prompts/cssGen.txt', 'utf8')
    const pageDescription = fs.readFileSync('./src/prompts/projectDescription.txt', 'utf-8')
    cssGenPrompt = promptHeader + "\n" + pageDescription;
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
        model: "gpt-4-1106-preview",
        messages: [
            { role: "system", content: cssGenPrompt },
            { role: "user", content: userPrompt }
        ]
    });

    return completion.choices[0].message.content;

}