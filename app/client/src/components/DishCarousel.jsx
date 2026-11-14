import { Flex, Text } from '@chakra-ui/react'
import DishCard from './DishCard.jsx'

export default function DishCarousel({ recipes }) {
  if (recipes.length === 0) {
    return (
      <Text px="16px" fontSize="14px" color="#666">
        No recipes for this cuisine yet.
      </Text>
    )
  }

  return (
    <Flex
      role="region"
      aria-label="Recipe cards"
      tabIndex={0}
      gap="14px"
      overflowX="auto"
      padding="4px 12px 12px"
      scrollSnapType="x proximity"
      _focusVisible={{
        outline: '2px solid #b84c00',
        outlineOffset: '-2px',
      }}
    >
      {recipes.map((recipe) => (
        <DishCard key={recipe.id} recipe={recipe} />
      ))}
    </Flex>
  )
}