import { HStack, Progress, Box, Heading, Stack, Text } from '@chakra-ui/react'


export default function CookRecipe() {
  return (
    <Stack
      w='393px'
      h='852px'
      mx='auto'
      pt='38px'
      px='16px'
      gap='20px'
      bg='white'
      fontFamily='Inter, sans-serif'
    >
      <Heading
        color='#114240'
        fontSize='24px'
        fontWeight='600'
        lineHeight='132%'
        letterSpacing='-0.48px'
      >
        Grilled Cheese Sandwich
      </Heading>


        <HStack gap='12px'>
        <Text fontSize='12px' whiteSpace='nowrap'>
          Step 1 of 3
        </Text>
        <Progress.Root value={33} flex='1'>
          <Progress.Track bg='#E2E2E2' h='8px'>
            <Progress.Range bg='#4A6B6B' />
          </Progress.Track>
        </Progress.Root>
      </HStack>
      <Box>
        <Heading 
        color='#114240' 
        fontSize='32px' 
        fontWeight='600'
        lineHeight='132%'
        letterSpacing='-0.64px'
        >
          Step 1
        </Heading>
        <Text 
        color = '#000'
        fontSize = '16px'
        fontWeight ='400'
        lineHeight = '132%' 
        letterSpacing = '-0.32px'
        >Ingredients needed in this step:</Text>
        <Text color = '#000'
        fontSize = '16px'
        fontWeight ='700'
        lineHeight = '132%' 
        letterSpacing = '-0.32px'>
          sourdough bread, butter
        </Text>

        <Text
        color='#000'
        fontSize='24px'
        fontWeight='400'
        lineHeight='132%'
        letterSpacing='-0.48px'
        >
        Take two slices of the sourdough bread and spread butter generously on both sides.
        </Text>
      </Box>


    </Stack>
  )
}
