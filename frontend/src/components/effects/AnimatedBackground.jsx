import { motion } from 'framer-motion';
import Particles from './Particles';

const FloatingBlob = ({ className, delay = 0, duration = 8 }) => (
  <motion.div
    className={`absolute rounded-full blur-3xl ${className}`}
    animate={{
      x: [0, 30, -20, 0],
      y: [0, -40, 20, 0],
      scale: [1, 1.1, 0.95, 1],
    }}
    transition={{
      duration,
      repeat: Infinity,
      delay,
      ease: 'easeInOut',
    }}
  />
);

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <motion.div
        className="absolute inset-0 bg-[length:200%_200%]"
        style={{
          backgroundImage:
            'linear-gradient(135deg, #030712 0%, #0f172a 25%, #1e1b4b 50%, #0c4a6e 75%, #030712 100%)',
        }}
        animate={{ backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating neon blobs */}
      <FloatingBlob
        className="w-[500px] h-[500px] bg-cyan-500/20 -top-48 -left-48"
        delay={0}
        duration={10}
      />
      <FloatingBlob
        className="w-[400px] h-[400px] bg-violet-600/25 top-1/2 -right-32"
        delay={2}
        duration={12}
      />
      <FloatingBlob
        className="w-[350px] h-[350px] bg-fuchsia-500/15 -bottom-32 left-1/3"
        delay={4}
        duration={9}
      />

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#030712_70%)]" />

      <Particles />
    </div>
  );
};

export default AnimatedBackground;
