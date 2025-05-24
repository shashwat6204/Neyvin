import Link from "next/link";
import Image from "next/image";
import {
  FaLinkedin,
  FaInstagram,
  FaGlobe,
  FaYoutube,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo Section */}
          <div className="space-y-4">
            <Image
              src="/images/neyvinLogo.jpg"
              alt="Neyvin Logo"
              width={80}
              height={80}
              className="mb-4"
            />
            <p className="text-gray-600 text-sm leading-relaxed">
              Empowering businesses through innovative HR solutions and cutting-edge technology services.
            </p>
            <div className="flex space-x-4 pt-4">
              <Link 
                href="https://www.linkedin.com/company/neyvin-technologies/?viewAsMember=true" 
                target="_blank"
                className="text-gray-600 hover:text-primary transition-all duration-300 transform hover:scale-125"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.instagram.com/digital_neyvin?igsh=eW42NHdoMmNwbjBm" 
                target="_blank"
                className="text-gray-600 hover:text-primary transition-all duration-300 transform hover:scale-125"
                aria-label="Instagram"
              >
                <FaInstagram className="w-5 h-5" />
              </Link>
              <Link 
                href="https://www.youtube.com/@NeyvinTech" 
                target="_blank"
                className="text-gray-600 hover:text-primary transition-all duration-300 transform hover:scale-125"
                aria-label="YouTube"
              >
                <FaYoutube className="w-5 h-5" />
              </Link>
              <a 
                href="mailto:hr@neyvintechnologies.com"
                className="text-gray-600 hover:text-primary transition-all duration-300 transform hover:scale-125 cursor-pointer"
                aria-label="Email"
              >
                <FaEnvelope className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-600 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-600 hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/vision" className="text-gray-600 hover:text-primary transition-colors">
                  Our Vision
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Our Services</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/services/business-consulting" className="text-gray-600 hover:text-primary transition-colors">
                  Business Consulting
                </Link>
              </li>
              <li>
                <Link href="/services/manpower-recruitment" className="text-gray-600 hover:text-primary transition-colors">
                  Manpower Recruitment
                </Link>
              </li>
              <li>
                <Link href="/services/project-management" className="text-gray-600 hover:text-primary transition-colors">
                  Project Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Career Section */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Careers</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/careers" className="text-gray-600 hover:text-primary transition-colors">
                  Browse Opportunities
                </Link>
              </li>
              <li>
                <Link href="/submit-cv" className="text-gray-600 hover:text-primary transition-colors">
                  Submit Your CV
                </Link>
              </li>
              <li>
                <Link 
                  href="/admin/login" 
                  className="text-gray-500 hover:text-primary transition-colors text-sm"
                >
                  Admin Portal
                </Link>
              </li>
            </ul>
            <div className="mt-6 p-4 bg-primary/5 rounded-lg">
              <p className="text-sm text-gray-600">
                Looking to join our team? We're always on the lookout for talented individuals.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} Neyvin Technologies. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
