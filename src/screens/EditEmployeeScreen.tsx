import React, { useState } from "react";
import { updateEmployeeData, EmployeeData } from "../services/excelService";

interface EditEmployeeScreenProps {
  employee: EmployeeData & { id: number };
  onBack: () => void;
}

const EditEmployeeScreen: React.FC<EditEmployeeScreenProps> = ({
  employee,
  onBack,
}) => {
  const [formData, setFormData] = useState(employee);
  const [saving, setSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const success = await updateEmployeeData(formData);

    setSaving(false);
    if (success) onBack();
    else alert("Failed to update employee");
  };

  return (
    <div className="create-employee-screen">
      <h1>Edit Employee</h1>

      <form onSubmit={handleSubmit} className="employee-form">
        <div className="form-section">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input name="name" id="name" value={formData.name} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input name="email" id="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input name="position" id="position" value={formData.position} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="department">Department</label>
            <select name="department" id="department" value={formData.department} onChange={handleChange}>
              <option value="">Select Department</option>
              <option value="Therapy">Therapy</option>
              <option value="Admin">Admin</option>
              <option value="Billing">Billing</option>
              <option value="Support">Support</option>
              <option value="Management">Management</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status} onChange={handleChange}>
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="passportPhoto">Passport Photo URL</label>
            <input name="passportPhoto" id="passportPhoto" value={formData.passportPhoto || ''} onChange={handleChange} />
          </div>
        </div>

        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save Changes"}
          </button>
          <button type="button" onClick={onBack}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployeeScreen;
