import axios from 'axios';
import React, { useRef, useState } from 'react';
import { useCssStyles } from './useCssStyles';
import TextAreaAutoResize from 'react-textarea-autosize';
import StyleInputSubmit from './StyleInputSubmit';

export default function StyleForm() {
    let formRef = useRef<HTMLFormElement | null>(null);
    let fieldRef = useRef<HTMLTextAreaElement | null>(null);

    const { setCssString } = useCssStyles()

    const [userInput, setUserInput] = useState('');
    const [waiting, setWaiting] = useState(false);

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setWaiting(true);

        console.log('User input: ', userInput)

        if (userInput.trim() === '') {
            setCssString('');
            return;
        }

        axios.post('/api/openaiStyle', { input: userInput })
            .then(res => {
                const style: string = res.data;
                setCssString(style);
                setWaiting(false);
            })
            .catch(err => {
                console.error("Error: ", err)
                setWaiting(false);
            })
    }

    function handleEnter(event: React.KeyboardEvent<HTMLTextAreaElement>) {
        if (event.code == 'Enter' && !event.shiftKey) {
            event.preventDefault();
            if (formRef.current) {
                formRef.current.requestSubmit();
            }
        }
    }

    function handleClick(event: React.MouseEvent) {
        event.preventDefault();
        if (fieldRef.current) {
            fieldRef.current.focus();
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
        setUserInput(event.target.value);
    }

    return (
        <form className='styleInputForm' onSubmit={handleSubmit} ref={formRef}>
            <div className='styleInputContainer'>
                <div className='styleInputFieldContainer' onClick={handleClick}>
                    <TextAreaAutoResize
                        className='styleInputField'
                        placeholder='Enter a prompt to style the site'
                        ref={fieldRef}
                        minRows={2}
                        value={userInput}
                        onChange={handleChange}
                        style={{
                            resize: 'none',
                            border: 'none'
                        }}
                        onKeyDown={(e) => handleEnter(e)}
                    />
                </div>
                <StyleInputSubmit waiting={waiting} formEmpty={userInput === ''} />
            </div >
        </form >
    )
};