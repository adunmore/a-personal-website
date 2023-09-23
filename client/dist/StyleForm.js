import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import axios from 'axios';
import { useState } from 'react';
import { useCssStyles } from './useCssStyles';
export default function StyleForm() {
    const { setCssString } = useCssStyles();
    const [userInput, setUserInput] = useState('A website in the style of a late-2000s app with skeumorphism, drop shadows, depth, animations, textures, etc');
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('User input: ', userInput);
        if (userInput.trim() === '') {
            setCssString('');
            return;
        }
        axios.post('/api/openaiStyle', { input: userInput })
            .then(res => {
            const style = res.data;
            setCssString(style);
        })
            .catch(err => {
            console.error("Error: ", err);
        });
    };
    const handleChange = (event) => {
        setUserInput(event.target.value);
    };
    return (_jsxs("form", { onSubmit: handleSubmit, children: [_jsx("input", { type: 'text', value: userInput, onChange: handleChange }), _jsx("button", { type: 'submit', children: "Apply Styles" })] }));
}
;
