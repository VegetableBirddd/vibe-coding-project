const projects = [
  { id: 1, title: 'Project One', description: 'A React + Three.js project' },
  { id: 2, title: 'Project Two', description: 'An interactive 3D experience' },
  { id: 3, title: 'Project Three', description: 'WebGL visualization' },
]

export function Projects() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-6xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-white mb-8">My Projects</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-colors">
              <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400">{project.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
