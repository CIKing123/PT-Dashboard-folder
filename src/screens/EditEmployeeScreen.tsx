import React, { useState } from "react";
import { updateEmployeeData } from "../services/excelService";
import type { EmployeeData } from "../services/excelService";

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
        <input name="firstName" value={formData.firstName} onChange={handleChange} />
        <input name="lastName" value={formData.lastName} onChange={handleChange} />
        <input name="email" value={formData.email} onChange={handleChange} />
        <input name="phone" value={formData.phone} onChange={handleChange} />
        <input name="jobRole" value={formData.jobRole} onChange={handleChange} />

        {/* reuse the rest of your form exactly like CreateEmployeeScreen */}

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
