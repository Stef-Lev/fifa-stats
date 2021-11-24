import React from 'react';
import { useNavigate } from 'react-router-dom';

const itemColors = ['#1077c3', '#fec310', '#e93c42', '#49bce3'];

function HomeGridItem({ title, index, page }) {
  const navigate = useNavigate();
  return (
    <div
      className="home-item with-shadow flex-centered"
      style={{ backgroundColor: itemColors[index] }}
      onClick={() => navigate(page)}
    >
      <p>{title}</p>
    </div>
  );
}

export default HomeGridItem;
