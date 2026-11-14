import { useEffect, useState } from 'react'
import { Box, Heading, Image, Stack, Text } from '@chakra-ui/react'
import { backend } from '../lib/backend.js'
import { Link } from 'react-router-dom';

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await backend.get('/api/recipes')
        setRecipes(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipes()
  }, [])

  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error: {error}</Text>

  return (
    <Box p='4' textAlign='center'>
      <Heading mb='4'>Recipes</Heading>

      <Stack gap='4' align='center'>
        {recipes.map((recipe) => (
          <Box key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
            <Image src={recipe.image_url} alt={recipe.title} width='100px' mx='auto' 
              />
            <Text>{recipe.title}
              
            </Text>
            <Text>
              {recipe.cuisine.name} · {recipe.prep_minutes + recipe.cook_minutes} min
            </Text>
            </Link>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}
