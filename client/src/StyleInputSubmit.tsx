type Props = {
    waiting: boolean;
    formEmpty: boolean;
}

const sendIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64pt"
        height="64pt"
        viewBox="0 0 64 64"
        style={{ isolation: "isolate", height: '20px', width: 'auto' }}
        id="send"
    >
        <defs>
            <clipPath id="a">
                <rect width="64" height="64" />
            </clipPath>
        </defs>
        <g clip-path="url(#a)">
            <path d=" M 8.216 36.338 L 26.885 32.604 C 28.552 32.271 28.552 31.729 26.885 31.396 L 8.216 27.662 C 7.104 27.44 6.021 26.356 5.799 25.245 L 2.065 6.576 C 1.731 4.908 2.714 4.133 4.259 4.846 L 61.228 31.139 C 62.257 31.614 62.257 32.386 61.228 32.861 L 4.259 59.154 C 2.714 59.867 1.731 59.092 2.065 57.424 L 5.799 38.755 C 6.021 37.644 7.104 36.56 8.216 36.338 Z " />
        </g>
    </svg>
)

const waitingIcon = (
    < svg
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 24 24"
        id="clock"
        style={{ height: '20px', width: 'auto' }}
    >
        <path d="M15,11H13V7a1,1,0,0,0-2,0v5a1,1,0,0,0,1,1h3a1,1,0,0,0,0-2ZM12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Z" />
    </svg >
)

export default function StyleInputSubmit({ waiting, formEmpty }: Props) {
    const disabled = waiting || formEmpty;

    return (
        <button className='styleInputSubmit' type='submit' disabled={disabled} >
            {!waiting ? sendIcon : waitingIcon}
        </button>
    );
}