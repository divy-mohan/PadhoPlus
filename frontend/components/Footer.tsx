import Link from 'next/link'
import { BookOpen, Mail, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white mt-20 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
                <BookOpen className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">PadhoPlus</span>
            </div>
            <p className="text-gray-400 text-sm">Making quality education accessible to everyone</p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/batches" className="text-gray-400 hover:text-blue-400 transition-smooth">Batches</Link></li>
              <li><Link href="/notes" className="text-gray-400 hover:text-blue-400 transition-smooth">Resources</Link></li>
              <li><Link href="/faculty" className="text-gray-400 hover:text-blue-400 transition-smooth">Faculty</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-smooth">About</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-blue-400 transition-smooth">Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-smooth">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-smooth">Terms</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-smooth">Privacy</Link></li>
              <li><Link href="/refund" className="text-gray-400 hover:text-blue-400 transition-smooth">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 PadhoPlus. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-smooth hover:scale-110">
              <Mail className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-smooth hover:scale-110">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-smooth hover:scale-110">
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
