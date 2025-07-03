import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { education } from '@/lib/portfolio-data';

export default function EducationSection() {
  return (
    <section id="education" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Mon parcours scolaire</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-0.5 h-full bg-blue-600"></div>
          
          <div className="space-y-12">
            {education.map((edu, index) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative flex items-center"
              >
                <div className="absolute left-2 md:left-1/2 transform md:-translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-md"></div>
                <div className={`ml-12 md:ml-0 ${index % 2 === 0 ? 'md:w-1/2 md:pr-8' : 'md:w-1/2 md:pl-8 md:ml-auto'}`}>
                  <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                    <CardContent className="p-6">
                      <div className="flex items-center mb-4">
                        <img
                          src={edu.imageUrl}
                          alt={`${edu.institution} - Campus`}
                          className="w-16 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-bold text-slate-800">{edu.institution}</h3>
                          <p className="text-blue-600 font-semibold">{edu.period}</p>
                        </div>
                      </div>
                      <p className="text-gray-700">{edu.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
