export interface TaskInterface {
  _id: string;
  user: any;
  pets: any[];
  taskType: any;
  name: string;
  photo?: string;
  dosesTime?: string;
  dosesPerDay?: number;
  dosesPerWeek?: number;
  dosesPerMonth?: number;
  notification?: boolean;
  quantity?: number;
  routeAdministration?: string;
  hourDosis: string;
  initialDate: Date;
  finalDate: Date;
  description?: string;
}