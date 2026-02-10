export interface EmployeeData {
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  passportPhoto?: string;
}

export interface Employee extends EmployeeData {
  id: number;
}
