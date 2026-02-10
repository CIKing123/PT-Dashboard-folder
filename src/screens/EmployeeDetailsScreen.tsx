import React, { useState, useEffect } from 'react';
import '../styles/EmployeeDetailsScreen.css';
import type { Employee } from '../types/Employee';
import { saveEmployeeData, fetchEmployees, deleteEmployeeData } from '../services/excelService';

interface EmployeeDetailsScreenProps {
  onBack: () => void;
  onNavigate?: (page: string, employee: Employee) => void;
}

const EmployeeDetailsScreen: React.FC<EmployeeDetailsScreenProps> = ({
  onBack,
  onNavigate,
}): React.ReactElement => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [employees, setEmployees] = useState<Employee[]>([]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: 'Admin',
    status: 'Active' as const,
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
    
    // Save to Sheety
    const saved = await saveEmployeeData(formData);
    if (saved) {
      console.log('Employee saved to Sheety');
    } else {
      console.warn('Failed to save employee to Sheety, saved locally only');
    }
    
    setEmployees([...employees, newEmployee]);
    setFormData({
      name: '',
      email: '',
      position: '',
      department: 'Admin',
      status: 'Active',
      passportPhoto: '',
    });
    setView('list');
  };

  const handleDeleteEmployee = async (id: number) => {
    const success = await deleteEmployeeData(id);
    if (success) {
      setEmployees(employees.filter((emp) => emp.id !== id));
      console.log('Employee deleted from Sheety');
    } else {
      alert('Failed to delete employee');
    }
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
                  <img src={employee.passportPhoto} alt={employee.name} className="employee-photo" />
                ) : (
                  <div className="photo-placeholder">No Photo</div>
                )}
              </div>
              <div className="col-name">{employee.name}</div>
              <div className="col-email">{employee.email}</div>
              <div className="col-position">{employee.position}</div>
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
              <legend>Employee Information</legend>
              <div className="form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="John Doe"
                />
              </div>

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
                <label htmlFor="position">Position *</label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
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
                  <option value="">Select Department</option>
                  <option value="Therapy">Therapy</option>
                  <option value="Admin">Admin</option>
                  <option value="Billing">Billing</option>
                  <option value="Support">Support</option>
                  <option value="Management">Management</option>
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
