import { useState, useEffect, useRef } from "react";
export function useCssStyles() {
    const [cssString, setCssString] = useState('');
    const styleRef = useRef(null);
    const applyInlineCSS = (cssString) => {
        console.log('applying new css: ', cssString);
        if (!styleRef.current) {
            styleRef.current = document.createElement('style');
            styleRef.current.type = 'text/css';
            document.head.appendChild(styleRef.current);
        }
        styleRef.current.innerHTML = cssString;
    };
    useEffect(() => {
        if (cssString) {
            applyInlineCSS(cssString);
        }
    }, [cssString]);
    return { cssString, setCssString };
}
