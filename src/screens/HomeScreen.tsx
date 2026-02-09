import React from 'react';
import ModuleCard from '../components/ModuleCard';
import QuickActionCard from '../components/QuickActionCard';
import '../styles/HomeScreen.css';

interface HomeScreenProps {
  onNavigate: (page: string) => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
}): React.ReactElement => {
  const handleNavigateToModule = (moduleName: string): void => {
    if (moduleName === 'Employee Details') {
      onNavigate('employees');
    } else {
      alert(`Navigate to ${moduleName}`);
    }
  };

  return (
    <div className="home-screen">
      {/* App Header */}
      <header className="app-header">
        <h1 className='title-header'>PT Dashboard</h1>
      </header>

      {/* Main Content */}
      <main className="home-content">
        {/* Welcome Header */}
        <h2 className="welcome-header">Welcome to Dashboard</h2>

        {/* Employee Details Module */}
        <ModuleCard
          title="Employee Details"
          icon="👤"
          color="blue"
          onTap={() => handleNavigateToModule('Employee Details')}
        >
          <div className="info-row">
            <span className="info-label">Total Employees:</span>
            <span className="info-value">150</span>
          </div>
          <div className="info-row">
            <span className="info-label">Active:</span>
            <span className="info-value">145</span>
          </div>
          <div className="info-row">
            <span className="info-label">On Leave:</span>
            <span className="info-value">5</span>
          </div>
        </ModuleCard>

        {/* Project Measures Module */}
        <ModuleCard
          title="Project Measures"
          icon="📈"
          color="green"
          onTap={() => handleNavigateToModule('Project Measures')}
        >
          <div className="info-row">
            <span className="info-label">Active Projects:</span>
            <span className="info-value">12</span>
          </div>
          <div className="info-row">
            <span className="info-label">Completion Rate:</span>
            <span className="info-value">75%</span>
          </div>
          <div className="info-row">
            <span className="info-label">Budget Used:</span>
            <span className="info-value">60%</span>
          </div>
        </ModuleCard>

        {/* Quick Actions Section */}
        <h3 className="quick-actions-title">Quick Actions</h3>

        {/* Quick Action Cards Grid */}
        <div className="quick-actions-grid">
          <QuickActionCard
            label="Reports"
            icon="📊"
            color="orange"
            onTap={() => handleNavigateToModule('Reports')}
          />
          <QuickActionCard
            label="Analytics"
            icon="📉"
            color="purple"
            onTap={() => handleNavigateToModule('Analytics')}
          />
          <QuickActionCard
            label="Tasks"
            icon="✓"
            color="teal"
            onTap={() => handleNavigateToModule('Tasks')}
          />
          <QuickActionCard
            label="Settings"
            icon="⚙️"
            color="gray"
            onTap={() => handleNavigateToModule('Settings')}
          />
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;
