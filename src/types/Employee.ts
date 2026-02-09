export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  passportPhoto: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}
