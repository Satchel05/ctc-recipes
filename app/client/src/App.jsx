import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import RecipeDetails from './pages/RecipeDetails.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/recipes/:id' element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
