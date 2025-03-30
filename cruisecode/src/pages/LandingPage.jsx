import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float, Text3D } from '@react-three/drei';
import { motion } from 'framer-motion';
import { Code2, Video, Users, Terminal, Sparkles } from 'lucide-react';
import SocialIcons from '../components/SocialIcons.jsx';

const FloatingCube = () => {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1}
      floatIntensity={2}
    >
      <mesh rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>
    </Float>  
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="bg-gray-800/50 backdrop-blur-lg rounded-xl p-6 border border-gray-700"
  >
    <div className="h-12 w-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-blue-500" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </motion.div>
);

const LandingPage = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="relative h-screen">
        <div className="absolute inset-0">
          <Canvas>
            <Suspense fallback={null}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <Stars
                radius={100}
                depth={50}
                count={5000}
                factor={4}
                saturation={0}
                fade
                speed={1}
              />
              <FloatingCube />
              <OrbitControls enableZoom={false} />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-bold text-center mb-6"
          >
            Welcome to{' '}
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
              Codac
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-2xl text-gray-300 text-center max-w-3xl mb-8"
          >
            The next-generation AI-powered code collaboration and interview platform
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex space-x-6"
          >
            <a
              href="/signup"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 text-lg"
            >
              Get Started
            </a>
            <a
              href="/login"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg font-medium transition-all duration-200 text-lg"
            >
              Login
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <Sparkles className="h-8 w-8 text-blue-500" />
          </div>
        </motion.div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Powerful Features for Modern Development
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Everything you need to conduct technical interviews, collaborate on code, and build amazing projects together.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={Terminal}
              title="AI-Powered Code Editor"
              description="Smart code completion, real-time error detection, and intelligent suggestions powered by advanced AI."
            />
            <FeatureCard
              icon={Video}
              title="Video Interviews"
              description="Crystal-clear video calls with built-in code collaboration and whiteboarding capabilities."
            />
            <FeatureCard
              icon={Users}
              title="Team Collaboration"
              description="Real-time group chat, code sharing, and project management tools for seamless teamwork."
            />
            <FeatureCard
              icon={Code2}
              title="Multi-language Support"
              description="Support for all major programming languages with syntax highlighting and language-specific features."
            />
            <FeatureCard
              icon={Terminal}
              title="Interactive Tutorials"
              description="Learn and practice coding with interactive tutorials and real-time feedback."
            />
            <FeatureCard
              icon={Sparkles}
              title="AI Code Review"
              description="Get instant feedback on your code quality, security, and performance from our AI assistant."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-black/80">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-blue-500 mb-2">100K+</div>
              <div className="text-xl text-gray-400">Active Users</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-purple-500 mb-2">50K+</div>
              <div className="text-xl text-gray-400">Code Sessions</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-pink-500 mb-2">1M+</div>
              <div className="text-xl text-gray-400">Lines of Code</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 bg-black/80">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center text-white mb-16"
          >
            Get in Touch
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-semibold text-white">Contact Us</h3>
              <p className="text-gray-400">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              <div className="mt-8">
                <SocialIcons />
              </div>
            </motion.div>
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={4}
                  className="w-full px-4 py-3 bg-gray-800/50 backdrop-blur-lg border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-200"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;