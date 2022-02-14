import * as React from 'react';
import roomService from '../../../services/admin/room.service';
import RoomCardComponent from './RoomCard.component';

export default class RoomsControlPanelComponent extends React.Component<any> {

    state = {
        rooms: ['l'],
    }
    constructor(props: any) {
        super(props)
        this.state = {
            rooms: ['l'],
        }
        this.updateRooms();
    }

    async updateRooms() {
        const rooms = await roomService.getRooms();
        console.log(rooms.data);
        this.setState({ rooms: rooms.data });
    }

    public render() {
        return (
            <div>
                {this.state.rooms.map((room: any, i) => {
                    // Return the element. Also pass key     
                    return (<RoomCardComponent key={i} roomName={room} />)
                })}
            </div>
        )
    }
}
