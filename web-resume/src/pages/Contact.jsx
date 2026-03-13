export function Contact() {
  return (
    <div className="min-h-screen pt-20 px-4">
      <div className="max-w-2xl mx-auto py-12">
        <h1 className="text-4xl font-bold text-white mb-8">Get In Touch</h1>
        <form className="bg-gray-800 rounded-lg p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); console.log('submitted') }}>
          <div>
            <label className="block text-gray-300 mb-2">Name</label>
            <input type="text" className="w-full bg-gray-700 text-white rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Email</label>
            <input type="email" className="w-full bg-gray-700 text-white rounded px-4 py-2" />
          </div>
          <div>
            <label className="block text-gray-300 mb-2">Message</label>
            <textarea className="w-full bg-gray-700 text-white rounded px-4 py-2 h-32"></textarea>
          </div>
          <button type="submit" className="bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 transition-colors">
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}
