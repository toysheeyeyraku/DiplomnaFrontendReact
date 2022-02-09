import * as React from 'react';
import apiRequestService from '../../../services/ApiRequestService';
import { AxiousRequestMethod } from '../../../types/axiosRequestMethod.type';
import StudentCardComponent from './StudentCard.component'

export default class StudentControllPanellComponent extends React.Component<any> {

    state = {
        users: [],
    }
    constructor(props: any) {
        super(props)
        this.state = {
            users: [],
        }
        this.getUsers();
    }

    async getUsers() {

        const result = await apiRequestService.makeRequest(AxiousRequestMethod.get, 'https://localhost:5000/users');
        console.log(result.data);
        this.setState({ users: result.data });
    }

    public render() {
        return (
            <div>
                {this.state.users.map((user: any, i) => {
                    // Return the element. Also pass key     
                    return (<StudentCardComponent key={i} userId={user.id} userName={user.userName} />)
                })}
            </div>
        )
    }
}
