export interface Project {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
  link: string;
  technologies: string[];
  hidden?: boolean;
  disabled?: boolean;
}
