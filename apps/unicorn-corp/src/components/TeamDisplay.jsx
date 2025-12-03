import { useState, useEffect } from 'react';
import './TeamDisplay.css';

function TeamDisplay({ teamSize }) {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    // Generate mock team members based on team size
    const members = [];
    const roles = ['CTO', 'Growth Hacker', 'Full Stack Ninja', 'DevOps Wizard', 'Product Guru'];
    const names = ['Alex', 'Jordan', 'Taylor', 'Morgan', 'Casey', 'Riley', 'Avery', 'Quinn'];
    
    for (let i = 0; i < Math.min(teamSize, 5); i++) {
      members.push({
        id: i,
        name: names[i % names.length],
        role: roles[i % roles.length],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`
      });
    }
    
    setTeam(members);
  }, [teamSize]);

  if (teamSize === 0) return null;

  return (
    <div className="team-display">
      <h4>👥 Team Members ({teamSize})</h4>
      <div className="team-grid">
        {team.map(member => (
          <div key={member.id} className="team-member">
            <img src={member.avatar} alt={member.name} className="avatar" />
            <div className="member-info">
              <div className="member-name">{member.name}</div>
              <div className="member-role">{member.role}</div>
            </div>
          </div>
        ))}
        {teamSize > 5 && (
          <div className="team-member more">
            <div className="more-count">+{teamSize - 5}</div>
            <div className="member-info">
              <div className="member-name">More</div>
              <div className="member-role">Team Members</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeamDisplay;
