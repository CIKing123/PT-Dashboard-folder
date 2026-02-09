import React, { useState, useEffect } from 'react';
import '../styles/EmployeeDetailsScreen.css';
import type { Employee } from '../types/Employee';
import { saveEmployeeData, fetchEmployees } from '../services/excelService';

interface EmployeeDetailsScreenProps {
  onBack: () => void;
  onNavigate?: (page: string, employee: Employee) => void;
}

const EmployeeDetailsScreen: React.FC<EmployeeDetailsScreenProps> = ({
  onBack,
  onNavigate,
}): React.ReactElement => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      phone: '(555) 123-4567',
      jobRole: 'Physical Therapist',
      department: 'Therapy',
      startDate: '2022-01-15',
      salary: '65000',
      employmentType: 'Full-time',
      status: 'Active',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      emergencyContact: 'Jane Doe',
      emergencyPhone: '(555) 987-6543',
      qualifications: 'PT License, BS Physical Therapy',
      passportPhoto: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane@example.com',
      phone: '(555) 234-5678',
      jobRole: 'Therapist Assistant',
      department: 'Therapy',
      startDate: '2021-06-20',
      salary: '45000',
      employmentType: 'Full-time',
      status: 'Active',
      address: '456 Oak Ave',
      city: 'New York',
      state: 'NY',
      zipCode: '10002',
      emergencyContact: 'John Smith',
      emergencyPhone: '(555) 345-6789',
      qualifications: 'PTA License, AA Physical Therapy',
      passportPhoto: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      id: 3,
      firstName: 'Mike',
      lastName: 'Johnson',
      email: 'mike@example.com',
      phone: '(555) 345-6789',
      jobRole: 'Administrative Staff',
      department: 'Admin',
      startDate: '2020-03-10',
      salary: '38000',
      employmentType: 'Full-time',
      status: 'On Leave',
      address: '789 Pine Rd',
      city: 'New York',
      state: 'NY',
      zipCode: '10003',
      emergencyContact: 'Sarah Johnson',
      emergencyPhone: '(555) 456-7890',
      qualifications: 'Administrative Certificate',
      passportPhoto: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
  ]);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobRole: '',
    department: 'Admin',
    startDate: '',
    salary: '',
    employmentType: 'Full-time',
    status: 'Active' as const,
    address: '',
    city: '',
    state: '',
    zipCode: '',
    emergencyContact: '',
    emergencyPhone: '',
    qualifications: '',
    passportPhoto: '',
  });

  // Load employees from Google Sheets on mount
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const sheetEmployees = await fetchEmployees();
        if (sheetEmployees && sheetEmployees.length > 0) {
          setEmployees(sheetEmployees as Employee[]);
        }
      } catch (error) {
        console.error('Failed to fetch employees from Google Sheets:', error);
      }
    };
    loadEmployees();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value === '' ? (name === 'salary' ? 0 : value) : value,
    }));
  };

  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: employees.length + 1,
      ...formData,
      status: formData.status as 'Active' | 'On Leave' | 'Inactive',
    };
    
    // Save to Google Sheets
    const saved = await saveEmployeeData(formData);
    if (saved) {
      console.log('Employee saved to Google Sheets');
    } else {
      console.warn('Failed to save employee to Google Sheets, saved locally only');
    }
    
    setEmployees([...employees, newEmployee]);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      jobRole: '',
      department: 'Admin',
      startDate: '',
      salary: '',
      employmentType: 'Full-time',
      status: 'Active',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      emergencyContact: '',
      emergencyPhone: '',
      qualifications: '',
      passportPhoto: '',
    });
    setView('list');
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="employee-details-screen">
      <div className="employee-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>Employee Management</h1>
      </div>

      <div className="view-tabs">
        <button
          className={`tab-btn ${view === 'list' ? 'active' : ''}`}
          onClick={() => setView('list')}
        >
          Employee List ({employees.length})
        </button>
        <button
          className={`tab-btn ${view === 'create' ? 'active' : ''}`}
          onClick={() => setView('create')}
        >
          Create Employee
        </button>
      </div>

      {view === 'list' ? (
        <div className="employee-list">
          <div className="list-header">
            <div className="col-photo">Photo</div>
            <div className="col-name">Name</div>
            <div className="col-email">Email</div>
            <div className="col-position">Position</div>
            <div className="col-status">Status</div>
            <div className="col-action">Action</div>
          </div>
          {employees.map((employee) => (
            <div key={employee.id} className="list-item">
              <div className="col-photo">
                {employee.passportPhoto ? (
                  <img src={employee.passportPhoto} alt={`${employee.firstName} ${employee.lastName}`} className="employee-photo" />
                ) : (
                  <div className="photo-placeholder">No Photo</div>
                )}
              </div>
              <div className="col-name">{employee.firstName} {employee.lastName}</div>
              <div className="col-email">{employee.email}</div>
              <div className="col-position">{employee.jobRole}</div>
              <div className="col-status">
                <span className={`status-badge status-${employee.status.toLowerCase().replace(' ', '-')}`}>
                  {employee.status}
                </span>
              </div>
              <div className="col-action">
                <button
                  className="edit-btn"
                  onClick={() => onNavigate?.('edit-employee', employee)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteEmployee(employee.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="create-employee-form">
          <h2>Add New Employee</h2>
          <form onSubmit={handleCreateEmployee}>
            <fieldset>
              <legend>Personal Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    placeholder="John"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Job Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="jobRole">Job Role *</label>
                  <input
                    type="text"
                    id="jobRole"
                    name="jobRole"
                    value={formData.jobRole}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Physical Therapist"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="department">Department *</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="Admin">Admin</option>
                    <option value="Therapy">Therapy</option>
                    <option value="Billing">Billing</option>
                    <option value="Support">Support</option>
                  </select>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="startDate">Start Date *</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="salary">Salary *</label>
                  <input
                    type="text"
                    id="salary"
                    name="salary"
                    value={formData.salary}
                    onChange={handleInputChange}
                    required
                    placeholder="50000"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employmentType">Employment Type *</label>
                  <select
                    id="employmentType"
                    name="employmentType"
                    value={formData.employmentType}
                    onChange={handleInputChange}
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="status">Status *</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Address Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="address">Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                    placeholder="123 Main St"
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    placeholder="New York"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <input
                    type="text"
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    required
                    placeholder="NY"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="zipCode">Zip Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    required
                    placeholder="10001"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Emergency Contact</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="emergencyContact">Contact Name *</label>
                  <input
                    type="text"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    required
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="emergencyPhone">Phone *</label>
                  <input
                    type="tel"
                    id="emergencyPhone"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    required
                    placeholder="(555) 987-6543"
                  />
                </div>
              </div>
            </fieldset>

            <fieldset>
              <legend>Additional Information</legend>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="qualifications">Qualifications</label>
                  <textarea
                    id="qualifications"
                    name="qualifications"
                    value={formData.qualifications}
                    onChange={handleInputChange}
                    placeholder="PT License, BS Physical Therapy"
                    rows={3}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="passportPhoto">Passport Photo URL</label>
                  <input
                    type="text"
                    id="passportPhoto"
                    name="passportPhoto"
                    value={formData.passportPhoto}
                    onChange={handleInputChange}
                    placeholder="https://example.com/photo.jpg"
                  />
                </div>
              </div>
            </fieldset>

            <div className="form-actions">
              <button type="submit" className="submit-btn">
                Create Employee
              </button>
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setView('list')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default EmployeeDetailsScreen;
