import {
  Loader2,
  LucideIcon,
  Moon,
  Sun,
  Twitter,
  Wallet,
  Mail,
  Lock,
  User,
  LogIn,
  UserPlus,
  Github,
  Menu,
  X,
  BarChart,
  Target,
  Tags,
  Cloud,
  Headset,
  Users,
  Star,
} from "lucide-react";

export type Icon = LucideIcon;

export const Icons = {
  sun: Sun,
  moon: Moon,
  twitter: Twitter,
  spinner: Loader2,
  wallet: Wallet,
  mail: Mail,
  lock: Lock,
  user: User,
  login: LogIn,
  register: UserPlus,
  github: Github,
  menu: Menu,
  x: X,
  barChart: BarChart,
  target: Target,
  tags: Tags,
  cloud: Cloud,
  headset: Headset,
  users: Users,
  star: Star,
  google: ({ ...props }) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  linkedin: ({ ...props }) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="linkedin"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
      ></path>
    </svg>
  ),
};
