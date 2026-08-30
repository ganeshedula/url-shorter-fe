import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiX } from "react-icons/fi";

export function Modal({ open, title, children, onClose, footer }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 px-0 sm:px-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 30, opacity: 0 }}
            transition={{ type: "spring", damping: 28, stiffness: 350 }}
            className="w-full max-w-lg rounded-t-apple-2xl sm:rounded-apple-2xl border border-separator bg-surface p-5 sm:p-6 shadow-apple-elevated relative max-h-[90vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile Sheet Drag Handle */}
            <div className="mx-auto -mt-2 mb-4 h-1.5 w-10 rounded-full bg-label-quaternary sm:hidden" />

            <div className="mb-4 flex items-center justify-between gap-4 pb-2 border-b border-separator/50">
              <h3 className="text-lg font-semibold text-label tracking-tight">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-surface-secondary text-label-secondary hover:text-label transition-colors"
                aria-label="Close"
              >
                <FiX size={15} />
              </button>
            </div>
            <div className="text-label">{children}</div>
            {footer ? <div className="mt-5 pt-3 border-t border-separator/50">{footer}</div> : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
