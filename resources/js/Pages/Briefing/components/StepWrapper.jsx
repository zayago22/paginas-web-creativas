import { motion, AnimatePresence } from 'framer-motion';

const variants = {
    enter: (dir) => ({
        x: dir > 0 ? '60%' : '-60%',
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (dir) => ({
        x: dir > 0 ? '-60%' : '60%',
        opacity: 0,
    }),
};

export default function StepWrapper({ stepKey, direction, children }) {
    return (
        <AnimatePresence mode="wait" custom={direction}>
            <motion.div
                key={stepKey}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: [0.32, 0.72, 0, 1] }}
                className="w-full"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
