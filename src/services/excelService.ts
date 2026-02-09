/**
 * Excel (Google Sheets) Integration Service
 * Uses Google Apps Script Web App (Webhook)
 * SAFE for frontend usage
 */

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
  status: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: string;
  emergencyPhone: string;
  qualifications: string;
}

// Your deployed Apps Script Web App URL
const SHEET_WEBHOOK_URL =
  "https://script.google.com/macros/s/AKfycbyUKD48gM3YKDHGM6qZRrywcB-EdnMIKV0kRwyrvGUq-Wpsz6uKlF9ET95dKZT84lTL/exec";

/**
 * Save employee data to Google Sheets
 */
export async function saveEmployeeData(
  data: EmployeeData
): Promise<boolean> {
  try {
    const response = await fetch(SHEET_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Failed to save employee:", error);
    return false;
  }
}

export async function updateEmployeeData(
  data: EmployeeData & { id: number }
): Promise<boolean> {
  try {
    const response = await fetch(
      `${SHEET_WEBHOOK_URL}?action=update`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    return result.success === true;
  } catch (error) {
    console.error("Failed to update employee:", error);
    return false;
  }
}

/**
 * Fetch all employees from Google Sheets
 */
export async function fetchEmployees(): Promise<(EmployeeData & { id: number })[]> {
  try {
    const response = await fetch(
      `${SHEET_WEBHOOK_URL}?action=fetch`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
}

