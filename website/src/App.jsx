import { useState } from 'react'
import 'babel-polyfill';
import ImageGrid from './components/sidebar'
import SpeechRecognizer from './components/SpeechRecognizer'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Layout from './components/layout'
import StraightArrow from './components/StraightArrow';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageGrid />
      <Layout />
      <SpeechRecognizer />
    </>
  )
}

export default App
