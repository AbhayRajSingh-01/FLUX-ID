import { forwardRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Input = forwardRef(
  (
    {
      label,
      type = 'text',
      error,
      icon: Icon,
      rightElement,
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <div className={`space-y-2 ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-white/70">{label}</label>
        )}
        <div className="relative group">
          {Icon && (
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-cyan-400/70 transition-colors" />
          )}
          <input
            ref={ref}
            type={type}
            className={`
              auth-input w-full py-3.5 rounded-xl glass text-white placeholder:text-white/30
              input-glow transition-all duration-300 outline-none
              focus:border-cyan-500/50 focus:bg-white/[0.05]
              ${Icon ? 'pl-12 pr-12' : 'px-4'}
              ${rightElement ? 'pr-12' : ''}
              ${error ? 'border-red-500/50' : ''}
            `}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
          )}
        </div>
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="text-sm text-red-400"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;
