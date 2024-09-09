import { createPortal } from "react-dom";
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "./Button.jsx";

const Modal = forwardRef(function Modal({ children, buttonCaption }, ref) {
    const [isOpen, setIsOpen] = useState(false);
    const dialog = useRef();

    useImperativeHandle(ref, () => ({
        open() {
            setIsOpen(true);
        },
        close() {
            setIsOpen(false);
        }
    }));

    function handleClose() {
        setIsOpen(false);
    }

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <motion.div
                        className="fixed inset-0 bg-stone-900/90 z-10"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={handleClose}
                    />
                    <motion.div
                        ref={dialog}
                        className="p-4 rounded-md shadow-md bg-white z-20"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                        <form method="dialog" className="mt-4 text-right">
                            <Button onClick={handleClose}>{buttonCaption}</Button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.getElementById('modal-root')
    );
});

export default Modal;
