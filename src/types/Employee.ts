export interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobRole: string;
  department: string;
  startDate: string;
  salary: string;
  employmentType: string;
  status: 'Active' | 'On Leave' | 'Inactive';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  qualifications: string;
  passportPhoto?: string;
}

export interface Employee extends EmployeeData {
  id: number;
}
