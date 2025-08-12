// Bubble Sort Algorithm Implementation

export function* bubbleSort(array) {
  const arr = [...array]
  const n = arr.length
  
  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    
    for (let j = 0; j < n - i - 1; j++) {
      // Comparing elements
      yield {
        array: [...arr],
        comparing: [j, j + 1],
        swapping: [],
        sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
        current: j,
        step: `Comparing elements at positions ${j} and ${j + 1}`,
        description: `Comparing ${arr[j]} and ${arr[j + 1]}. ${arr[j] > arr[j + 1] ? 'They are out of order, will swap.' : 'They are in correct order.'}`
      }
      
      if (arr[j] > arr[j + 1]) {
        // Swapping elements
        yield {
          array: [...arr],
          comparing: [],
          swapping: [j, j + 1],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          current: j,
          step: `Swapping elements at positions ${j} and ${j + 1}`,
          description: `Swapping ${arr[j]} and ${arr[j + 1]} because ${arr[j]} > ${arr[j + 1]}`
        }
        
        // Perform the swap
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        
        swapped = true
        
        // Show result after swap
        yield {
          array: [...arr],
          comparing: [],
          swapping: [],
          sorted: Array.from({ length: i }, (_, k) => n - 1 - k),
          current: j + 1,
          step: `Swapped elements`,
          description: `Elements swapped. Array is now: [${arr.join(', ')}]`
        }
      }
    }
    
    // Mark the last element as sorted
    yield {
      array: [...arr],
      comparing: [],
      swapping: [],
      sorted: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      current: -1,
      step: `Pass ${i + 1} completed`,
      description: `Pass ${i + 1} completed. Element ${arr[n - 1 - i]} is now in its correct position.`
    }
    
    // If no swapping occurred, array is sorted
    if (!swapped) {
      yield {
        array: [...arr],
        comparing: [],
        swapping: [],
        sorted: Array.from({ length: n }, (_, k) => k),
        current: -1,
        step: 'Sorting completed!',
        description: 'No swaps were made in this pass. The array is now completely sorted!'
      }
      break
    }
  }
  
  // Final state - all elements sorted
  yield {
    array: [...arr],
    comparing: [],
    swapping: [],
    sorted: Array.from({ length: n }, (_, k) => k),
    current: -1,
    step: 'Sorting completed!',
    description: 'Bubble sort algorithm has finished. All elements are now in their correct positions.'
  }
}

export function generateRandomArray(size, min = 1, max = 100) {
  return Array.from({ length: size }, () => 
    Math.floor(Math.random() * (max - min + 1)) + min
  )
}

