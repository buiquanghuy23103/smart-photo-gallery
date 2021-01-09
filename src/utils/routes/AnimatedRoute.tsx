import { motion } from 'framer-motion';
import { Route, RouteProps } from 'react-router-dom';


export default function AnimatedRoute({ children, ...rest }: RouteProps) {
    return (
        <Route { ...rest }>
            <motion.div
                initial={ { x: 200 } }
                animate={ {
                    x: 0,
                    transition: { duration: 1 }
                } }
            >

                { children }

            </motion.div>
        </Route>
    )
}
