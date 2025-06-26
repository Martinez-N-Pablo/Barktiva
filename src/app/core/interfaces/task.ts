export interface TaskInterface {
  _id: string;
  user: any;
  pets: string[];
  taskType: string;
  name: string;
  photo?: string;
  dosesTime?: string;
  dosesPerDay?: number;
  dosesPerWeek?: number;
  dosesPerMonth?: number;
  notification?: boolean;
  quantity?: number;
  routeAdministration?: string;
  initialDate: Date;
  finalDate: Date;
  description?: string;
}