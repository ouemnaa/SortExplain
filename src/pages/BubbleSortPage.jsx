import { useState, useEffect, useRef } from 'react'
import { motion as Motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, BarChart3, Clock, Zap, Target, CheckCircle } from 'lucide-react'
import ArrayVisualizer from '../components/ArrayVisualizer.jsx'
import ControlPanel from '../components/ControlPanel.jsx'
import { bubbleSort, generateRandomArray } from '../algorithms/bubbleSort.js'

const BubbleSortPage = ({ onBack }) => {
  const [originalArray, setOriginalArray] = useState([64, 34, 25, 12, 22, 11, 90])
  const [currentState, setCurrentState] = useState({
    array: [64, 34, 25, 12, 22, 11, 90],
    comparing: [],
    swapping: [],
    sorted: [],
    current: -1,
    step: 'Ready to start bubble sort',
    description: 'Click play to begin the sorting process'
  })
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(500)
  const [arraySize, setArraySize] = useState(7)
  const [isFinished, setIsFinished] = useState(false)
  
  const generatorRef = useRef(null)
  const timeoutRef = useRef(null)
  const stepsRef = useRef([])
  const currentStepRef = useRef(0)

  // Initialize the sorting algorithm
  const initializeSorting = (array) => {
    const generator = bubbleSort(array)
    generatorRef.current = generator
    
    // Collect all steps
    const steps = []
    let result = generator.next()
    while (!result.done) {
      steps.push(result.value)
      result = generator.next()
    }
    
    stepsRef.current = steps
    currentStepRef.current = 0
    setIsFinished(false)
    
    // Set initial state
    if (steps.length > 0) {
      setCurrentState({
        array: [...array],
        comparing: [],
        swapping: [],
        sorted: [],
        current: -1,
        step: 'Ready to start bubble sort',
        description: 'Click play to begin the sorting process'
      })
    }
  }

  // Initialize on component mount and when array changes
  useEffect(() => {
    initializeSorting(originalArray)
  }, [originalArray])

  // Auto-play functionality
  useEffect(() => {
    if (isPlaying && !isFinished) {
      timeoutRef.current = setTimeout(() => {
        stepForward()
      }, speed)
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isPlaying, currentState, speed, isFinished])

  const stepForward = () => {
    if (currentStepRef.current < stepsRef.current.length) {
      const nextState = stepsRef.current[currentStepRef.current]
      setCurrentState(nextState)
      currentStepRef.current++
      
      if (currentStepRef.current >= stepsRef.current.length) {
        setIsFinished(true)
        setIsPlaying(false)
      }
    }
  }

  const stepBackward = () => {
    if (currentStepRef.current > 0) {
      currentStepRef.current--
      const prevState = currentStepRef.current === 0 
        ? {
            array: [...originalArray],
            comparing: [],
            swapping: [],
            sorted: [],
            current: -1,
            step: 'Ready to start bubble sort',
            description: 'Click play to begin the sorting process'
          }
        : stepsRef.current[currentStepRef.current - 1]
      setCurrentState(prevState)
      setIsFinished(false)
    }
  }

  const handlePlay = () => {
    setIsPlaying(true)
  }

  const handlePause = () => {
    setIsPlaying(false)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setIsFinished(false)
    currentStepRef.current = 0
    setCurrentState({
      array: [...originalArray],
      comparing: [],
      swapping: [],
      sorted: [],
      current: -1,
      step: 'Ready to start bubble sort',
      description: 'Click play to begin the sorting process'
    })
    initializeSorting(originalArray)
  }

  const handleGenerateArray = () => {
    const newArray = generateRandomArray(arraySize, 1, 99)
    setOriginalArray(newArray)
  }

  const handleArraySizeChange = (newSize) => {
    setArraySize(newSize)
    const newArray = generateRandomArray(newSize, 1, 99)
    setOriginalArray(newArray)
  }

  const handleApplyCustomArray = (customArray) => {
    setOriginalArray(customArray)
    setArraySize(customArray.length)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <Motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={onBack}
              variant="outline" 
              className="mb-6 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-800 shadow-lg"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Motion.div>
          
          <div className="text-center">
            <Motion.h1 
              className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              🫧 Bubble Sort Visualization
            </Motion.h1>
            <Motion.p 
              className="text-lg text-slate-600 dark:text-slate-300 max-w-4xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              Watch how bubble sort works by repeatedly stepping through the list, 
              comparing adjacent elements and swapping them if they're in the wrong order.
            </Motion.p>
          </div>
        </Motion.div>

        {/* Visualization */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <Card className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2 text-2xl">
                    <BarChart3 className="h-6 w-6 text-blue-600" />
                    Array Visualization
                  </CardTitle>
                  <CardDescription className="text-lg mt-2">
                    <span className="font-medium">Current Step:</span> {currentState.step}
                  </CardDescription>
                </div>
                {isFinished && (
                  <Motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25 }}
                    className="flex items-center gap-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-4 py-2 rounded-full"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Sorting Complete!</span>
                  </Motion.div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <ArrayVisualizer
                array={currentState.array}
                comparing={currentState.comparing}
                swapping={currentState.swapping}
                sorted={currentState.sorted}
                current={currentState.current}
                height={400}
              />
              <Motion.div 
                className="mt-6 p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-900 rounded-xl border border-slate-200 dark:border-slate-700"
                key={currentState.description}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  <strong className="text-blue-600 dark:text-blue-400">Description:</strong> {currentState.description}
                </p>
              </Motion.div>
            </CardContent>
          </Card>
        </Motion.div>

        {/* Control Panel */}
        <ControlPanel
          isPlaying={isPlaying}
          onPlay={handlePlay}
          onPause={handlePause}
          onStep={stepForward}
          onStepBack={stepBackward}
          onReset={handleReset}
          onGenerateArray={handleGenerateArray}
          speed={speed}
          onSpeedChange={setSpeed}
          arraySize={arraySize}
          onArraySizeChange={handleArraySizeChange}
          onApplyCustomArray={handleApplyCustomArray}
          isFinished={isFinished}
        />

        {/* Algorithm Explanation */}
        <Motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Card className="mt-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-white/20 dark:border-slate-700/50 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-purple-600" />
                How Bubble Sort Works
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <Motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 rounded-xl border border-blue-200 dark:border-blue-800"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-blue-900 dark:text-blue-100">
                    <Zap className="h-5 w-5" />
                    Algorithm Steps
                  </h3>
                  <ol className="list-decimal list-inside space-y-3 text-sm text-blue-800 dark:text-blue-200">
                    <li className="flex items-start gap-2">
                      <span className="font-medium">Start</span> with the first element of the array
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">Compare</span> adjacent elements
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">Swap</span> if they are in the wrong order
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">Continue</span> through the array
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-medium">Repeat</span> until no more swaps are needed
                    </li>
                  </ol>
                </Motion.div>
                
                <Motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 rounded-xl border border-purple-200 dark:border-purple-800"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-purple-900 dark:text-purple-100">
                    <Clock className="h-5 w-5" />
                    Complexity Analysis
                  </h3>
                  <ul className="space-y-3 text-sm text-purple-800 dark:text-purple-200">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                      <strong>Time Complexity:</strong> O(n²) in worst case
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <strong>Space Complexity:</strong> O(1) - in-place sorting
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      <strong>Best Case:</strong> O(n) when array is already sorted
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>
                      <strong>Stable:</strong> Yes, maintains relative order of equal elements
                    </li>
                  </ul>
                </Motion.div>
              </div>
            </CardContent>
          </Card>
        </Motion.div>
      </div>
    </div>
  )
}

export default BubbleSortPage

