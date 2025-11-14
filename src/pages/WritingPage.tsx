import React from 'react'
import { Card, Button, Input } from '@/components'
import { PenTool, FileText } from 'lucide-react'

export const WritingPage: React.FC = () => {
  const tasks = [
    {
      id: 1,
      type: 'Task 1',
      title: 'Academic - Bar Chart Analysis',
      description: 'Describe the information shown in the bar chart comparing energy consumption across countries.',
      wordCount: 150,
      timeLimit: '20 min',
      difficulty: 'Intermediate',
    },
    {
      id: 2,
      type: 'Task 1',
      title: 'General Training - Formal Letter',
      description: 'Write a letter to your manager requesting time off for a family event.',
      wordCount: 150,
      timeLimit: '20 min',
      difficulty: 'Beginner',
    },
    {
      id: 3,
      type: 'Task 2',
      title: 'Opinion Essay - Technology in Education',
      description: 'Some people believe technology has made learning easier. To what extent do you agree or disagree?',
      wordCount: 250,
      timeLimit: '40 min',
      difficulty: 'Advanced',
    },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-purple-100 text-purple-600 mb-4">
          <PenTool className="h-10 w-10" />
        </div>
        <h1 className="text-4xl font-bold mb-4">IELTS Writing Practice</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Develop your writing skills with Task 1 and Task 2 practice exercises
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card title="Task 1">
          <ul className="space-y-2 text-gray-700">
            <li>• Academic: graphs, charts, diagrams</li>
            <li>• General: letters (formal/informal)</li>
            <li>• 150 words minimum</li>
            <li>• 20 minutes recommended</li>
            <li>• Describe, compare, summarize</li>
          </ul>
        </Card>
        <Card title="Task 2">
          <ul className="space-y-2 text-gray-700">
            <li>• Essay writing</li>
            <li>• Opinion, discussion, problems</li>
            <li>• 250 words minimum</li>
            <li>• 40 minutes recommended</li>
            <li>• Clear argument structure</li>
          </ul>
        </Card>
        <Card title="Tips">
          <ul className="space-y-2 text-gray-700">
            <li>• Plan before writing</li>
            <li>• Use paragraphs effectively</li>
            <li>• Check grammar and spelling</li>
            <li>• Manage your time</li>
            <li>• Answer all parts of question</li>
          </ul>
        </Card>
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold mb-6">Writing Tasks</h2>
        <div className="space-y-6">
          {tasks.map(task => (
            <Card key={task.id} hover>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      task.type === 'Task 1' 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {task.type}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      task.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                      task.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {task.difficulty}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{task.title}</h3>
                  <p className="text-gray-600 mb-3">{task.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>Minimum: {task.wordCount} words</span>
                    <span>•</span>
                    <span>Time: {task.timeLimit}</span>
                  </div>
                </div>
                <Button className="ml-4">Start Writing</Button>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <Card title="Sample Writing Area" className="bg-gray-50">
          <div className="space-y-4">
            <Input 
              label="Essay Title" 
              placeholder="Enter your essay title..."
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Essay
              </label>
              <textarea
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                rows={12}
                placeholder="Start writing your response here..."
              />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Word count: 0</span>
              <div className="space-x-2">
                <Button variant="outline">Save Draft</Button>
                <Button>Submit</Button>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  )
}
