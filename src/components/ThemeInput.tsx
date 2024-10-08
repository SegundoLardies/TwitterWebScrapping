import React, { FormEvent } from 'react'
import { Search } from 'lucide-react'

interface ThemeInputProps {
  theme: string
  setTheme: (theme: string) => void
  onSearch: () => void
}

const ThemeInput: React.FC<ThemeInputProps> = ({ theme, setTheme, onSearch }) => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center w-full">
      <input
        type="text"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        placeholder="Enter a theme (e.g., climate change, technology, sports)"
        className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label="Theme input"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150 ease-in-out"
        aria-label="Search"
      >
        <Search className="h-5 w-5" />
      </button>
    </form>
  )
}

export default ThemeInput