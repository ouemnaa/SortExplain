import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, BarChart3, Sparkles, Zap, Brain, Clock } from 'lucide-react'

const sortingAlgorithms = [
  {
    name: 'Bubble Sort',
    description: 'Simple comparison-based algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    complexity: 'O(n²)',
    path: '/bubble-sort',
    icon: '🫧',
    color: 'from-blue-500 to-cyan-500',
    available: true
  },
  {
    name: 'Selection Sort',
    description: 'Finds the minimum element from the unsorted portion and places it at the beginning.',
    complexity: 'O(n²)',
    path: '/selection-sort',
    icon: '🎯',
    color: 'from-purple-500 to-pink-500',
    available: false
  },
  {
    name: 'Insertion Sort',
    description: 'Builds the final sorted array one item at a time, efficient for small datasets.',
    complexity: 'O(n²)',
    path: '/insertion-sort',
    icon: '📝',
    color: 'from-green-500 to-emerald-500',
    available: false
  },
  {
    name: 'Merge Sort',
    description: 'Divide-and-conquer algorithm that divides the array into halves, sorts them, and merges them back.',
    complexity: 'O(n log n)',
    path: '/merge-sort',
    icon: '🔀',
    color: 'from-orange-500 to-red-500',
    available: false
  },
  {
    name: 'Quick Sort',
    description: 'Efficient divide-and-conquer algorithm that picks a pivot and partitions the array around it.',
    complexity: 'O(n log n)',
    path: '/quick-sort',
    icon: '⚡',
    color: 'from-yellow-500 to-orange-500',
    available: false
  },
  {
    name: 'Heap Sort',
    description: 'Uses a binary heap data structure to sort elements efficiently.',
    complexity: 'O(n log n)',
    path: '/heap-sort',
    icon: '🏔️',
    color: 'from-indigo-500 to-purple-500',
    available: false
  }
]

function HomePage({ onNavigate }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <BarChart3 className="h-16 w-16 text-blue-600 mr-4" />
            </motion.div>
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Sort-Explain
            </h1>
          </motion.div>
          
          <motion.p 
            className="text-xl text-slate-600 dark:text-slate-300 max-w-4xl mx-auto mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Visual explanations of core sorting algorithms through interactive demonstrations
          </motion.p>
          
          <motion.div 
            className="mt-8 p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 max-w-5xl mx-auto shadow-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Inspired by MLU-Explain</span>
            </div>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
              Inspired by <a href="https://mlu-explain.github.io/" className="text-blue-600 hover:text-blue-700 underline decoration-2 underline-offset-2 transition-colors" target="_blank" rel="noopener noreferrer">MLU-Explain</a>, 
              Sort-Explain exists to teach important sorting algorithms through visual essays in a fun, informative, and accessible manner.
            </p>
          </motion.div>
        </motion.div>

        {/* Algorithms Grid */}
        <motion.div 
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h2 
            className="text-4xl font-bold text-center mb-12 bg-gradient-to-r from-slate-800 to-slate-600 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent"
            variants={itemVariants}
          >
            Explore Sorting Algorithms
          </motion.h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortingAlgorithms.map((algorithm, index) => (
              <motion.div
                key={algorithm.name}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`h-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl hover:shadow-2xl transition-all duration-300 ${!algorithm.available ? 'opacity-75' : ''}`}>
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-3xl">{algorithm.icon}</div>
                      <motion.div
                        className={`px-3 py-1 rounded-full text-xs font-mono font-bold text-white bg-gradient-to-r ${algorithm.color} shadow-lg`}
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        {algorithm.complexity}
                      </motion.div>
                    </div>
                    <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
                      {algorithm.name}
                      {!algorithm.available && (
                        <span className="ml-2 text-xs bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full">
                          Coming Soon
                        </span>
                      )}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 leading-relaxed">
                      {algorithm.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button 
                        className={`w-full group ${algorithm.available 
                          ? `bg-gradient-to-r ${algorithm.color} hover:shadow-lg text-white border-0` 
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                        } transition-all duration-300`}
                        onClick={() => {
                          if (algorithm.available && algorithm.name === 'Bubble Sort') {
                            onNavigate('bubble-sort')
                          } else if (!algorithm.available) {
                            console.log(`${algorithm.name} coming soon!`)
                          }
                        }}
                        disabled={!algorithm.available}
                      >
                        {algorithm.available ? (
                          <>
                            <Brain className="mr-2 h-4 w-4" />
                            Dive In
                            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        ) : (
                          <>
                            <Clock className="mr-2 h-4 w-4" />
                            Coming Soon
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features Section */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {[
            {
              icon: <Zap className="h-8 w-8 text-yellow-500" />,
              title: "Interactive Visualization",
              description: "Watch algorithms come to life with smooth animations and real-time feedback"
            },
            {
              icon: <Brain className="h-8 w-8 text-purple-500" />,
              title: "Educational Focus",
              description: "Learn through visual explanations and step-by-step algorithm breakdowns"
            },
            {
              icon: <Sparkles className="h-8 w-8 text-pink-500" />,
              title: "Modern Design",
              description: "Beautiful, responsive interface that works seamlessly across all devices"
            }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="text-center p-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-slate-700/50 shadow-lg"
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="flex justify-center mb-4"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                {feature.icon}
              </motion.div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div 
          className="text-center text-slate-500 dark:text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <p className="text-sm">Built with React, Tailwind CSS, and Framer Motion • Designed for educational purposes</p>
        </motion.div>
      </div>
    </div>
  )
}

export default HomePage

