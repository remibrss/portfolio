import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { portfolioData } from '@/lib/portfolio-data';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">{portfolioData.name}</h3>
            <p className="text-gray-300">
              Technicien informatique passionné par les nouvelles technologies.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Mail className="mr-2 h-4 w-4" />
                {portfolioData.email}
              </p>
              <p className="flex items-center">
                <Phone className="mr-2 h-4 w-4" />
                {portfolioData.phone}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2 h-4 w-4" />
                {portfolioData.location}
              </p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Réseaux sociaux</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 {portfolioData.name}. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
