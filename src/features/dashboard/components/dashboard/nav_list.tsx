import { Box, FolderAdd, Home, Money, User } from "iconsax-react";
import { MdSupportAgent } from "react-icons/md";

export const clientNavList = [
  {
    title: "Dashboard",
    child: [
      {
        title: "Dashboard",
        to: ``,
        icon: (color: string) => <Home color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Projects",
    child: [
      {
        title: "All Projects",
        to: `projects`,
        icon: (color: string) => <Box color={color} variant="Bold" />,
      },
      {
        title: "Create Project",
        to: `projects/create`,
        icon: (color: string) => <FolderAdd color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Account",
    child: [
      {
        title: "Account",
        to: `account`,
        icon: (color: string) => <User color={color} variant="Bold" />,
      },
      {
        title: "Invoice",
        to: `invoice`,
        icon: (color: string) => <Money color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Help Line",
    child: [
      {
        title: "support",
        to: `support`,
        icon: (color: string) => <MdSupportAgent color={color} size={22} />,
      },
    ],
  },
];
export const agentNavList = [
  {
    title: "Dashboard",
    child: [
      {
        title: "Job",
        to: ``,
        icon: (color: string) => <Home color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Projects",
    child: [
      {
        title: "My stats",
        to: `stats/`,
        icon: (color: string) => <Box color={color} variant="Bold" />,
      },
      {
        title: "Projects",
        to: `projects/`,
        icon: (color: string) => <FolderAdd color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Account",
    child: [
      {
        title: "Account",
        to: `account`,
        icon: (color: string) => <User color={color} variant="Bold" />,
      },
      {
        title: "Invoice",
        to: `invoice`,
        icon: (color: string) => <Money color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Help Line",
    child: [
      {
        title: "support",
        to: `support`,
        icon: (color: string) => <MdSupportAgent color={color} size={22} />,
      },
    ],
  },
];
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
    title: "Projects",
    child: [
      {
        title: "Assign Project",
        to: ``,
        icon: (color: string) => <Box color={color} variant="Bold" />,
      },
      {
        title: "Projects",
        to: `projects/`,
        icon: (color: string) => <FolderAdd color={color} variant="Bold" />,
      },
    ],
  },
  {
    title: "Account",
    child: [
      {
        title: "Account",
        to: `account`,
        icon: (color: string) => <User color={color} variant="Bold" />,
      },
      {
        title: "Invoice",
        to: `invoice`,
        icon: (color: string) => <Money color={color} variant="Bold" />,
      },
    ],
  },
];
