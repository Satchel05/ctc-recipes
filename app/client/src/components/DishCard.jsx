import {
  Box,
  Flex,
  Heading,
  Image,
  Link as ChakraLink,
  Text,
} from '@chakra-ui/react'
import { Link as RouterLink } from 'react-router-dom'

export default function DishCard({ recipe }) {
  return (
    <ChakraLink
      asChild
      display="flex"
      flexDirection="column"
      alignItems="stretch"
      gap={0}
      flex="0 0 176px"
      minWidth={0}
      padding="6px"
      border="1px solid #e7e3dc"
      borderRadius={0}
      background="white"
      color="inherit"
      fontWeight="normal"
      textDecoration="none"
      boxShadow="0 2px 4px #00000018"
      scrollSnapAlign="start"
      _hover={{
        textDecoration: 'none',
        borderColor: '#ffbd73',
      }}
      _focusVisible={{
        outline: '2px solid #b84c00',
        outlineOffset: '2px',
      }}
    >
      <RouterLink
        to={`/recipes/${recipe.id}`}
        aria-label={`View ${recipe.title}`}
      >
        <Image
          src={recipe.image_url}
          alt={recipe.title}
          display="block"
          width="100%"
          aspectRatio={1}
          objectFit="cover"
        />

        <Flex direction="column" flex={1} textAlign="center">
          <Heading
            as="h3"
            margin="8px 0 4px"
            fontFamily="inherit"
            fontSize="17px"
            fontWeight="normal"
            lineHeight="1.2"
            letterSpacing="normal"
          >
            {recipe.title}
          </Heading>

          <Text
            margin="0 0 8px"
            fontSize="11px"
            lineHeight="1.3"
          >
            {recipe.description}
          </Text>

          <Flex
            justify="center"
            gap="4px"
            marginTop="auto"
            fontSize="10px"
            lineHeight="1.4"
          >
            <Box
              as="span"
              padding="3px 7px"
              background="#cce6df"
              whiteSpace="nowrap"
            >
              {recipe.difficulty}
            </Box>

            <Box
              as="span"
              padding="3px 7px"
              background="#ffe4e6"
              whiteSpace="nowrap"
              aria-label={`Rated ${recipe.rating} out of 5`}
            >
              ★ {recipe.rating}
            </Box>

            <Box
              as="span"
              padding="3px 7px"
              background="#dfd0ef"
              whiteSpace="nowrap"
            >
              {recipe.prep_minutes + recipe.cook_minutes} min
            </Box>
          </Flex>
        </Flex>
      </RouterLink>
    </ChakraLink>
  )
}