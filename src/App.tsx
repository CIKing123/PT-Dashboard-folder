import React, { useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen';
import CreateEmployeeScreen from './screens/CreateEmployeeScreen';
import EditEmployeeScreen from './screens/EditEmployeeScreen';
import { Employee } from './types/Employee';
import { updateEmployeeData } from './services/excelService';

function App(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const handleNavigate = (page: string, employee?: Employee) => {
    if (employee) {
      setSelectedEmployee(employee);
    }
    setCurrentPage(page);
  };

  return (
    <div className="app">
      {currentPage === 'home' && (
        <HomeScreen onNavigate={(page) => handleNavigate(page)} />
      )}
      {currentPage === 'employees' && (
        <EmployeeDetailsScreen
          onBack={() => handleNavigate('home')}
          onNavigate={handleNavigate}
        />
      )}
      {currentPage === 'create-employee' && (
        <CreateEmployeeScreen onBack={() => handleNavigate('home')} />
      )}
      {currentPage === 'edit-employee' && selectedEmployee && (
        <EditEmployeeScreen
          employee={selectedEmployee}
          onBack={() => handleNavigate('home')}
        />
      )}
    </div>
  );
}

export default App;
