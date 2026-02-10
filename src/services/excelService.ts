/**
 * Excel (Google Sheets) Integration Service
 * Uses Sheety API (No backend needed!)
 * SAFE for frontend usage
 */

export interface EmployeeData {
  name: string;
  email: string;
  position: string;
  department: string;
  status: string;
  passportPhoto?: string;
}

// Your Sheety API URL - Replace with your actual URL from sheety.co
const SHEETY_API_URL =
  "https://api.sheety.co/a0f39351ff632bc3838e0d85a999dba8/ptEmployeeData/sheet1";

/**
 * Save employee data to Google Sheets via Sheety
 */
export async function saveEmployeeData(
  data: EmployeeData
): Promise<boolean> {
  try {
    console.log("Sending employee data to Sheety:", SHEETY_API_URL);
    console.log("Data being sent:", data);
    
    const response = await fetch(SHEETY_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ sheet1: data }),
    });

    console.log("Response status:", response.status);
    const result = await response.json();
    console.log("Server response:", result);
    
    return response.ok;
  } catch (error) {
    console.error("Failed to save employee:", error);
    alert(`Error saving employee: ${error}`);
    return false;
  }
}

export async function updateEmployeeData(
  data: EmployeeData & { id: number }
): Promise<boolean> {
  try {
    const response = await fetch(
      `${SHEETY_API_URL}/${data.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sheet1: data }),
      }
    );

    return response.ok;
  } catch (error) {
    console.error("Failed to update employee:", error);
    return false;
  }
}

/**
 * Fetch all employees from Google Sheets via Sheety
 */
export async function fetchEmployees(): Promise<(EmployeeData & { id: number })[]> {
  try {
    const response = await fetch(SHEETY_API_URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });

    const result = await response.json();
    return result.sheet1 || [];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
}

/**
 * Delete an employee from Google Sheets via Sheety
 */
export async function deleteEmployeeData(id: number): Promise<boolean> {
  try {
    const response = await fetch(`${SHEETY_API_URL}/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    return response.ok;
  } catch (error) {
    console.error("Failed to delete employee:", error);
    return false;
  }
}

