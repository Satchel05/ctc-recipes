import { Button, Flex } from '@chakra-ui/react'

export default function CuisineCarousel({
  cuisines,
  selectedCuisine,
  onSelect,
}) {
  return (
    <Flex
      role="group"
      aria-label="Choose a cuisine"
      gap="8px"
      overflowX="auto"
      py="12px"
    >
      {cuisines.map((cuisine) => {
        const isSelected = selectedCuisine === cuisine

        return (
          <Button
            key={cuisine}
            type="button"
            variant="plain"
            flexShrink={0}
            height="auto"
            minWidth="auto"
            px="13px"
            py="4px"
            border="none"
            borderRadius="20px"
            background={isSelected ? '#ffbd73' : '#fffbc2'}
            color="#292929"
            fontFamily="inherit"
            fontSize="11px"
            fontWeight="normal"
            lineHeight="1.4"
            aria-pressed={isSelected}
            onClick={() => onSelect(cuisine)}
            _hover={{
              background: isSelected ? '#ffad52' : '#fff49b',
            }}
            _focusVisible={{
              outline: '2px solid #b84c00',
              outlineOffset: '2px',
            }}
          >
            {cuisine}
          </Button>
        )
      })}
    </Flex>
  )
}