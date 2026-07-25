import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";
import { Button } from "./Button";

export function Modal({ open, title, children, onClose, footer }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="glass-panel w-full max-w-2xl rounded-[32px] p-6 max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl">{title}</h3>
              </div>
              <Button variant="ghost" size="sm" className="w-10 px-0" onClick={onClose} aria-label="Close modal">
                <FiX />
              </Button>
            </div>
            <div>{children}</div>
            {footer ? <div className="mt-6">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
