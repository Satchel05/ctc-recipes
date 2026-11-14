import { useEffect, useState } from 'react'
import { Avatar, Box, Heading, HStack, Image, Stack, Text, SimpleGrid } from '@chakra-ui/react'
import { backend } from '../lib/backend.js'
import SearchBar from '../components/ui/SearchBar.jsx'
import {FoodCard} from '../components/FoodCard.jsx'

export default function Home() {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

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
    <Box px='16px' py='38px'>
      <Stack gap='20px'>
        <HStack display='flex' gap='17px' align-items='center' justify-content='center'>
          <Avatar.Root>
            <Avatar.Fallback name='Petr'/>
          </Avatar.Root>
          <Heading font-family = 'Inter' size='32px' font-weight='400'>Hello, {' '}
            <Text as='span' color='#114240' font-weight= '700'>Petr</Text>
          </Heading>
        </HStack>
        <SearchBar value={search} onChange={setSearch} />
        <Box textAlign='left'>
          <Heading mb='4' color='#114240' font-size='24px' font-family='Inter' font-weight='600'>
            Recipes For You
          </Heading>

          <SimpleGrid columns={2} templateColumns="repeat(2, 150px)" columnGap="24px" rowGap="20px" align='center'>
            {recipes.map((recipe) => (
              <FoodCard key={recipe.id} recipe={recipe}/>
            ))}
          </SimpleGrid>
        </Box>
      </Stack>
    </Box>
  )
}
