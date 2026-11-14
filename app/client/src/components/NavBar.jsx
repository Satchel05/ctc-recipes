import { Box, Flex, Text } from "@chakra-ui/react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { HeartIcon, HouseIcon, UserIcon } from "./icons.jsx";

// Figma: "Navigation Bar: Vertical items" (node 397:4677) — Material 3 bottom nav, 3 items
const NAV_ITEMS = [
  { label: "Browse", to: "/", icon: HouseIcon },
  { label: "Favorites", to: "/favorites", icon: HeartIcon },
  { label: "Profile", to: "/profile", icon: UserIcon },
];

export const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <Flex
      as="nav"
      aria-label="Main"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="sticky"
      align="center"
      justify="center"
      bg="rgba(237, 237, 237, 0.55)"
      borderTopRadius="12px"
      overflow="hidden"
      fontFamily="'Inter', sans-serif"
    >
      {NAV_ITEMS.map(({ label, to, icon: NavIcon }) => {
        const isActive = pathname === to;
        return (
          <Flex
            key={to}
            asChild
            flex="1"
            direction="column"
            align="center"
            gap="4px"
            py="6px"
            textDecoration="none"
          >
            <RouterLink to={to} aria-current={isActive ? "page" : undefined}>
              {/* Icon container — the gray pill only shows on the active item */}
              <Flex
                align="center"
                justify="center"
                w="56px"
                h="32px"
                borderRadius="16px"
                bg={isActive ? "gray.300" : "transparent"}
                color="black"
                transition="background 0.2s"
              >
                <NavIcon boxSize="24px" />
              </Flex>
              <Text
                fontSize="12px"
                fontWeight="medium"
                lineHeight="16px"
                letterSpacing="0.5px"
                textAlign="center"
                color={isActive ? "#625B71" : "#49454F"}
              >
                {label}
              </Text>
            </RouterLink>
          </Flex>
        );
      })}
    </Flex>
  );
};

// Height of the bar (6 + 32 + 4 + 16 + 6) — use as bottom padding so page content isn't hidden behind it
export const NAV_BAR_HEIGHT = "64px";
