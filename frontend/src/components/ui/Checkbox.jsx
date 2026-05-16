import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const Checkbox = ({ checked, onChange, label, id }) => {
  return (
    <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
      <div className="relative">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="sr-only peer"
        />
        <motion.div
          className={`
            w-5 h-5 rounded-md border transition-all duration-200
            flex items-center justify-center
            ${checked
              ? 'bg-gradient-to-br from-cyan-500 to-violet-600 border-transparent shadow-glow'
              : 'border-white/20 bg-white/5 group-hover:border-white/40'}
          `}
          whileTap={{ scale: 0.9 }}
        >
          {checked && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
            </motion.div>
          )}
        </motion.div>
      </div>
      {label && <span className="text-sm text-white/60 group-hover:text-white/80 transition-colors">{label}</span>}
    </label>
  );
};

export default Checkbox;
