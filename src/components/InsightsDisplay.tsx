import React from 'react'
import { Insight } from '../types'
import { ExternalLink } from 'lucide-react'

interface InsightsDisplayProps {
  insights: Insight[]
}

const InsightsDisplay: React.FC<InsightsDisplayProps> = ({ insights }) => {
  return (
    <div className="mt-8 w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Insights</h2>
      {insights.length > 0 ? (
        <ul className="space-y-4">
          {insights.map((insight, index) => (
            <li key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-150 ease-in-out">
              <p className="mb-3 text-gray-700">{insight.text}</p>
              <a
                href={insight.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-500 hover:text-blue-600 transition duration-150 ease-in-out"
              >
                <span className="mr-1">View source tweet</span>
                <ExternalLink className="h-4 w-4" />
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 text-center py-8">No insights available. Try searching for a theme.</p>
      )}
    </div>
  )
}

export default InsightsDisplay