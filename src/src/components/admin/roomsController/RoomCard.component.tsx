import React from 'react';
import { useNavigate } from 'react-router-dom';
import './roomControlPannel.css'

function RoomCardComponent(props: any) {
    const navigate = useNavigate();

    return (
        <div>
            <button className='room-btn' onClick={() => navigate(`/admin/room?roomName=${props.roomName}`)}>{props.roomName}</button>
        </div>
    );
}

export default RoomCardComponent;