import React from 'react';
import './QuickActionCard.css';

interface QuickActionCardProps {
  label: string;
  icon: string;
  color: string;
  onTap: () => void;
}

const QuickActionCard: React.FC<QuickActionCardProps> = ({
  label,
  icon,
  color,
  onTap,
}): React.ReactElement => {
  return (
    <div className={`quick-action-card quick-action-card-${color}`} onClick={onTap}>
      <div className="quick-action-icon">{icon}</div>
      <div className="quick-action-label">{label}</div>
    </div>
  );
};

export default QuickActionCard;
