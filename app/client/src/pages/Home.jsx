import { useEffect, useState } from 'react'
import { Box, Heading, Input, Text } from '@chakra-ui/react'
import { backend } from '../lib/backend.js'
import CuisineCarousel from '../components/CuisineCarousel.jsx'
import DishCarousel from '../components/DishCarousel.jsx'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedCuisine, setSelectedCuisine] = useState('All')
  const [search, setSearch] = useState('')

  useEffect(() => {
    let active = true

    const fetchRecipes = async () => {
      try {
        const res = await backend.get('/api/recipes')

        if (active) {
          setRecipes(res.data)
        }
      } catch (err) {
        if (active) {
          setError(err.message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    fetchRecipes()

    return () => {
      active = false
    }
  }, [])

  // Build cuisine choices from the recipes returned by the backend.
  const cuisines = [
    'All',
    ...new Set(
      recipes
        .map((recipe) => recipe.cuisine?.name)
        .filter(Boolean)
    ),
  ]

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCuisine =
      selectedCuisine === 'All' ||
      recipe.cuisine?.name === selectedCuisine

    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(search.trim().toLowerCase())

    return matchesCuisine && matchesSearch
  })

  // Group the visible recipes by their actual backend category.
  const recipesByCategory = filteredRecipes.reduce((groups, recipe) => {
    const categoryName = recipe.category?.name || 'Other recipes'

    if (!groups[categoryName]) {
      groups[categoryName] = []
    }

    groups[categoryName].push(recipe)
    return groups
  }, Object.create(null))

  return (
    <Box
      as="main"
      width="100%"
      maxWidth="402px"
      minHeight="100vh"
      marginX="auto"
      paddingBottom="32px"
      background="white"
      color="#292929"
      fontFamily={'Georgia, "Times New Roman", serif'}
    >
      <Box
        as="header"
        padding="58px 16px 0"
        background="linear-gradient(#c9e1f1, #ffffff)"
      >
        <Input
          type="search"
          aria-label="Search recipes"
          placeholder="What would you like to cook?"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          disabled={loading || Boolean(error)}
          display="block"
          width="100%"
          height="auto"
          minHeight="46px"
          padding="15px 18px"
          border="none"
          borderRadius="28px"
          background="#fffbc2"
          color="#292929"
          fontFamily="inherit"
          fontSize="12px"
          lineHeight="1.4"
          _placeholder={{ color: '#555' }}
          _focusVisible={{
            outline: '2px solid #b84c00',
            outlineOffset: '2px',
          }}
        />

        <CuisineCarousel
          cuisines={cuisines}
          selectedCuisine={selectedCuisine}
          onSelect={setSelectedCuisine}
        />
      </Box>

      {loading && (
        <Text padding="16px" role="status">
          Loading recipes...
        </Text>
      )}

      {error && (
        <Text padding="16px" color="red.600" role="alert">
          Could not load recipes: {error}
        </Text>
      )}

      {!loading && !error && filteredRecipes.length === 0 && (
        <Text padding="16px" color="#666">
          {recipes.length === 0
            ? 'No recipes are available yet.'
            : 'No recipes match your search and cuisine.'}
        </Text>
      )}

      {!loading &&
        !error &&
        Object.entries(recipesByCategory).map(
          ([categoryName, categoryRecipes], index) => (
            <Box
              as="section"
              key={categoryName}
              marginTop={index === 0 ? '12px' : '28px'}
              aria-labelledby={`recipe-category-${index}`}
            >
              <Heading
                as="h2"
                id={`recipe-category-${index}`}
                margin="0 16px 20px"
                fontFamily="inherit"
                fontSize="23px"
                fontWeight="normal"
                lineHeight="1.3"
                letterSpacing="normal"
              >
                {categoryName}:
              </Heading>

              <DishCarousel recipes={categoryRecipes} />
            </Box>
          )
        )}
    </Box>
  )
}