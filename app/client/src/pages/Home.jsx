import { useState } from 'react'
import CuisineCarousel from '../components/CuisineCarousel.jsx'
import DishCarousel from '../components/DishCarousel.jsx'
import './Home.css'

const recipes = [
  {
    id: 1,
    title: 'Shrimp Chili Udon',
    description:
      'Plump, tender shrimp tossed with chewy wheat udon noodles in a bold, savory chili sauce.',
    image_url: 'https://placehold.co/300x300?text=Shrimp+Chili+Udon',
    cuisine: 'Japanese',
    difficulty: 'Easy',
    rating: 4.6,
    prep_minutes: 10,
    cook_minutes: 20,
    sections: ['trending'],
  },
  {
    id: 2,
    title: 'Gyudon',
    description:
      'Steamed white rice topped with thinly sliced beef and onions in a sweet umami broth.',
    image_url: 'https://placehold.co/300x300?text=Gyudon',
    cuisine: 'Japanese',
    difficulty: 'Easy',
    rating: 4.7,
    prep_minutes: 10,
    cook_minutes: 15,
    sections: ['trending', 'quick'],
  },
  {
    id: 3,
    title: 'Yakisoba',
    description:
      'Stir-fried noodles with pork and vegetables coated in a sweet-and-savory sauce.',
    image_url: 'https://placehold.co/300x300?text=Yakisoba',
    cuisine: 'Japanese',
    difficulty: 'Easy',
    rating: 4.7,
    prep_minutes: 10,
    cook_minutes: 15,
    sections: ['quick', 'trending'],
  },
  {
    id: 4,
    title: 'Onigiri',
    description:
      'Rice balls made from steamed short-grain rice, wrapped in a strip of nori.',
    image_url: 'https://placehold.co/300x300?text=Onigiri',
    cuisine: 'Japanese',
    difficulty: 'Easy',
    rating: 4.7,
    prep_minutes: 15,
    cook_minutes: 10,
    sections: ['quick'],
  },
]

export default function Home() {
  const [selectedCuisine, setSelectedCuisine] = useState('Japanese')
  const [search, setSearch] = useState('')

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCuisine = recipe.cuisine === selectedCuisine
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    return matchesCuisine && matchesSearch
  })

  const trendingRecipes = filteredRecipes.filter((recipe) =>
    recipe.sections.includes('trending')
  )

  const quickRecipes = filteredRecipes.filter((recipe) =>
    recipe.sections.includes('quick')
  )

  return (
    <main className="home-page">
      <header className="home-header">
        <input
          className="recipe-search"
          type="search"
          aria-label="Search recipes"
          placeholder="What would you like to cook?"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <CuisineCarousel
          selectedCuisine={selectedCuisine}
          onSelect={setSelectedCuisine}
        />
      </header>

      <section className="recipe-section" aria-labelledby="trending-title">
        <h2 id="trending-title">Trending:</h2>
        <DishCarousel recipes={trendingRecipes} />
      </section>

      <section className="recipe-section" aria-labelledby="quick-title">
        <h2 id="quick-title">Quick &amp; Easy:</h2>
        <DishCarousel recipes={quickRecipes} />
      </section>
    </main>
  )
}