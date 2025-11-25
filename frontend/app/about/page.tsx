import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Breadcrumb from '@/components/Breadcrumb'
import { Lightbulb, Target, Users, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="bg-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb items={[{ label: 'About' }]} />
      </div>

      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About PadhoPlus</h1>
            <p className="text-xl text-gray-600">Making quality education accessible to everyone</p>
          </div>

          <div className="prose prose-lg max-w-none text-gray-700">
            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
            <p>
              PadhoPlus is on a mission to democratize education. We believe that quality preparation for competitive exams like JEE and NEET should not be limited by geography or financial constraints.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why We Started</h2>
            <p>
              We saw brilliant students unable to access good coaching due to costs. We started PadhoPlus to provide structured, high-quality content at the lowest possible cost or completely free.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Approach</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Structured curriculum designed by IIT/AIIMS toppers</li>
              <li>Live and recorded classes for flexibility</li>
              <li>24/7 doubt support from experienced educators</li>
              <li>Real-time progress analytics to track improvement</li>
              <li>Community learning with peer interaction</li>
            </ul>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            <div className="card text-center">
              <div className="flex justify-center mb-4 text-blue-600">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">10K+</div>
              <p className="text-sm text-gray-600">Active Students</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4 text-blue-600">
                <Target className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">500+</div>
              <p className="text-sm text-gray-600">Lectures</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4 text-blue-600">
                <Award className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">95%</div>
              <p className="text-sm text-gray-600">Success Rate</p>
            </div>
            <div className="card text-center">
              <div className="flex justify-center mb-4 text-blue-600">
                <Lightbulb className="w-8 h-8" />
              </div>
              <div className="text-3xl font-bold text-gray-900">2+</div>
              <p className="text-sm text-gray-600">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
