import { motion as Motion } from 'framer-motion'
import { motion } from 'framer-motion'

const ArrayVisualizer = ({ 
  array, 
  comparing = [], 
  swapping = [], 
  sorted = [], 
  pivot = -1,
  current = -1,
  height = 400 
}) => {
  const maxValue = Math.max(...array)
  // Keep bars readable; prefer horizontal scrolling instead of shrinking too much
  const barWidth = Math.max(36, Math.min(80, 900 / array.length))
  const containerWidth = array.length * (barWidth + 4)
  const valueFontClass = barWidth > 45 ? 'text-sm' : 'text-xs'

  const getBarColor = (index) => {
    if (sorted.includes(index)) return 'from-emerald-400 to-emerald-600' // green gradient for sorted
    if (pivot === index) return 'from-amber-400 to-amber-600' // amber gradient for pivot
    if (current === index) return 'from-blue-400 to-blue-600' // blue gradient for current
    if (swapping.includes(index)) return 'from-red-400 to-red-600' // red gradient for swapping
    if (comparing.includes(index)) return 'from-purple-400 to-purple-600' // purple gradient for comparing
    return 'from-slate-300 to-slate-500' // gray gradient for default
  }

  const getBarHeight = (value) => {
    return Math.max(20, (value / maxValue) * (height - 60))
  }

  const getBarShadow = (index) => {
    if (sorted.includes(index)) return 'shadow-lg shadow-emerald-200'
    if (pivot === index) return 'shadow-lg shadow-amber-200'
    if (current === index) return 'shadow-lg shadow-blue-200'
    if (swapping.includes(index)) return 'shadow-lg shadow-red-200'
    if (comparing.includes(index)) return 'shadow-lg shadow-purple-200'
    return 'shadow-md shadow-slate-200'
  }

  // Stable identity per value occurrence to enable smooth reordering
  const occurrenceCounts = new Map()

  return (
    <div className="flex flex-col items-center p-6">
      <div className="w-full overflow-x-auto">
        <Motion.div 
          className="inline-flex items-end justify-start gap-1 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl"
          style={{ width: Math.max(containerWidth + 48, 950), height: height + 48 }}
          layout
        >
        {array.map((value, index) => {
          const seen = occurrenceCounts.get(value) ?? 0
          occurrenceCounts.set(value, seen + 1)
          const stableKey = `${value}-${seen}`
          return (
            <Motion.div
              key={stableKey}
              className="flex flex-col items-center"
              style={{ width: barWidth }}
              layout
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                layout: { type: 'spring', stiffness: 500, damping: 32 },
                duration: 0.25
              }}
            >
              <Motion.div
                className={`rounded-t-lg bg-gradient-to-t ${getBarColor(index)} ${getBarShadow(index)} flex items-end justify-center text-white ${valueFontClass} font-bold border border-white/20`}
                style={{
                  height: getBarHeight(value),
                  minHeight: '30px'
                }}
                layout
                animate={{
                  scale: swapping.includes(index) ? 1.06 : comparing.includes(index) ? 1.02 : 1,
                  y: swapping.includes(index) ? -6 : 0
                }}
                transition={{ 
                  layout: { type: 'spring', stiffness: 500, damping: 32 },
                  type: 'spring',
                  stiffness: 380,
                  damping: 28
                }}
                title={String(value)}
              >
                {barWidth > 28 && (
                  <Motion.span 
                    className="mb-2 drop-shadow-sm"
                    animate={{ 
                      scale: swapping.includes(index) || comparing.includes(index) ? 1.08 : 1 
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {value}
                  </Motion.span>
                )}
              </Motion.div>
              {array.length <= 30 && (
                <Motion.div 
                  className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-medium"
                  animate={{ 
                    color: swapping.includes(index) || comparing.includes(index) ? '#ef4444' : undefined 
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {index}
                </Motion.div>
              )}
            </Motion.div>
          )
        })}
        </Motion.div>
      </div>
      
      {/* Enhanced Legend */}
      <motion.div 
        className="flex flex-wrap gap-6 mt-6 p-4 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm rounded-xl border border-slate-200 dark:border-slate-700 shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        {[
          { color: 'bg-gradient-to-r from-purple-400 to-purple-600', label: 'Comparing', shadow: 'shadow-purple-200' },
          { color: 'bg-gradient-to-r from-red-400 to-red-600', label: 'Swapping', shadow: 'shadow-red-200' },
          { color: 'bg-gradient-to-r from-blue-400 to-blue-600', label: 'Current', shadow: 'shadow-blue-200' },
          { color: 'bg-gradient-to-r from-amber-400 to-amber-600', label: 'Pivot', shadow: 'shadow-amber-200' },
          { color: 'bg-gradient-to-r from-emerald-400 to-emerald-600', label: 'Sorted', shadow: 'shadow-emerald-200' }
        ].map(({ color, label, shadow }) => (
          <motion.div 
            key={label}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className={`w-5 h-5 ${color} ${shadow} shadow-md rounded-md border border-white/20`}></div>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{label}</span>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default ArrayVisualizer

