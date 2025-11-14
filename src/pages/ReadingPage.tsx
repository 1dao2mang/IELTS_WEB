import React from 'react'
import { Card, Button } from '@/components'
import { BookText, Clock } from 'lucide-react'

export const ReadingPage: React.FC = () => {
  const passages = [
    {
      id: 1,
      title: 'The History of Artificial Intelligence',
      type: 'Academic',
      timeLimit: '20 min',
      difficulty: 'Intermediate',
      questions: 13,
      topics: ['Technology', 'History'],
    },
    {
      id: 2,
      title: 'Sustainable Tourism Practices',
      type: 'Academic',
      timeLimit: '20 min',
      difficulty: 'Advanced',
      questions: 14,
      topics: ['Environment', 'Tourism'],
    },
    {
      id: 3,
      title: 'Work-Life Balance in Modern Society',
      type: 'General Training',
      timeLimit: '15 min',
      difficulty: 'Beginner',
      questions: 10,
      topics: ['Lifestyle', 'Work'],
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-600 mb-4">
          <BookText className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">IELTS Reading Practice</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Master reading comprehension with diverse academic and general training passages
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card title="Question Types">
          <ul className="space-y-2 text-gray-700">
            <li>• Multiple choice</li>
            <li>• True/False/Not Given</li>
            <li>• Matching headings</li>
            <li>• Sentence completion</li>
            <li>• Summary completion</li>
          </ul>
        </Card>
        <Card title="Strategies">
          <ul className="space-y-2 text-gray-700">
            <li>• Skim for main ideas first</li>
            <li>• Scan for specific information</li>
            <li>• Manage your time wisely</li>
            <li>• Identify keywords</li>
            <li>• Practice speed reading</li>
          </ul>
        </Card>
        <Card title="Test Format">
          <ul className="space-y-2 text-gray-700">
            <li>• 3 sections, 40 questions</li>
            <li>• 60 minutes total</li>
            <li>• Academic or General Training</li>
            <li>• Increasing difficulty</li>
            <li>• Various text types</li>
          </ul>
        </Card>
      </div>

      <section>
        <h2 className="text-3xl font-bold mb-6">Reading Passages</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {passages.map(passage => (
            <Card key={passage.id} hover>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    passage.type === 'Academic' 
                      ? 'bg-purple-100 text-purple-700' 
                      : 'bg-blue-100 text-blue-700'
                  }`}>
                    {passage.type}
                  </span>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    {passage.timeLimit}
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-2">{passage.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {passage.topics.map(topic => (
                    <span key={topic} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <span>{passage.questions} questions</span>
                  <span className={`px-2 py-1 rounded ${
                    passage.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                    passage.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {passage.difficulty}
                  </span>
                </div>
              </div>
              <Button fullWidth>Start Reading</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
