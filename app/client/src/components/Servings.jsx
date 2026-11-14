import { useState } from "react";
import { Box, Button, HStack, Text } from "@chakra-ui/react";

// Figma: "Servings" (node 397:4635) — pick one of 1 / 2 / 4 servings
export const Servings = ({ options = [1, 2, 4], value, onChange }) => {
  // Works on its own, or let the parent control it by passing value + onChange
  const [localValue, setLocalValue] = useState(options[0]);
  const selected = value ?? localValue;

  const select = (n) => {
    if (onChange) onChange(n);
    else setLocalValue(n);
  };

  return (
    <HStack
      role="radiogroup"
      aria-label="Servings"
      w="340px"
      maxW="full"
      gap="8px"
      fontFamily="'Inter', sans-serif"
    >
      {options.map((n) => {
        const isSelected = n === selected;
        return (
          <Button
            key={n}
            role="radio"
            aria-checked={isSelected}
            onClick={() => select(n)}
            flex="1"
            minW="24px"
            h="24px"
            px="12px"
            py="2px"
            gap="4px"
            borderRadius="8px"
            bg={isSelected ? "teal.emphasized" : "teal.100"}
            color={isSelected ? "gray.fg" : "black"}
            _hover={{ bg: isSelected ? "teal.emphasized" : "teal.200" }}
          >
            <Text flex="1" fontSize="xs" fontWeight="medium" lineHeight="16px" textAlign="center">
              {n} {n === 1 ? "Serving" : "Servings"}
            </Text>
            {/* Radio mark */}
            <Box
              flexShrink="0"
              boxSize="12px"
              borderRadius="full"
              bg={isSelected ? "white" : "transparent"}
              borderStyle="solid"
              borderWidth={isSelected ? "4px" : "1px"}
              borderColor={isSelected ? "teal.fg" : "rgba(54, 76, 132, 0.6)"}
            />
          </Button>
        );
      })}
    </HStack>
  );
};
