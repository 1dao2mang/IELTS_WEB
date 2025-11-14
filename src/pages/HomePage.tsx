import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Card } from '@/components'
import { Headphones, BookText, PenTool, Mic, Award, Users, Clock } from 'lucide-react'

export const HomePage: React.FC = () => {
  const skills = [
    {
      title: 'Listening',
      icon: Headphones,
      description: 'Improve your listening comprehension with authentic IELTS materials',
      link: '/listening',
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Reading',
      icon: BookText,
      description: 'Master reading strategies for academic and general training texts',
      link: '/reading',
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      title: 'Writing',
      icon: PenTool,
      description: 'Develop your writing skills for Task 1 and Task 2',
      link: '/writing',
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      title: 'Speaking',
      icon: Mic,
      description: 'Practice speaking with sample questions and tips',
      link: '/speaking',
      color: 'text-orange-600',
      bg: 'bg-orange-50',
    },
  ]

  const features = [
    {
      icon: Award,
      title: 'Expert Content',
      description: 'All materials designed by experienced IELTS instructors',
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Join thousands of learners worldwide',
    },
    {
      icon: Clock,
      title: 'Flexible Learning',
      description: 'Study at your own pace, anytime, anywhere',
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Master IELTS with Confidence</h1>
            <p className="text-xl mb-8 text-primary-100">
              Comprehensive preparation for all four IELTS skills
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/practice">
                <Button size="lg" variant="secondary">
                  Start Practice
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="bg-white text-primary-600 hover:bg-gray-100">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your Skill</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skills.map(skill => {
              const Icon = skill.icon
              return (
                <Link key={skill.title} to={skill.link}>
                  <Card hover className="h-full">
                    <div className={`${skill.bg} ${skill.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                    <p className="text-gray-600">{skill.description}</p>
                  </Card>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose IELTS Web?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map(feature => {
              const Icon = feature.icon
              return (
                <div key={feature.title} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-4">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary-50 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Your IELTS Journey?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Join thousands of successful students who achieved their target scores
          </p>
          <Link to="/practice">
            <Button size="lg">Begin Practice Now</Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
