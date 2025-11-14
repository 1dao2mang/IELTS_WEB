import React from 'react'
import { Card, Button } from '@/components'
import { Headphones, PlayCircle, PauseCircle } from 'lucide-react'

export const ListeningPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = React.useState(false)

  const exercises = [
    {
      id: 1,
      title: 'Academic Lecture - Climate Change',
      duration: '5:30',
      difficulty: 'Intermediate',
      questions: 10,
    },
    {
      id: 2,
      title: 'Conversation - University Enrollment',
      duration: '4:15',
      difficulty: 'Beginner',
      questions: 8,
    },
    {
      id: 3,
      title: 'Monologue - City Tour Guide',
      duration: '6:00',
      difficulty: 'Advanced',
      questions: 12,
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 mb-4">
          <Headphones className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">IELTS Listening Practice</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Enhance your listening skills with authentic IELTS practice materials
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card title="Section Types">
          <ul className="space-y-2 text-gray-700">
            <li>• Section 1: Social conversation</li>
            <li>• Section 2: Monologue (social context)</li>
            <li>• Section 3: Academic discussion</li>
            <li>• Section 4: Academic lecture</li>
          </ul>
        </Card>
        <Card title="Question Types">
          <ul className="space-y-2 text-gray-700">
            <li>• Multiple choice</li>
            <li>• Matching</li>
            <li>• Plan/map/diagram labeling</li>
            <li>• Form/note/table completion</li>
          </ul>
        </Card>
        <Card title="Tips">
          <ul className="space-y-2 text-gray-700">
            <li>• Read questions beforehand</li>
            <li>• Listen for keywords</li>
            <li>• Pay attention to word limits</li>
            <li>• Check spelling carefully</li>
          </ul>
        </Card>
      </div>

      <section>
        <h2 className="text-3xl font-bold mb-6">Practice Exercises</h2>
        <div className="space-y-4">
          {exercises.map(exercise => (
            <Card key={exercise.id} hover>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-primary-600 text-white p-3 rounded-full hover:bg-primary-700 transition-colors"
                  >
                    {isPlaying ? (
                      <PauseCircle className="h-6 w-6" />
                    ) : (
                      <PlayCircle className="h-6 w-6" />
                    )}
                  </button>
                  <div>
                    <h3 className="text-lg font-semibold">{exercise.title}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>Duration: {exercise.duration}</span>
                      <span>•</span>
                      <span>Questions: {exercise.questions}</span>
                      <span>•</span>
                      <span className={`px-2 py-1 rounded ${
                        exercise.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                        exercise.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {exercise.difficulty}
                      </span>
                    </div>
                  </div>
                </div>
                <Button>Start Exercise</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}
