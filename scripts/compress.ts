import OpenAI from "openai";
import { readdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY,
})

async function scanForFiles(path: string) {

    const dirContents = await readdir(path, { recursive: true, withFileTypes: true })

    let files: Array<string> = []

    dirContents.forEach((path) => {
        if (path.isFile()) {
            files.push(join(path.path, path.name))
        }
    });

    return files;
}

async function compressAndSaveFile(inputDir: string, outputFilePath: string) {


    try {
        const compressorPromptFilePath = join(__dirname, 'prompts', 'compressor.txt');

        const compressionPrompt = await readFile(compressorPromptFilePath, 'utf8')

        let projectFilePaths = await scanForFiles(inputDir);

        let concatenatedProject = ''

        for (const filePath of projectFilePaths) {
            let fileContents = await readFile(filePath, 'utf-8');

            if (fileContents) {
                concatenatedProject += `\n${filePath}: \n` + fileContents
            }
        }

        if (!concatenatedProject) {
            throw new Error("uh oh it was empty...");
        }

        const completion = await openai.chat.completions.create({
            model: 'gpt-4-1106-preview',
            messages: [
                { role: "system", content: compressionPrompt },
                { role: "user", content: concatenatedProject }
            ]
        });



        // Check if the completion and the message content exist
        if (completion.choices && completion.choices.length > 0 && completion.choices[0].message.content) {
            const compressedPage = completion.choices[0].message.content;

            // Write the content to the output file
            await writeFile(outputFilePath, compressedPage, 'utf8');
            console.log('File compressed and saved successfully.');
        } else {
            throw new Error('Invalid completion structure or no content returned.');
        }

    } catch (err) {
        console.error('An error occurred:', err);
    }
}

const renderedHTMLPath = process.argv[2];
const outputFilePath = process.argv[3];

compressAndSaveFile(renderedHTMLPath, outputFilePath);