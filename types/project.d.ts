import { ReactNode } from "react";

export interface Project {
  title: string;
  description: string;
  tech: string[];
  github: string;
  demo: string;
  icon: ReactNode;
  featured?: boolean;
  image: string;
}
