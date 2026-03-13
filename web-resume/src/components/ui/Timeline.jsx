import { motion } from 'framer-motion';

const timeline = [
  {
    year: '2024 - Present',
    title: 'Senior Frontend Developer',
    company: 'Tech Company',
    description: 'Building immersive web experiences with React and Three.js'
  },
  {
    year: '2022 - 2024',
    title: 'Frontend Developer',
    company: 'Startup Inc',
    description: 'Developed interactive web applications'
  },
  {
    year: '2020 - 2022',
    title: 'Junior Developer',
    company: 'Digital Agency',
    description: 'Started professional web development journey'
  }
];

export function Timeline() {
  return (
    <div className="space-y-6">
      {timeline.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.2 }}
          className="relative pl-8 border-l-2 border-cyan-500/30"
        >
          <div className="absolute -left-2 top-0 w-4 h-4 bg-cyan-500 rounded-full" />
          <div className="mb-2">
            <span className="text-cyan-400 text-sm">{item.year}</span>
          </div>
          <h3 className="text-white font-semibold text-lg">{item.title}</h3>
          <p className="text-gray-400 text-sm mb-1">{item.company}</p>
          <p className="text-gray-500 text-sm">{item.description}</p>
        </motion.div>
      ))}
    </div>
  );
}
