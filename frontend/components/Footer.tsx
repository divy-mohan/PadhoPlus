import Link from 'next/link'
import { BookOpen, Mail, Linkedin, Twitter, Layers, BookMarked, Users, Info, Briefcase, Shield, FileText, RotateCcw } from 'lucide-react'

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
            <h4 className="font-semibold mb-4 text-gray-100 flex items-center gap-2"><Layers className="w-4 h-4 text-blue-400" />Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/batches" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><BookMarked className="w-3.5 h-3.5" />Batches</Link></li>
              <li><Link href="/notes" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><BookOpen className="w-3.5 h-3.5" />Resources</Link></li>
              <li><Link href="/faculty" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><Users className="w-3.5 h-3.5" />Faculty</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100 flex items-center gap-2"><Info className="w-4 h-4 text-purple-400" />Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><Info className="w-3.5 h-3.5" />About</Link></li>
              <li><Link href="/careers" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><Briefcase className="w-3.5 h-3.5" />Careers</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><MailIcon className="w-3.5 h-3.5" />Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gray-100 flex items-center gap-2"><FileText className="w-4 h-4 text-green-400" />Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/terms" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><FileText className="w-3.5 h-3.5" />Terms</Link></li>
              <li><Link href="/privacy" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><Shield className="w-3.5 h-3.5" />Privacy</Link></li>
              <li><Link href="/refund" className="text-gray-400 hover:text-blue-400 transition-smooth flex items-center gap-2"><RotateCcw className="w-3.5 h-3.5" />Refund Policy</Link></li>
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
