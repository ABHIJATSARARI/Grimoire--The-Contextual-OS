import { useState, useEffect } from 'react';
import './LegionDisplay.css';

function LegionDisplay({ legionSize }) {
  const [legion, setLegion] = useState([]);

  useEffect(() => {
    // Generate mock legion members - SAME avatars but with demonic filter
    const members = [];
    const titles = ['High Priest', 'Soul Harvester', 'The Vessel', 'Void Walker', 'Blood Keeper'];
    const names = ['Alexius', 'Jordanis', 'Taylorus', 'Morgana', 'Cassius', 'Rileya', 'Avernus', 'Quinnus'];
    
    for (let i = 0; i < Math.min(legionSize, 5); i++) {
      members.push({
        id: i,
        name: names[i % names.length],
        title: titles[i % titles.length],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}` // SAME seed as Reality
      });
    }
    
    setLegion(members);
  }, [legionSize]);

  if (legionSize === 0) return null;

  return (
    <div className="legion-display">
      <h4>👹 Legion Members ({legionSize})</h4>
      <div className="legion-grid">
        {legion.map(member => (
          <div key={member.id} className="legion-member">
            <img src={member.avatar} alt={member.name} className="avatar demonic" />
            <div className="member-info">
              <div className="member-name">{member.name}</div>
              <div className="member-title">{member.title}</div>
            </div>
          </div>
        ))}
        {legionSize > 5 && (
          <div className="legion-member more">
            <div className="more-count">+{legionSize - 5}</div>
            <div className="member-info">
              <div className="member-name">More</div>
              <div className="member-title">Dark Entities</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LegionDisplay;
