import { useState } from 'react'
import ImageGrid from './components/sidebar'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/layout'

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
    <ImageGrid/>
    <Layout/>
      </>
  )
}

export default App
