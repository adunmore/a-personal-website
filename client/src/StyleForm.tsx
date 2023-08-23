import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useCssStyles } from './useCssStyles';

export default function StyleForm() {

    const { setCssString } = useCssStyles()

    const [userInput, setUserInput] = useState('A website in the style of a late-2000s app with skeumorphism, drop shadows, depth, animations, textures, etc');

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        console.log('User input: ', userInput)

        if (userInput.trim() === '') {
            setCssString('');
            return;
        }

        axios.post('/api/openaiStyle', { input: userInput })
            .then(res => {
                const style: string = res.data;
                setCssString(style);
            })
            .catch(err => {
                console.error("Error: ", err)
            })
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserInput(event.target.value);
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type='text' value={userInput} onChange={handleChange} />
            <button type='submit'>Apply Styles</button>
        </form>
    )

};