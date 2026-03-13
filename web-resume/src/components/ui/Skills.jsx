import { motion } from 'framer-motion';

const skills = [
  { name: 'React', level: 90, category: 'Frontend' },
  { name: 'Three.js', level: 85, category: '3D' },
  { name: 'JavaScript', level: 90, category: 'Frontend' },
  { name: 'Node.js', level: 75, category: 'Backend' },
  { name: 'WebGL', level: 80, category: '3D' },
  { name: 'CSS/Tailwind', level: 85, category: 'Frontend' },
];

export function Skills() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {skills.map((skill, index) => (
        <motion.div
          key={skill.name}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-gray-700/50 rounded-lg p-4"
        >
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium">{skill.name}</span>
            <span className="text-cyan-400 text-sm">{skill.level}%</span>
          </div>
          <div className="h-2 bg-gray-600 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1, delay: index * 0.1 + 0.3 }}
              className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            />
          </div>
          <span className="text-gray-400 text-xs mt-1 block">{skill.category}</span>
        </motion.div>
      ))}
    </div>
  );
}
