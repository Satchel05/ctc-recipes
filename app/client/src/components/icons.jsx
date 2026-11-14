import { Icon } from "@chakra-ui/react";

// Lucide icons (the set used in the Figma file), inlined so we don't need an extra dependency.
// They draw with currentColor, so set `color` on the icon or its parent.
const svgProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export const ArrowRightIcon = (props) => (
  <Icon {...props} asChild>
    <svg {...svgProps}>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  </Icon>
);

export const HeartIcon = ({ filled = false, ...props }) => (
  <Icon {...props} asChild>
    <svg {...svgProps} fill={filled ? "currentColor" : "none"}>
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  </Icon>
);

export const HouseIcon = (props) => (
  <Icon {...props} asChild>
    <svg {...svgProps}>
      <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
      <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
  </Icon>
);

export const UserIcon = (props) => (
  <Icon {...props} asChild>
    <svg {...svgProps}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  </Icon>
);
