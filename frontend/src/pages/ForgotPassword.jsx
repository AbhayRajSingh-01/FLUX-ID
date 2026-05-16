import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import AuthLayout from '../components/layout/AuthLayout';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

/**
 * Placeholder — extend with OTP/email backend when ready
 */
const ForgotPassword = () => {
  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email and we'll send reset instructions"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-5"
      >
        <Input
          label="Email"
          type="email"
          placeholder="you@company.com"
          icon={Mail}
        />

        <Button
          type="button"
          onClick={() => {
            /* Hook up to /api/auth/forgot-password when implemented */
          }}
        >
          Send reset link
        </Button>

        <p className="text-xs text-center text-white/40">
          Password reset via email is coming soon in a future release.
        </p>

        <Link
          to="/login"
          className="flex items-center justify-center gap-2 text-sm text-white/50 hover:text-cyan-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to sign in
        </Link>
      </motion.div>
    </AuthLayout>
  );
};

export default ForgotPassword;
