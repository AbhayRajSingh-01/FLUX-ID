import { motion } from 'framer-motion';
import AnimatedBackground from '../effects/AnimatedBackground';
import { Zap } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="auth-layout-root mobile-reduce-effects relative min-h-screen min-h-[100dvh] overflow-x-hidden flex items-center justify-center p-4 sm:p-6">
      <AnimatedBackground />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          className="auth-logo flex items-center justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-white/10 shadow-glow">
            <Zap className="w-6 h-6 text-cyan-400" />
          </div>
          <span className="auth-logo-text font-display text-2xl font-bold tracking-tight">
            Flux<span className="text-gradient">ID</span>
          </span>
        </motion.div>

        {/* Glass card with 3D depth */}
        <div className="relative">
          <motion.div
            className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-60"
            animate={{ opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <div className="auth-card relative glass-strong rounded-2xl p-8 sm:p-10 shadow-card">
            {(title || subtitle) && (
              <div className="auth-card-header text-center mb-8">
                {title && (
                  <h1 className="auth-card-title font-display text-2xl sm:text-3xl font-semibold text-white mb-2">
                    {title}
                  </h1>
                )}
                {subtitle && (
                  <p className="auth-card-subtitle text-white/50 text-sm">{subtitle}</p>
                )}
              </div>
            )}
            {children}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
