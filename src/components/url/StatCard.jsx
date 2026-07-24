import { motion } from "framer-motion";
import { formatCompactNumber } from "../../utils/formatters";

export function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <motion.div whileHover={{ y: -3 }} className="glass-panel rounded-[28px] p-5">
      <div className="flex items-center justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon size={22} />
        </div>
        {trend ? <p className="text-xs font-semibold text-success">{trend}</p> : null}
      </div>
      <p className="mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted">{label}</p>
      <h3 className="mt-3 text-3xl">{formatCompactNumber(value)}</h3>
    </motion.div>
  );
}
