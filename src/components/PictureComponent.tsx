import { useEffect, useState } from "react";

export default function Picture() {

    
    useEffect(() => {
        console.log("ImageComponent mounted");
        
        const interval = window.setInterval(() => {
            console.log("Counting");
        }, 1000);

        return () => {
            console.log("ImageComponent unmounted");
            window.clearInterval(interval);
            console.log("Clear interval");
            
        };
    }, []);

    return (
        <div>
            <img alt="" src="https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1308&q=80" />
        </div>
    );
}