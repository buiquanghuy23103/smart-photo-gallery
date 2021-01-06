import { useState } from 'react'

export default function useDebounce() {
    const [typingTimemout, setTypingTimeout] = useState<number | null>(null);

    function debounce(handler: TimerHandler, waitingTime: number = 1000) {
        if (!!typingTimemout) {
            window.clearTimeout(typingTimemout);
        }

        const timeout = window.setTimeout(handler, waitingTime);

        setTypingTimeout(timeout);
    }

    return debounce;

}
