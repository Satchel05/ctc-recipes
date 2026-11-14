import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Box, Button, Checkbox, Flex, Heading, IconButton, Image, Stack, Text } from '@chakra-ui/react'
import { backend } from '../lib/backend.js'
import moveLeftIcon from '../assets/recipe-details/move-left.svg'
import timeIcon from '../assets/recipe-details/time-icon.svg'
import difficultyIcon from '../assets/recipe-details/difficulty-icon.svg'
import servingsIcon from '../assets/recipe-details/servings-icon.svg'
import buttonAddIcon from '../assets/recipe-details/button-add.svg'

// Design: Figma "[EDU 2] Workspace" → Recipe Page (node 599:483)

const BORDER = 'rgba(0, 0, 0, 0.25)'
const GRAY_800 = '#27272a'
const GRAY_600 = '#52525b'
const GREEN_SUBTLE = '#dcfce7'
const TEAL_FG = '#0c5d56'

function capitalize(value) {
  if (!value) return ''
  return value.charAt(0).toUpperCase() + value.slice(1)
}

function formatAmount({ quantity, unit }) {
  if (quantity == null) return unit ?? ''
  const qty = Number(quantity)
  const shown = Number.isInteger(qty) ? qty : qty.toString()
  if (!unit) return String(shown)
  // Short metric units sit flush against the number ("500g"), others get a space ("2 tbsp").
  return ['g', 'kg', 'ml', 'l'].includes(unit) ? `${shown}${unit}` : `${shown} ${unit}`
}

function DetailBox({ icon, iconWidth, iconHeight, label, value }) {
  return (
    <Flex
      direction='column'
      align='center'
      bg={GREEN_SUBTLE}
      borderRadius='10px'
      h='65px'
      flex='1'
      pt='8px'
    >
      <Flex boxSize='16px' align='center' justify='center'>
        <img src={icon} alt='' width={iconWidth} height={iconHeight} />
      </Flex>
      <Text mt='8px' fontSize='8.44px' fontWeight='medium' color={GRAY_800} opacity='0.7' lineHeight='normal'>
        {label}
      </Text>
      <Text fontSize='11.25px' fontWeight='semibold' color={GRAY_800} lineHeight='normal' whiteSpace='nowrap'>
        {value}
      </Text>
    </Flex>
  )
}

function IngredientRow({ ingredient, checked, onCheckedChange }) {
  return (
    <Checkbox.Root
      checked={checked}
      onCheckedChange={(e) => onCheckedChange(!!e.checked)}
      display='flex'
      alignItems='center'
      w='full'
      px='5px'
      py='5px'
      borderRadius='8px'
      cursor='pointer'
    >
      <Checkbox.HiddenInput />
      <Checkbox.Control
        boxSize='16px'
        borderRadius='4px'
        borderWidth='1px'
        borderColor={checked ? 'black' : GRAY_600}
        bg={checked ? 'black' : 'white'}
        color='white'
      />
      <Checkbox.Label flex='1' display='flex' justifyContent='space-between' pl='12px' fontWeight='normal'>
        <Text as='span' fontSize='12px' lineHeight='16px' color={GRAY_800}>
          {ingredient.name}
        </Text>
        <Text as='span' fontSize='12px' lineHeight='16px' color={GRAY_600}>
          {formatAmount(ingredient)}
        </Text>
      </Checkbox.Label>
    </Checkbox.Root>
  )
}

export default function RecipeDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [checked, setChecked] = useState({})

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await backend.get(`/api/recipes/${id}`)
        setRecipe(res.data)
      } catch (err) {
        setError(err.response?.data?.error ?? err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchRecipe()
  }, [id])

  const ingredients = recipe?.ingredients ?? []

  return (
    <Box bg='white' minH='100dvh' maxW='402px' mx='auto' color='black'>
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
        px='14.5px'
      >
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
        <Heading as='h1' fontSize='18px' fontWeight='bold' lineHeight='24px'>
          Recipe Details
        </Heading>
      </Flex>

      {/* Body — bottom padding keeps content clear of the fixed action bar */}
      <Box px='34px' pt='29px' pb='132px'>
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}

        {recipe && (
          <Stack gap='17px'>
            <Stack gap='16px'>
              <Image
                src={recipe.image_url}
                alt={recipe.title}
                h='275px'
                w='full'
                objectFit='cover'
                borderRadius='11px'
                borderWidth='1px'
                borderColor={GRAY_800}
              />
              <Stack gap='17px'>
                <Flex align='center' justify='space-between' gap='12px'>
                  <Heading as='h2' fontSize='20px' fontWeight='bold' lineHeight='24px'>
                    {recipe.title}
                  </Heading>
                  <IconButton aria-label='Add recipe' variant='ghost' size='xs' minW='24px' h='24px' p='0'>
                    <img src={buttonAddIcon} alt='' width='24' height='24' />
                  </IconButton>
                </Flex>
                <Text fontSize='14.5px' fontWeight='medium' lineHeight='24px'>
                  {recipe.description}
                </Text>
              </Stack>
            </Stack>

            <Flex gap='15px'>
              <DetailBox icon={timeIcon} iconWidth='16' iconHeight='16' label='Prep Time' value={`${recipe.prep_minutes} mins`} />
              <DetailBox
                icon={difficultyIcon}
                iconWidth='12'
                iconHeight='13.3334'
                label='Difficulty'
                value={capitalize(recipe.difficulty)}
              />
              <DetailBox
                icon={servingsIcon}
                iconWidth='16'
                iconHeight='16'
                label='Servings'
                value={`${recipe.servings} Portions`}
              />
            </Flex>

            <Stack gap='17px'>
              <Heading as='h2' fontSize='20px' fontWeight='bold' lineHeight='24px'>
                Ingredients
              </Heading>
              <Stack gap='5px' borderWidth='1px' borderColor='rgba(0, 0, 0, 0.125)' borderRadius='10px' p='10px'>
                {ingredients.length === 0 && (
                  <Text fontSize='12px' color={GRAY_600} px='5px' py='5px'>
                    No ingredients listed yet.
                  </Text>
                )}
                {ingredients.map((ingredient, index) => {
                  const key = ingredient.id ?? index
                  return (
                    <IngredientRow
                      key={key}
                      ingredient={ingredient}
                      checked={!!checked[key]}
                      onCheckedChange={(value) => setChecked((prev) => ({ ...prev, [key]: value }))}
                    />
                  )
                })}
              </Stack>
            </Stack>
          </Stack>
        )}
      </Box>

      {/* Bottom action */}
      <Flex
        position='fixed'
        bottom='0'
        left='50%'
        transform='translateX(-50%)'
        w='full'
        maxW='402px'
        h='108px'
        bg='white'
        borderTopWidth='1px'
        borderColor={BORDER}
        justify='center'
        pt='23px'
      >
        <Button
          w='272px'
          h='44px'
          borderRadius='12px'
          bg={TEAL_FG}
          color='white'
          fontSize='15px'
          fontWeight='semibold'
          _hover={{ bg: TEAL_FG, opacity: 0.9 }}
          disabled={!recipe}
        >
          Start Cooking
        </Button>
      </Flex>
    </Box>
  )
}
