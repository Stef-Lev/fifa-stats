import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeGridItem({ title, index, page }) {
  const navigate = useNavigate();
  return (
    <div className="home-item flex-centered" onClick={() => navigate(page)}>
      <p>{title}</p>
    </div>
  );
}

export default HomeGridItem;
