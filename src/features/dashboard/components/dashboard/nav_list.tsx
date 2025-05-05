import { Home, Money, People, User, UserSquare } from "iconsax-react";
const variant = "Linear";
const size = 18;
export const adminNavList = [
  {
    title: "Dashboard",
    child: [
      {
        title: "Projects",
        to: ``,
        icon: (color: string) => (
          <Home color={color} size={size} variant={variant} />
        ),
      },
    ],
  },
  {
    title: "All Users",
    child: [
      {
        title: "Users",
        to: `clients`,
        icon: (color: string) => (
          <User color={color} size={size} variant={variant} />
        ),
      },
      {
        title: "Freelancers",
        to: `freelancers`,
        icon: (color: string) => (
          <People color={color} size={size} variant={variant} />
        ),
      },
    ],
  },
  {
    title: "Account",
    child: [
      {
        title: "Account",
        to: `account`,
        icon: (color: string) => (
          <UserSquare color={color} size={size} variant={variant} />
        ),
      },
      {
        title: "Invoice",
        to: `invoice`,
        icon: (color: string) => (
          <Money color={color} size={size} variant={variant} />
        ),
      },
    ],
  },
];
