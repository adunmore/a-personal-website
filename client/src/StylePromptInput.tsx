import React, { useState, useRef, useEffect, ChangeEventHandler } from 'react';

import TextAreaAutoSize from 'react-textarea-autosize';

interface StylePromptInputProps {
    value: string;
    onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

const StylePromptInput: React.FC<StylePromptInputProps> = ({ value, onChange }) => {
    return <TextAreaAutoSize
        value={value}
        onChange={onChange}
        style={{
            resize: 'none'
        }}
    />;
}

export default StylePromptInput