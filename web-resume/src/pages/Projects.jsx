import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: '3D Portfolio',
    description: 'An immersive 3D portfolio website built with React Three Fiber, featuring interactive 3D elements and smooth animations.',
    category: 'Web',
    tags: ['React', 'Three.js', 'R3F'],
    image: null,
    link: '#'
  },
  {
    id: 2,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce solution with real-time inventory management and responsive design.',
    category: 'Web',
    tags: ['React', 'Node.js', 'MongoDB'],
    image: null,
    link: '#'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'Interactive weather application with location-based forecasts and beautiful data visualizations.',
    category: 'App',
    tags: ['React', 'API', 'Chart.js'],
    image: null,
    link: '#'
  },
  {
    id: 4,
    title: 'Game Engine',
    description: 'A custom 2D game engine built from scratch with physics simulation and particle effects.',
    category: 'Game',
    tags: ['JavaScript', 'Canvas', 'Physics'],
    image: null,
    link: '#'
  },
  {
    id: 5,
    title: 'AI Chatbot',
    description: 'An intelligent chatbot powered by machine learning for customer support automation.',
    category: 'AI',
    tags: ['Python', 'TensorFlow', 'NLP'],
    image: null,
    link: '#'
  },
  {
    id: 6,
    title: 'Crypto Tracker',
    description: 'Real-time cryptocurrency tracking app with portfolio management and price alerts.',
    category: 'App',
    tags: ['React', 'WebSocket', 'API'],
    image: null,
    link: '#'
  }
];

const categories = ['All', 'Web', 'App', 'Game', 'AI'];

function ProjectCard({ project, onClick }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -8 }}
      onClick={() => onClick(project)}
      className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden cursor-pointer group"
    >
      <div className="h-48 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
        <span className="text-6xl opacity-30 group-hover:opacity-50 transition-opacity">
          {project.category === 'Web' ? '🌐' : 
           project.category === 'App' ? '📱' : 
           project.category === 'Game' ? '🎮' : '🤖'}
        </span>
      </div>
      <div className="p-6">
        <span className="text-xs font-medium text-purple-400 uppercase tracking-wider">
          {project.category}
        </span>
        <h3 className="text-xl font-semibold text-white mt-2 mb-2 group-hover:text-purple-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span 
              key={tag}
              className="text-xs px-2 py-1 bg-gray-700/50 text-gray-300 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="h-64 bg-gradient-to-br from-purple-900/50 to-blue-900/50 flex items-center justify-center">
          <span className="text-8xl opacity-30">
            {project.category === 'Web' ? '🌐' : 
             project.category === 'App' ? '📱' : 
             project.category === 'Game' ? '🎮' : '🤖'}
          </span>
        </div>
        <div className="p-8">
          <span className="text-sm font-medium text-purple-400 uppercase tracking-wider">
            {project.category}
          </span>
          <h2 className="text-3xl font-bold text-white mt-2 mb-4">
            {project.title}
          </h2>
          <p className="text-gray-300 text-lg mb-6">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="text-sm px-3 py-1 bg-gray-700/50 text-gray-300 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
          <a 
            href={project.link}
            className="inline-block px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
          >
            View Project
          </a>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-4"
        >
          My Projects
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 text-lg mb-8"
        >
          A collection of projects showcasing my skills and experience.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-3 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800/50 text-gray-400 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project}
                onClick={setSelectedProject}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
