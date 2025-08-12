import { useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import BubbleSortPage from './pages/BubbleSortPage.jsx'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  const navigateToPage = (page) => {
    setCurrentPage(page)
  }

  const navigateHome = () => {
    setCurrentPage('home')
  }

  if (currentPage === 'bubble-sort') {
    return <BubbleSortPage onBack={navigateHome} />
  }

  return <HomePage onNavigate={navigateToPage} />
}

export default App
