import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  Bolt, 
  Monitor, 
  Cloud, 
  Server, 
  Terminal, 
  Network 
} from 'lucide-react';
import { skills } from '@/lib/portfolio-data';

const iconMap = {
  Bolt,
  Monitor,
  Cloud,
  Server,
  Terminal,
  Network
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Mes Compétences</h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill, index) => {
            const IconComponent = iconMap[skill.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={skill.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="bg-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <IconComponent className="text-2xl text-blue-600 mr-3 w-6 h-6" />
                      <h3 className="text-xl font-semibold text-slate-800">{skill.name}</h3>
                    </div>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.percentage}%` }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <Progress value={skill.percentage} className="mb-2 h-3" />
                    </motion.div>
                    <p className="text-sm text-gray-600">{skill.percentage}%</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
