import { motion } from 'framer-motion';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  ...props
}) => {
  const variants = {
    primary:
      'bg-gradient-to-r from-cyan-500 to-violet-600 text-white btn-glow hover:from-cyan-400 hover:to-violet-500',
    ghost: 'bg-white/5 text-white/80 hover:bg-white/10 border border-white/10',
    danger: 'bg-red-500/20 text-red-300 border border-red-500/30 hover:bg-red-500/30',
  };

  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      className={`
        auth-submit-btn relative w-full py-3.5 px-6 rounded-xl font-medium text-sm
        transition-all duration-300 overflow-hidden
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variants[variant]} ${className}
      `}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Please wait...</span>
        </span>
      ) : (
        children
      )}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full hover:animate-[shimmer_1.5s_infinite]" />
    </motion.button>
  );
};

export default Button;
