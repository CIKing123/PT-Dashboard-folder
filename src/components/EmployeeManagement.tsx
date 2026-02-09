import React, { useState } from 'react';
import './EmployeeManagement.css';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  department: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

interface EmployeeManagementProps {
  onBack: () => void;
}

const EmployeeManagement: React.FC<EmployeeManagementProps> = ({
  onBack,
}): React.ReactElement => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [employees, setEmployees] = useState<Employee[]>([
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      position: 'Physical Therapist',
      department: 'Therapy',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      position: 'Therapist Assistant',
      department: 'Therapy',
      status: 'Active',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      position: 'Administrative Staff',
      department: 'Admin',
      status: 'On Leave',
    },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    position: '',
    department: '',
    status: 'Active' as const,
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    const newEmployee: Employee = {
      id: employees.length + 1,
      ...formData,
      status: formData.status as 'Active' | 'On Leave' | 'Inactive',
    };
    setEmployees([...employees, newEmployee]);
    setFormData({
      name: '',
      email: '',
      position: '',
      department: '',
      status: 'Active',
    });
    setView('list');
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  return (
    <div className="employee-management">
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
            <div className="col-name">Name</div>
            <div className="col-email">Email</div>
            <div className="col-position">Position</div>
            <div className="col-status">Status</div>
            <div className="col-action">Action</div>
          </div>
          {employees.map((employee) => (
            <div key={employee.id} className="list-item">
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
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Enter full name"
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
                placeholder="Enter email address"
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
                <option value="">Select a department</option>
                <option value="Therapy">Therapy</option>
                <option value="Admin">Admin</option>
                <option value="Billing">Billing</option>
                <option value="Support">Support</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="status">Employment Status *</label>
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

export default EmployeeManagement;
