"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomStyle = exports.getTestCompletion = void 0;
const openai_1 = require("openai");
const fs = require("fs");
const openai = new openai_1.default({
    organization: process.env.OPENAI_ORG,
    apiKey: process.env.OPENAI_KEY,
});
let cssGenPrompt;
try {
    cssGenPrompt = fs.readFileSync('./src/prompts/cssGen.txt', 'utf8');
}
catch (err) {
    console.error(err);
}
function getTestCompletion() {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "user", content: "Please say 'Hello, Aaron'" }
            ],
            max_tokens: 30,
        });
        return completion.choices[0].message.content;
    });
}
exports.getTestCompletion = getTestCompletion;
function getCustomStyle(userPrompt) {
    return __awaiter(this, void 0, void 0, function* () {
        const completion = yield openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: cssGenPrompt },
                { role: "user", content: userPrompt }
            ]
        });
        return completion.choices[0].message.content;
    });
}
exports.getCustomStyle = getCustomStyle;
