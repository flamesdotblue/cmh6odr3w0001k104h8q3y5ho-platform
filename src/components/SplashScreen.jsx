import { motion, AnimatePresence } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 1200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 via-black to-black" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            className="relative z-10 flex flex-col items-center"
          >
            <div className="relative">
              <div className="absolute -inset-6 bg-emerald-500/20 blur-2xl rounded-full" />
              <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white text-black shadow-[0_0_0_1px_rgba(255,255,255,0.2)]">
                <Wallet className="w-10 h-10" />
              </div>
            </div>
            <motion.h1
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="mt-5 text-2xl font-semibold tracking-tight"
            >
              Money Tracker
            </motion.h1>
            <motion.p
              initial={{ y: 8, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
              className="mt-1 text-sm text-white/70"
            >
              Track, Save, Grow
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
