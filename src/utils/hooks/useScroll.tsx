import React, { useEffect, useState } from 'react'

export default function useScroll() {
    const HOOK_NAME = 'scroll';
    const [scrollPosition, setScrollPosition] = useState<number | null>(null);

    function handleScrolling() {
        setScrollPosition(window.scrollY);
    }

    function removeEvent() {
        document.removeEventListener(HOOK_NAME, handleScrolling);
    }

    useEffect(() => {
        document.addEventListener(HOOK_NAME, handleScrolling);
        return removeEvent;
    }, []);

    return scrollPosition;

}
