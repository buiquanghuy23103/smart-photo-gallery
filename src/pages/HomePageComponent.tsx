import { motion } from 'framer-motion'
import React from 'react';

export default function HomePageComponent() {
    return (
        <div className="flex h-screen">
            <motion.h1
                className="m-auto text-3xl"
                initial={ { opacity: 0, y: -300 } }
                animate={ {
                    scale: 2,
                    opacity: 1,
                    y: 0,
                    transition: { duration: 2 },
                    rotate: 360
                } }
            >Welcome home!
            </motion.h1>
        </div>
    )
}
