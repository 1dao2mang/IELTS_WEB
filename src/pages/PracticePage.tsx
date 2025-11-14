import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button } from '@/components'
import { Headphones, BookText, PenTool, Mic, Trophy } from 'lucide-react'

export const PracticePage: React.FC = () => {
  const practiceModules = [
    {
      skill: 'Listening',
      icon: Headphones,
      color: 'blue',
      tests: 12,
      completed: 5,
      link: '/listening',
    },
    {
      skill: 'Reading',
      icon: BookText,
      color: 'green',
      tests: 15,
      completed: 8,
      link: '/reading',
    },
    {
      skill: 'Writing',
      icon: PenTool,
      color: 'purple',
      tests: 10,
      completed: 3,
      link: '/writing',
    },
    {
      skill: 'Speaking',
      icon: Mic,
      color: 'orange',
      tests: 8,
      completed: 2,
      link: '/speaking',
    },
  ]

  const recentTests = [
    { title: 'Listening Test 5', score: '7.5', date: '2024-01-10' },
    { title: 'Reading Practice 8', score: '8.0', date: '2024-01-08' },
    { title: 'Writing Task 2', score: '6.5', date: '2024-01-05' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary-100 text-primary-600 mb-4">
          <Trophy className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Practice Tests</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Track your progress and master all four IELTS skills
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {practiceModules.map(module => {
          const Icon = module.icon
          const progress = (module.completed / module.tests) * 100
          
          return (
            <Card key={module.skill} hover>
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-${module.color}-100 text-${module.color}-600 mb-4`}>
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{module.skill}</h3>
                <p className="text-gray-600 mb-4">
                  {module.completed} / {module.tests} tests completed
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div
                    className={`bg-${module.color}-600 h-2 rounded-full transition-all`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <Link to={module.link}>
                  <Button fullWidth size="sm">Continue Practice</Button>
                </Link>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-2xl font-bold mb-6">Recent Tests</h2>
          <div className="space-y-4">
            {recentTests.map((test, index) => (
              <Card key={index}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">{test.title}</h3>
                    <p className="text-sm text-gray-600">{test.date}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">{test.score}</div>
                    <p className="text-xs text-gray-600">Band Score</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-6">Quick Start</h2>
          <Card>
            <h3 className="text-lg font-semibold mb-4">Full Practice Test</h3>
            <p className="text-gray-600 mb-4">
              Take a complete IELTS practice test covering all four skills (approx. 3 hours)
            </p>
            <Button fullWidth size="lg">Start Full Test</Button>
          </Card>
          
          <Card className="mt-4">
            <h3 className="text-lg font-semibold mb-4">Mini Test</h3>
            <p className="text-gray-600 mb-4">
              Quick 30-minute practice session focusing on one skill
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">Listening</Button>
              <Button variant="outline" size="sm">Reading</Button>
              <Button variant="outline" size="sm">Writing</Button>
              <Button variant="outline" size="sm">Speaking</Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  )
}
