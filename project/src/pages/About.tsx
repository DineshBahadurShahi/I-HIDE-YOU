import React from 'react';
import { Github, Linkedin, Mail, Code } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-pink-500/20 rounded-full blur-2xl" />
          
          <div className="relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 shadow-xl">
            <div className="text-center mb-12">
              <div className="w-40 h-40 mx-auto mb-6 rounded-full overflow-hidden border-4 border-purple-500/50 shadow-lg transform hover:scale-105 transition-transform duration-300">
                <img
                  src="/project/dinesh.jpeg"
                  alt="Dinesh Bahadur Shahi"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-4xl font-bold text-white mb-4">Dinesh Bahadur Shahi</h1>
              <div className="flex items-center justify-center space-x-2 text-purple-400">
                <Code className="w-5 h-5" />
                <span className="text-lg">Java Developer</span>
              </div>
            </div>

            <div className="max-w-2xl mx-auto space-y-8">
              <p className="text-gray-300 text-center leading-relaxed">
                I specialize in Java development with a passion for creating efficient and scalable applications. 
                With a focus on clean code and innovative solutions, I strive to build software that makes a difference.
              </p>

              <div className="flex flex-col items-center space-y-6">
                <a
                  href="mailto:imdineshbdr@gmail.com"
                  className="group flex items-center space-x-3 text-gray-300 hover:text-purple-400 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span className="border-b border-dashed border-gray-600 group-hover:border-purple-400">
                    imdineshbdr@gmail.com
                  </span>
                </a>

                <div className="flex items-center space-x-4">
                  <a
                    href="https://github.com/DineshBahadurShahi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700/50 hover:bg-purple-500/20 rounded-xl text-white transition-colors duration-300"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/dinesh-bahadur-shahi-24749628a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-700/50 hover:bg-purple-500/20 rounded-xl text-white transition-colors duration-300"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gray-400 text-sm">
                  Currently working on exciting projects and always open to new opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}