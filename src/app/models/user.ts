import { Link } from './link';

export interface User {

  userId: number;
  username: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  links: Array<Link>
}
