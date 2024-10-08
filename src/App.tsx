import React, { useState } from 'react'
import { Twitter } from 'lucide-react'
import ThemeInput from './components/ThemeInput'
import InsightsDisplay from './components/InsightsDisplay'
import { scrapeTweets, generateInsights } from './utils/twitterScraper'
import { Insight } from './types'

function App() {
  const [theme, setTheme] = useState('')
  const [insights, setInsights] = useState<Insight[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSearch = async () => {
    if (!theme.trim()) {
      setError('Please enter a theme')
      return
    }

    setLoading(true)
    setError('')

    try {
      const tweets = await scrapeTweets(theme)
      const newInsights = generateInsights(tweets)
      setInsights(newInsights)
    } catch (err) {
      setError('Failed to fetch insights. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-8">
      <header className="mb-8 text-center">
        <div className="flex items-center justify-center mb-4">
          <Twitter className="h-10 w-10 text-blue-500 mr-2" />
          <h1 className="text-4xl font-bold text-gray-800">Twitter Insights Generator</h1>
        </div>
        <p className="text-gray-600 max-w-xl">
          Enter a theme to generate insights from recent tweets. Discover trends and opinions on any topic!
        </p>
      </header>

      <main className="w-full max-w-2xl">
        <ThemeInput theme={theme} setTheme={setTheme} onSearch={handleSearch} />
        
        {error && <p className="mt-4 text-red-500">{error}</p>}
        
        {loading ? (
          <div className="mt-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Fetching insights...</p>
          </div>
        ) : (
          <InsightsDisplay insights={insights} />
        )}
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        © 2023 Twitter Insights Generator. All rights reserved.
      </footer>
    </div>
  )
}

export default App