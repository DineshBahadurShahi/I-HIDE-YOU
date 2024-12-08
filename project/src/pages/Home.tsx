import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Lock, Clock, MessageSquare, Key, UserX } from 'lucide-react';
import { motion } from 'framer-motion';
import { floatingAnimation, staggeredFloat } from '../utils/animations';

export function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl font-bold text-white mb-6">
              Where Privacy Meets
              <motion.span 
                className="block bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text"
                {...floatingAnimation}
              >
                Connection
              </motion.span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
              Share thoughts freely, connect authentically, and stay completely anonymous.
              Your identity remains hidden, your ideas shine through.
            </p>
            <div className="flex justify-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/register"
                  className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
                >
                  Get Started
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/login"
                  className="px-8 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-medium transition-colors"
                >
                  Sign In
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Animated Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,0,200,0.15),rgba(0,0,0,0))]" />
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: UserX, title: "Complete Anonymity", description: "Express yourself without revealing your identity. No personal information required." },
            { icon: Key, title: "End-to-End Encryption", description: "Your messages are encrypted and secure. Only intended recipients can read them." },
            { icon: Clock, title: "Self-Destructing Messages", description: "Messages automatically disappear after logout, leaving no trace behind." }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              {...staggeredFloat(index)}
              whileHover={{ scale: 1.03 }}
              className="bg-gray-800/30 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-purple-500/50 transition-colors"
            >
              <feature.icon className="w-12 h-12 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-900/50 to-pink-900/50 rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-purple-500/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <motion.h2 
                className="text-3xl font-bold text-white mb-2"
                {...floatingAnimation}
              >
                Ready to Start?
              </motion.h2>
              <p className="text-gray-300">
                Join our community of anonymous communicators today.
              </p>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/register"
                className="px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
              >
                Create Account
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}