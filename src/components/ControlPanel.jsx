import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack, 
  RotateCcw, 
  Shuffle,
  Zap,
  Settings,
  Edit3
} from 'lucide-react'

const ControlPanel = ({
  isPlaying,
  onPlay,
  onPause,
  onStep,
  onStepBack,
  onReset,
  onGenerateArray,
  speed,
  onSpeedChange,
  arraySize,
  onArraySizeChange,
  onApplyCustomArray,
  isFinished
}) => {
  const [inputArray, setInputArray] = useState('')

  const handleCustomArraySubmit = () => {
    try {
      const numbers = inputArray
        .split(',')
        .map(n => parseInt(n.trim()))
        .filter(n => !isNaN(n) && n > 0)
      
      if (numbers.length > 0) {
        onApplyCustomArray(numbers)
        setInputArray('')
      }
    } catch (error) {
      console.error('Invalid array format', error)
    }
  }

  const getSpeedLabel = (speed) => {
    if (speed <= 100) return 'Very Fast'
    if (speed <= 300) return 'Fast'
    if (speed <= 600) return 'Normal'
    if (speed <= 1000) return 'Slow'
    return 'Very Slow'
  }

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      
      {/* Playback Controls */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/50 dark:to-indigo-950/50 border-blue-200 dark:border-blue-800 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Play className="h-5 w-5" />
            Playback Controls
          </CardTitle>
          <CardDescription className="text-blue-700 dark:text-blue-300">
            Control the visualization playback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onStepBack}
                disabled={isPlaying}
                variant="outline"
                size="sm"
                className="border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900"
              >
                <SkipBack className="h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              {isPlaying ? (
                <Button 
                  onClick={onPause} 
                  size="sm"
                  className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg"
                >
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </Button>
              ) : (
                <Button 
                  onClick={onPlay} 
                  disabled={isFinished} 
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white shadow-lg"
                >
                  <Play className="h-4 w-4 mr-2" />
                  Play
                </Button>
              )}
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onStep}
                disabled={isPlaying || isFinished}
                variant="outline"
                size="sm"
                className="border-blue-300 hover:bg-blue-100 dark:border-blue-700 dark:hover:bg-blue-900"
              >
                <SkipForward className="h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={onReset}
                variant="outline"
                size="sm"
                className="border-slate-300 hover:bg-slate-100 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </motion.div>
          </div>
          
          {/* Speed Control */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-blue-900 dark:text-blue-100 font-medium">
                <Zap className="h-4 w-4 inline mr-1" />
                Speed
              </Label>
              <span className="text-sm font-medium text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-900 px-2 py-1 rounded-md">
                {getSpeedLabel(speed)}
              </span>
            </div>
            <Slider
              value={[speed]}
              onValueChange={(value) => onSpeedChange(value[0])}
              min={50}
              max={2000}
              step={50}
              className="w-full"
            />
            <div className="text-xs text-blue-600 dark:text-blue-400 text-center">
              {speed}ms delay
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Array Controls */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/50 dark:to-pink-950/50 border-purple-200 dark:border-purple-800 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
            <Settings className="h-5 w-5" />
            Array Controls
          </CardTitle>
          <CardDescription className="text-purple-700 dark:text-purple-300">
            Configure the array to sort
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Array Size */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-purple-900 dark:text-purple-100 font-medium">Array Size</Label>
              <span className="text-sm font-medium text-purple-700 dark:text-purple-300 bg-purple-100 dark:bg-purple-900 px-2 py-1 rounded-md">
                {arraySize} elements
              </span>
            </div>
            <Slider
              value={[arraySize]}
              onValueChange={(value) => onArraySizeChange(value[0])}
              min={5}
              max={50}
              step={1}
              className="w-full"
            />
          </div>
          
          {/* Generate Random Array */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={onGenerateArray}
              variant="outline"
              className="w-full border-purple-300 hover:bg-purple-100 dark:border-purple-700 dark:hover:bg-purple-900 text-purple-900 dark:text-purple-100"
            >
              <Shuffle className="h-4 w-4 mr-2" />
              Generate Random Array
            </Button>
          </motion.div>
        </CardContent>
      </Card>

      {/* Custom Array Input */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/50 border-emerald-200 dark:border-emerald-800 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-emerald-900 dark:text-emerald-100">
            <Edit3 className="h-5 w-5" />
            Custom Array
          </CardTitle>
          <CardDescription className="text-emerald-700 dark:text-emerald-300">
            Enter your own numbers to sort
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label className="text-emerald-900 dark:text-emerald-100 font-medium">
              Enter numbers (comma-separated)
            </Label>
            <Input
              value={inputArray}
              onChange={(e) => setInputArray(e.target.value)}
              placeholder="e.g., 64, 34, 25, 12, 22, 11, 90"
              className="border-emerald-300 focus:border-emerald-500 dark:border-emerald-700"
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              onClick={handleCustomArraySubmit}
              variant="outline"
              className="w-full border-emerald-300 hover:bg-emerald-100 dark:border-emerald-700 dark:hover:bg-emerald-900 text-emerald-900 dark:text-emerald-100"
              disabled={!inputArray.trim()}
            >
              Apply Custom Array
            </Button>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default ControlPanel

