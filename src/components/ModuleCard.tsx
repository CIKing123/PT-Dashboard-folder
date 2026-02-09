import React from 'react';
import './ModuleCard.css';

interface ModuleCardProps {
  title: string;
  icon: string;
  color: string;
  onTap: () => void;
  children?: React.ReactNode;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
  title,
  icon,
  color,
  onTap,
  children,
}): React.ReactElement => {
  return (
    <div className={`module-card module-card-${color}`} onClick={onTap}>
      <div className="module-card-header">
        <span className="module-icon">{icon}</span>
        <h3 className="module-title">{title}</h3>
      </div>
      <div className="module-card-content">{children}</div>
    </div>
  );
};

export default ModuleCard;
