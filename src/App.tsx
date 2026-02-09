import React, { useState } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import EmployeeDetailsScreen from './screens/EmployeeDetailsScreen';
import CreateEmployeeScreen from './screens/CreateEmployeeScreen';
import EditEmployeeScreen from './screens/EditEmployeeScreen';
import { Employee } from '../src/types/Employee';

function App(): React.ReactElement {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);


  return (
    <div className="app">
      {currentPage === 'home' && (
        <HomeScreen onNavigate={(page) => setCurrentPage(page)} />
      )}
      <EmployeeDetailsScreen
  onBack={() => setCurrentPage('home')}
  onNavigate={(page, employee) => {
    setSelectedEmployee(employee);
    setCurrentPage(page);
  }}
/>

      {currentPage === 'create-employee' && (
        <CreateEmployeeScreen onBack={() => setCurrentPage('home')} />
      )}
      {currentPage === 'edit-employee' && selectedEmployee && (
  <EditEmployeeScreen
    employee={setSelectedEmployee}
    onBack={() => setCurrentPage('home')}
  />
)}

    </div>
  );
}

export default App;
