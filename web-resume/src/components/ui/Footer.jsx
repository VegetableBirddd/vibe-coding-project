export function Footer() {
  return (
    <footer className="bg-black/50 backdrop-blur-md py-6">
      <div className="max-w-6xl mx-auto px-4 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} My Portfolio. All rights reserved.</p>
      </div>
    </footer>
  )
}
