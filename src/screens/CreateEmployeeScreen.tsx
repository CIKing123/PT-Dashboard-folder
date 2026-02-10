import React, { useState } from 'react';
import { saveEmployeeData, EmployeeData } from '../services/excelService';
import '../styles/CreateEmployeeScreen.css';

interface CreateEmployeeScreenProps {
  onBack: () => void;
  onSave?: (data: EmployeeData) => void;
}

const CreateEmployeeScreen: React.FC<CreateEmployeeScreenProps> = ({
  onBack,
  onSave,
}): React.ReactElement => {
  const [formData, setFormData] = useState<EmployeeData>({
    name: '',
    email: '',
    position: '',
    department: '',
    status: 'Active',
    passportPhoto: '',
  });

  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Save to Excel/Online Sheet
      const saved = await saveEmployeeData(formData);

      if (saved) {
        console.log('Employee saved to Excel:', formData);
      }

      // Call callback if provided
      if (onSave) {
        onSave(formData);
      }

      // Show success message
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          position: '',
          department: '',
          status: 'Active',
          passportPhoto: '',
        });
        onBack();
      }, 2000);
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <div className="create-employee-screen">
      <div className="screen-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
        <h1>Create New Employee</h1>
      </div>

      {submitted && (
        <div className="success-message">
          ✓ Employee details saved successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="employee-form">
        {/* Employee Information Section */}
        <div className="form-section">
          <h2>Employee Information</h2>

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
            <label htmlFor="email">Email Address *</label>
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
              value={formData.passportPhoto || ''}
              onChange={handleInputChange}
              placeholder="https://example.com/photo.jpg"
            />
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create Employee & Save to Sheet
          </button>
          <button type="button" className="cancel-btn" onClick={onBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEmployeeScreen;
