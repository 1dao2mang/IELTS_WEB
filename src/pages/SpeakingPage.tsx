import React from 'react'
import { Card, Button } from '@/components'
import { Mic, Video } from 'lucide-react'

export const SpeakingPage: React.FC = () => {
  const parts = [
    {
      part: 'Part 1',
      title: 'Introduction & Interview',
      duration: '4-5 minutes',
      description: 'Answer questions about yourself, your home, family, work, studies, and interests.',
      topics: ['Work/Studies', 'Home', 'Hobbies', 'Daily Routine'],
    },
    {
      part: 'Part 2',
      title: 'Individual Long Turn',
      duration: '3-4 minutes',
      description: 'Speak about a topic for 1-2 minutes after 1 minute of preparation time.',
      topics: ['People', 'Places', 'Objects', 'Events'],
    },
    {
      part: 'Part 3',
      title: 'Two-way Discussion',
      duration: '4-5 minutes',
      description: 'Discuss more abstract ideas related to the Part 2 topic.',
      topics: ['Society', 'Culture', 'Future', 'Opinions'],
    },
  ]

  const sampleQuestions = [
    'Describe your hometown',
    'What do you do in your free time?',
    'Describe a memorable journey you have made',
    'Do you think technology has improved our lives?',
    'What are the benefits of learning a foreign language?',
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 text-orange-600 mb-4">
          <Mic className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">IELTS Speaking Practice</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Build confidence and fluency for your speaking test
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {parts.map(item => (
          <Card key={item.part} title={item.part} subtitle={item.title}>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {item.duration}
              </div>
              <p className="text-gray-700 text-sm">{item.description}</p>
              <div className="pt-2">
                <p className="text-xs font-medium text-gray-500 mb-2">Common Topics:</p>
                <div className="flex flex-wrap gap-1">
                  {item.topics.map(topic => (
                    <span key={topic} className="px-2 py-1 bg-orange-50 text-orange-700 text-xs rounded">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <section className="mb-12">
        <Card title="Tips for Success">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ul className="space-y-2 text-gray-700">
              <li>• Speak clearly and at a natural pace</li>
              <li>• Extend your answers with examples</li>
              <li>• Use a variety of vocabulary</li>
              <li>• Don't memorize answers</li>
            </ul>
            <ul className="space-y-2 text-gray-700">
              <li>• Practice pronunciation daily</li>
              <li>• Record yourself speaking</li>
              <li>• Think in English</li>
              <li>• Stay calm and confident</li>
            </ul>
          </div>
        </Card>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Sample Questions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {sampleQuestions.map((question, index) => (
            <Card key={index} hover>
              <div className="flex items-center justify-between">
                <p className="text-gray-800 font-medium">{question}</p>
                <Button size="sm" variant="outline">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card className="bg-gradient-to-r from-orange-50 to-yellow-50">
          <div className="text-center">
            <Video className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Practice with AI</h3>
            <p className="text-gray-700 mb-6">
              Simulate a real IELTS speaking test with our AI examiner
            </p>
            <Button size="lg">Start Mock Interview</Button>
          </div>
        </Card>
      </section>
    </div>
  )
}
