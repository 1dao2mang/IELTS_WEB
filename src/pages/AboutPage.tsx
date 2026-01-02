import { Card } from '@/components'
import { Target, Award, Heart } from 'lucide-react'

export const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">About IELTS Web</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Your trusted partner in IELTS preparation, helping students worldwide achieve their dreams
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        <Card>
          <div className="flex items-start space-x-4">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-lg">
              <Target className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-600">
                To provide accessible, high-quality IELTS preparation materials that empower students
                to achieve their target scores and pursue their academic and professional goals.
              </p>
            </div>
          </div>
        </Card>

        <Card>
          <div className="flex items-start space-x-4">
            <div className="bg-secondary-100 text-secondary-600 p-3 rounded-lg">
              <Award className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-600">
                To become the world's leading online IELTS learning platform, recognized for
                innovative teaching methods and exceptional student success rates.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-8">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Listening" className="text-center">
            <p className="text-gray-600">
              Authentic audio materials covering various accents and topics to enhance your listening skills.
            </p>
          </Card>
          <Card title="Reading" className="text-center">
            <p className="text-gray-600">
              Academic and general training passages with comprehensive question types and strategies.
            </p>
          </Card>
          <Card title="Writing" className="text-center">
            <p className="text-gray-600">
              Model answers, templates, and feedback for both Task 1 and Task 2 writing assignments.
            </p>
          </Card>
          <Card title="Speaking" className="text-center">
            <p className="text-gray-600">
              Sample questions, tips, and techniques to boost your confidence in speaking tests.
            </p>
          </Card>
        </div>
      </section>

      <section className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl p-12">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-600 text-white mb-6">
            <Heart className="h-8 w-8" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
          <p className="text-lg text-gray-700 mb-6">
            We are dedicated to continuously improving our platform, updating content regularly,
            and providing the best learning experience for our students. Your success is our success.
          </p>
          <div className="flex items-center justify-center space-x-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">10K+</div>
              <div className="text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">500+</div>
              <div className="text-gray-600">Exercises</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
