import React from 'react';
import { HexColorPicker } from 'react-colorful';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

const ColorSelect = ({ open, onClose, color, onChange }) => {
  return (
    <>
      {open && (
        <div className="color-picker-container">
          <HexColorPicker
            className="color-picker"
            color={color}
            onChange={onChange}
          />
          <IconButton
            className="color-close-icon"
            aria-label="close"
            onClick={onClose}
          >
            <CancelIcon />
          </IconButton>
        </div>
      )}
    </>
  );
};

export default ColorSelect;
