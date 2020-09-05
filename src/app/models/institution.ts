import { Link } from './link';

export interface Institution {

  institutionId: number;
  institutionName: string;
  province: string;
  city: string;
  street: string;
  gateNumber: string;
  premisesNumber: string;
  typeOfService: string;
  description: string;
  links?: Array<Link>;
}
