import React, { useState } from 'react';
import { saveEmployeeData } from '../services/excelService';
import '../styles/CreateEmployeeScreen.css';

interface EmployeeData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  jobRole: string;
  department: string;
  startDate: string;
  salary: string;
  employmentType: string;
  status: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  qualifications: string;
}

interface CreateEmployeeScreenProps {
  onBack: () => void;
  onSave?: (data: EmployeeData) => void;
}

const CreateEmployeeScreen: React.FC<CreateEmployeeScreenProps> = ({
  onBack,
  onSave,
}): React.ReactElement => {
  const [formData, setFormData] = useState<EmployeeData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    jobRole: '',
    department: '',
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
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          jobRole: '',
          department: '',
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
        {/* Personal Information Section */}
        <div className="form-section">
          <h2>Personal Information</h2>

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
              <label htmlFor="phone">Phone Number *</label>
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
        </div>

        {/* Job Information Section */}
        <div className="form-section">
          <h2>Job Information</h2>

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
                <option value="">Select Department</option>
                <option value="Therapy">Therapy</option>
                <option value="Admin">Admin</option>
                <option value="Billing">Billing</option>
                <option value="Support">Support</option>
                <option value="Management">Management</option>
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
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="salary">Annual Salary</label>
              <input
                type="number"
                id="salary"
                name="salary"
                value={formData.salary}
                onChange={handleInputChange}
                placeholder="50000"
              />
            </div>
            <div className="form-group">
              <label htmlFor="status">Employment Status</label>
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
        </div>

        {/* Address Information Section */}
        <div className="form-section">
          <h2>Address Information</h2>

          <div className="form-group">
            <label htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              placeholder="123 Main Street"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="New York"
              />
            </div>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="NY"
              />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">Zip Code</label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                placeholder="10001"
              />
            </div>
          </div>
        </div>

        {/* Emergency Contact Section */}
        <div className="form-section">
          <h2>Emergency Contact</h2>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="emergencyContact">Contact Name</label>
              <input
                type="text"
                id="emergencyContact"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleInputChange}
                placeholder="Jane Doe"
              />
            </div>
            <div className="form-group">
              <label htmlFor="emergencyPhone">Contact Phone</label>
              <input
                type="tel"
                id="emergencyPhone"
                name="emergencyPhone"
                value={formData.emergencyPhone}
                onChange={handleInputChange}
                placeholder="(555) 987-6543"
              />
            </div>
          </div>
        </div>

        {/* Qualifications Section */}
        <div className="form-section">
          <h2>Qualifications & Certifications</h2>

          <div className="form-group">
            <label htmlFor="qualifications">
              List all relevant certifications and qualifications
            </label>
            <textarea
              id="qualifications"
              name="qualifications"
              value={formData.qualifications}
              onChange={handleInputChange}
              rows={4}
              placeholder="e.g., PT License #XXX, CPR Certification (expires 2025), BS in Physical Therapy"
            ></textarea>
          </div>
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Create Employee & Save to Excel
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
