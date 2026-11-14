import { useState } from "react";
import { Box, Button, Flex, IconButton, Image, Text } from "@chakra-ui/react";
import { ArrowRightIcon, HeartIcon } from "./icons.jsx";

// Figma: "Food Card" (node 397:4294) — 150 × 160 (min), 8px padding, 12px radius
export const FoodCard = ({ recipe, onSelect, isFavorite, onToggleFavorite }) => {
  const { image_url, title, cuisine, prep_minutes, cook_minutes, calories_per_serving } = recipe;

  const [localFavorite, setLocalFavorite] = useState(false);
  const favorite = isFavorite ?? localFavorite;
  const toggleFavorite = () =>
    onToggleFavorite ? onToggleFavorite(recipe) : setLocalFavorite((f) => !f);

  const details = [
    `${prep_minutes + cook_minutes} min`,
    cuisine?.name,
    calories_per_serving ? `${calories_per_serving} cal` : null,
  ].filter(Boolean);

  return (
    <Flex
      position="relative"
      direction="column"
      align="flex-start"
      gap="8px"
      w="150px"
      minW="150px"
      minH="160px"
      p="8px"
      bg="white"
      borderRadius="12px"
      overflow="hidden"
      fontFamily="'Inter', sans-serif"
      textAlign="left"
    >
      <Image
        src={image_url}
        alt={title}
        w="full"
        h="80px"
        objectFit="cover"
        borderRadius="16px"
      />

      <IconButton
        aria-label={favorite ? `Remove ${title} from favorites` : `Add ${title} to favorites`}
        aria-pressed={favorite}
        onClick={toggleFavorite}
        position="absolute"
        top="12px"
        left="11px"
        boxSize="24px"
        minW="24px"
        p="5px"
        bg="white"
        color={favorite ? "red.500" : "black"}
        borderRadius="12px"
        _hover={{ bg: "gray.100" }}
      >
        <HeartIcon filled={favorite} boxSize="14px" />
      </IconButton>

      <Box w="full">
        <Text fontSize="14px" fontWeight="semibold" lineHeight="14px" color="black" lineClamp={2}>
          {title}
        </Text>
        <Text fontSize="8px" fontWeight="light" lineHeight="12px" color="gray.500">
          {details.join(" • ")}
        </Text>
      </Box>

      <Flex w="full" justify="flex-end" mt="auto">
        <Button
          onClick={() => onSelect?.(recipe)}
          h="19.2px"
          minW="19.2px"
          px="6.4px"
          py="1.6px"
          gap="3.2px"
          bg="teal.fg"
          color="white"
          fontSize="9.6px"
          fontWeight="medium"
          lineHeight="12.8px"
          borderRadius="3.2px"
          _hover={{ bg: "teal.800" }}
        >
          Select
          <ArrowRightIcon boxSize="11.2px" />
        </Button>
      </Flex>
    </Flex>
  );
};
