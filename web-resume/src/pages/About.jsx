import { motion } from 'framer-motion';
import { Skills } from '../components/ui/Skills';
import { Timeline } from '../components/ui/Timeline';

export function About() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-4xl mx-auto py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          About Me
        </motion.h1>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gray-800/50 rounded-lg p-8 mb-12"
        >
          <p className="text-gray-300 text-lg mb-4">
            Hi, I'm a creative developer passionate about 3D graphics and interactive web experiences.
          </p>
          <p className="text-gray-300 text-lg">
            I specialize in React, Three.js, and building immersive digital experiences.
          </p>
        </motion.div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Skills</h2>
          <Skills />
        </motion.section>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">Experience</h2>
          <Timeline />
        </motion.section>
      </div>
    </div>
  )
}
