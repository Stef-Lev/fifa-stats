import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
import Typography from '@mui/material/Typography';

function Participant({name, team}) {
    return (
        <div className='participant-item'>
            <PersonIcon/>
            <Typography>{name}</Typography>
            <Typography>{team}</Typography>
        </div>
    )
}

export default Participant;
