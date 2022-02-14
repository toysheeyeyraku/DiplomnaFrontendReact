import * as React from 'react';
import './adminRoom.css'
import roomService from '../../../services/admin/room.service';
import StudentRoomChooserComponent from './StudentRoomChooser.component';

interface IProps {
}

type State = {
    roomName: string,
    roomCapacity: string,
    roomStudents: any[],
    roomImage: string,
    roomImageFile: any
}

export default class AdminRoomComponent extends React.Component<any> {

    state = {
        roomName: '',
        roomCapacity: '0',
        roomStudents: [''],
        roomImage: '',
        roomImageFile: ''
    }

    constructor(props: any) {

        super(props)
        this.state = {
            roomName: '',
            roomCapacity: '0',
            roomStudents: [],
            roomImage: '',
            roomImageFile: ''
        }


        this.handleChangeRoomName = this.handleChangeRoomName.bind(this);
        this.handleChangeRoomCapacity = this.handleChangeRoomCapacity.bind(this);
        this.handleChangeRoomImage = this.handleChangeRoomImage.bind(this);
        this.onInit();

    }

    async onInit() {


        await this.updateStudentProfile();
    }


    handleChangeRoomName(event: any) {
        this.setState({ roomName: event.target.value });
    }

    handleChangeRoomCapacity(event: any) {
        this.setState({ roomCapacity: event.target.value });
        this.state.roomCapacity = event.target.value;
        this.normalizeStudents();
    }


    async updateStudentProfile() {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let roomName = params.get('roomName');

        const result = (await roomService.getRoom(roomName)).data;

        this.setState({ roomName: result.name })
        this.setState({ roomCapacity: result.capacity ? result.capacity : 0 })
        this.setState({ roomStudents: result.userIds ? result.userIds : [] })
        this.setState({ roomImage: `data:image/png;base64,${result.roomImage}` })
        console.log(result);
        this.normalizeStudents();


    }

    normalizeStudents() {
        const students = [];

        for (let i = 0; i < new Number(this.state.roomCapacity); i++) {
            if (this.state.roomStudents.length > i) {
                students.push(this.state.roomStudents[i]);
            } else {
                students.push('');
            }
        }

        this.setState({ roomStudents: students })
    }

    async handleChangeRoomImage(event: any) {
        await this.setState({ roomImageFile: event.target.files[0] })

    }

    async saveProfileImage() {
        await roomService.updateRoomImage(this.state.roomImageFile, this.state.roomName);

    }

    async saveRoomData() {
        const roomDto = {
            Name: this.state.roomName,
            Capacity: this.state.roomCapacity,
            UserIds: this.state.roomStudents,
        }
        console.log(roomDto);
        console.log(this.state);
        await roomService.updateRoom(roomDto);
    }

    async updateRoom() {
        await this.saveProfileImage();
        await this.saveRoomData();
        await this.updateStudentProfile();
    }

    renderStudents() {

        return (
            <div>
                {this.state.roomStudents.map((student, i) => {
                    // Return the element. Also pass key     
                    return (<StudentRoomChooserComponent indx={i} key={i} props={student} students={this.state.roomStudents} />)
                })}
            </div>
        )

    }

    public render() {
        return (
            <div>
                <div className='blackLine'></div>
                <div className='prifileWrapper'>
                    <div className='leftBlock'>
                        <div className='controll-input'>
                            <p>Ім'я Кімнати</p>
                            <input type="text" value={this.state.roomName} onChange={this.handleChangeRoomName} />
                        </div>

                        <div className='controll-input'>
                            <p>Вмістимість</p>
                            <input type="text" value={this.state.roomCapacity} onChange={this.handleChangeRoomCapacity} />
                        </div>

                        {
                            this.renderStudents()
                        }

                    </div>
                    <div className='rightBlock'>
                        <div className='profileImageWrapper'>
                            <img src={this.state.roomImage} />
                        </div>
                        <input type='file' onChange={this.handleChangeRoomImage} />
                    </div>
                </div>
                <div className='saveSection'>
                    <button className='save-btn' onClick={() => this.updateRoom()}>Зберегти</button>
                </div>


            </div>
        )
    }
}
