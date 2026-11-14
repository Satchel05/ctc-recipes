import { useEffect, useState } from 'react'
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Box, Flex, Heading, IconButton, Image, Input, InputGroup, Stack, Text } from '@chakra-ui/react'
import { backend } from '../lib/backend.js'
import timeIcon from '../assets/home/time-icon.svg'
import buttonAddIcon from '../assets/home/button-add.svg'
import searchIcon from '../assets/home/search.svg'
import settingsIcon from '../assets/home/settings-2.svg'
import navCommunityIcon from '../assets/home/nav-community.svg'
import navHomeIcon from '../assets/home/nav-home.svg'
import navProfileIcon from '../assets/home/nav-profile.svg'
import difficultyIcon from '../assets/recipe-details/difficulty-icon.svg'
import moveLeftIcon from '../assets/recipe-details/move-left.svg'

// Design: Figma "[EDU 2] Workspace" → Homepage (node 280:7908)

const BORDER = 'rgba(0, 0, 0, 0.25)'
const GRAY_FG = '#27272a'
const GRAY_400 = '#a1a1aa'
const TEAL_FG = '#0c5d56'

function capitalize(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function RecipeMeta({ recipe }) {
  return (
    <Flex align='center' gap='8px' fontSize='11px' lineHeight='24px'>
      <Flex align='center' gap='8px' minW='70px'>
        <img src={timeIcon} alt='' width='16' height='16' />
        <Text as='span'>{recipe.prep_minutes + recipe.cook_minutes} min</Text>
      </Flex>
      <Flex align='center' gap='5px'>
        <Flex boxSize='16px' align='center' justify='center'>
          <img src={difficultyIcon} alt='' width='12' height='13.3334' />
        </Flex>
        <Text as='span'>{capitalize(recipe.difficulty)}</Text>
      </Flex>
    </Flex>
  )
}

function AddButton({ title }) {
  return (
    <IconButton
      aria-label={`Add ${title}`}
      variant='ghost'
      minW='24px'
      h='24px'
      p='0'
      flexShrink='0'
      onClick={(e) => e.preventDefault()}
    >
      <img src={buttonAddIcon} alt='' width='24' height='24' />
    </IconButton>
  )
}

function FeaturedCard({ recipe }) {
  return (
    <Box
      as={RouterLink}
      to={`/recipes/${recipe.id}`}
      display='block'
      bg='white'
      borderWidth='1px'
      borderColor={GRAY_FG}
      borderRadius='20px'
      px='17px'
      pt='17px'
      pb='12px'
    >
      <Image
        src={recipe.image_url}
        alt={recipe.title}
        h='183px'
        w='full'
        objectFit='cover'
        borderRadius='11px'
        borderWidth='1px'
        borderColor={GRAY_FG}
      />
      <Flex mt='12px' align='flex-end' justify='space-between' gap='12px'>
        <Box minW='0'>
          <Heading as='h2' fontSize='20px' fontWeight='bold' lineHeight='24px' px='2px'>
            {recipe.title}
          </Heading>
          <Box px='2px'>
            <RecipeMeta recipe={recipe} />
          </Box>
        </Box>
        <AddButton title={recipe.title} />
      </Flex>
    </Box>
  )
}

function RecipeRow({ recipe }) {
  return (
    <Flex
      as={RouterLink}
      to={`/recipes/${recipe.id}`}
      align='center'
      gap='16px'
      h='83px'
      pl='9px'
      pr='16px'
      borderWidth='1px'
      borderColor={GRAY_FG}
      borderRadius='20px'
    >
      <Image
        src={recipe.image_url}
        alt={recipe.title}
        w='86px'
        h='66px'
        flexShrink='0'
        objectFit='cover'
        borderRadius='16px'
        borderWidth='0.5px'
        borderColor={GRAY_FG}
      />
      <Box flex='1' minW='0'>
        <Text fontSize='16px' fontWeight='medium' lineHeight='24px' truncate>
          {recipe.title}
        </Text>
        <RecipeMeta recipe={recipe} />
      </Box>
      <AddButton title={recipe.title} />
    </Flex>
  )
}

function NavItem({ icon, iconWidth, iconHeight, label, active }) {
  return (
    <Flex
      as='button'
      type='button'
      direction='column'
      align='center'
      justify='flex-end'
      gap='4px'
      w='80px'
      h='48px'
      aria-current={active ? 'page' : undefined}
    >
      <img src={icon} alt='' width={iconWidth} height={iconHeight} />
      <Text fontSize='11px' lineHeight='normal' color={active ? TEAL_FG : GRAY_400} opacity={active ? 1 : 0.7}>
        {label}
      </Text>
    </Flex>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const cuisine = searchParams.get('cuisine')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [query, setQuery] = useState('')

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

  const search = query.trim().toLowerCase()
  const visible = recipes.filter(
    (recipe) =>
      (!cuisine || recipe.cuisine.name.toLowerCase() === cuisine.toLowerCase()) &&
      (!search || recipe.title.toLowerCase().includes(search)),
  )
  const [featured, ...popular] = visible

  return (
    <Box bg='#fefefe' minH='100dvh' maxW='402px' mx='auto' color='black'>
      {/* Header */}
      <Flex
        as='header'
        position='sticky'
        top='0'
        zIndex='1'
        bg='white'
        borderBottomWidth='1px'
        borderColor={BORDER}
        h='56px'
        align='center'
        justify='center'
      >
        {cuisine && (
          <IconButton
            aria-label='Go back'
            variant='ghost'
            size='sm'
            position='absolute'
            left='8px'
            onClick={() => navigate(-1)}
          >
            <img src={moveLeftIcon} alt='' width='28' height='28' />
          </IconButton>
        )}
        <Heading as='h1' fontSize='18px' fontWeight='bold' lineHeight='24px'>
          {cuisine ? `${capitalize(cuisine)} Cuisine` : 'All Recipes'}
        </Heading>
      </Flex>

      {/* Body — bottom padding keeps content clear of the fixed nav bar */}
      <Box px='18px' pt='18px' pb='110px'>
        <InputGroup
          startElement={<img src={searchIcon} alt='' width='16' height='16' style={{ opacity: 0.7 }} />}
          startElementProps={{ ps: '8px' }}
          endElement={
            <IconButton aria-label='Filter recipes' variant='ghost' minW='20px' h='20px' p='0'>
              <img src={settingsIcon} alt='' width='20' height='20' />
            </IconButton>
          }
          endElementProps={{ pe: '6px' }}
        >
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder='search'
            aria-label='Search recipes'
            h='28px'
            ps='32px'
            fontSize='12px'
            borderColor='#e4e4e7'
            borderRadius='4px'
            _placeholder={{ color: GRAY_400 }}
          />
        </InputGroup>

        <Box mt='15px'>
          {loading && <Text>Loading...</Text>}
          {error && <Text>Error: {error}</Text>}
          {!loading && !error && visible.length === 0 && <Text fontSize='14px'>No recipes found.</Text>}

          {featured && <FeaturedCard recipe={featured} />}

          {popular.length > 0 && (
            <>
              <Heading as='h2' mt='9px' mb='9px' px='2px' fontSize='18.6px' fontWeight='bold' lineHeight='24px'>
                Popular Recipes
              </Heading>
              <Stack gap='13px'>
                {popular.map((recipe) => (
                  <RecipeRow key={recipe.id} recipe={recipe} />
                ))}
              </Stack>
            </>
          )}
        </Box>
      </Box>

      {/* Bottom navigation */}
      <Flex
        as='nav'
        aria-label='Main'
        position='fixed'
        bottom='0'
        left='50%'
        transform='translateX(-50%)'
        w='full'
        maxW='402px'
        h='92px'
        bg='white'
        borderWidth='1px'
        borderBottomWidth='0'
        borderColor={GRAY_FG}
        borderTopRadius='40px'
        justify='space-evenly'
        pt='10px'
        align='flex-start'
      >
        <NavItem icon={navCommunityIcon} iconWidth='35' iconHeight='26.25' label='Community' />
        <NavItem icon={navHomeIcon} iconWidth='27.75' iconHeight='30.8371' label='Home' active />
        <NavItem icon={navProfileIcon} iconWidth='30' iconHeight='30' label='Profile' />
      </Flex>
    </Box>
  )
}
