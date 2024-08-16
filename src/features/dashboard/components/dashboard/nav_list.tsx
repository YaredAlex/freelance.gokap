import { Home, Money, People, User, UserSquare } from "iconsax-react";

export const adminNavList = [
  {
    title: "Dashboard",
    child: [
      {
        title: "Projects",
        to: ``,
        icon: (color: string) => <Home color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "AllUsers",
    child: [
      {
        title: "Users",
        to: `clients/`,
        icon: (color: string) => <User color={color} variant="Bold" />,
      },
      {
        title: "Freelancers",
        to: `freelancers/`,
        icon: (color: string) => <People color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Account",
    child: [
      {
        title: "Account",
        to: `account`,
        icon: (color: string) => <UserSquare color={color} variant="Bold" />,
      },
      {
        title: "Invoice",
        to: `invoice`,
        icon: (color: string) => <Money color={color} variant="Bold" />,
      },
    ],
  },
];
