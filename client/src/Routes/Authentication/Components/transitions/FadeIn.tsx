import { motion, AnimatePresence } from 'framer-motion'

const FadeIn = ({ children }: any) => {
    return (
        <AnimatePresence >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}

export default FadeIn