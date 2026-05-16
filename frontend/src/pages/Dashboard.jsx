import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import {
  Zap,
  LogOut,
  User,
  Mail,
  Calendar,
  Shield,
  Activity,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AnimatedBackground from '../components/effects/AnimatedBackground';

const statCards = [
  { label: 'Security Score', value: '98%', icon: Shield, color: 'from-cyan-500 to-blue-600' },
  { label: 'Active Sessions', value: '1', icon: Activity, color: 'from-violet-500 to-purple-600' },
  { label: 'Account Tier', value: 'Pro', icon: Sparkles, color: 'from-fuchsia-500 to-pink-600' },
];

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login', { replace: true });
  };

  const formattedDate = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  return (
    <div className="relative min-h-screen min-h-[100dvh] overflow-x-hidden mobile-reduce-effects">
      <AnimatedBackground />

      <div className="dashboard-root relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10"
        >
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-600/20 border border-white/10">
              <Zap className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">
                Flux<span className="text-gradient">ID</span>
              </h1>
              <p className="text-sm text-white/50">Dashboard</p>
            </div>
          </div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="dashboard-logout-btn flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl glass text-white/70 hover:text-white hover:bg-white/10 transition-all border border-white/10"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </motion.header>

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-welcome mb-10"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-semibold mb-2">
            Hello, <span className="text-gradient">{user?.name?.split(' ')[0] || 'there'}</span>
          </h2>
          <p className="text-white/50">Your secure identity hub is ready.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {statCards.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="dashboard-stat-card glass-strong rounded-2xl p-6 relative overflow-hidden group"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />
              <div className="relative flex items-start justify-between">
                <div>
                  <p className="text-sm text-white/50 mb-1">{stat.label}</p>
                  <p className="dashboard-stat-value text-2xl font-bold font-display">{stat.value}</p>
                </div>
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${stat.color} bg-opacity-20`}>
                  <stat.icon className="w-5 h-5 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Profile card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-violet-500/20 to-fuchsia-500/20 rounded-2xl blur-xl opacity-50" />
          <div className="dashboard-profile-card relative glass-strong rounded-2xl p-8 shadow-card">
            <h3 className="font-display text-lg font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-cyan-400" />
              Profile Information
            </h3>

            <div className="grid sm:grid-cols-2 gap-6">
              <ProfileField icon={User} label="Full Name" value={user?.name} />
              <ProfileField icon={Mail} label="Email" value={user?.email} />
              <ProfileField icon={Calendar} label="Member Since" value={formattedDate} />
              <ProfileField icon={Shield} label="Account Status" value="Verified" />
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="dashboard-user-id text-xs text-white/40">
                User ID: <span className="font-mono text-white/60">{user?.id}</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const ProfileField = ({ icon: Icon, label, value }) => (
  <div className="dashboard-profile-field flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
    <div className="p-2 rounded-lg bg-cyan-500/10">
      <Icon className="w-4 h-4 text-cyan-400" />
    </div>
    <div>
      <p className="text-xs text-white/40 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-white font-medium">{value || '—'}</p>
    </div>
  </div>
);

export default Dashboard;
