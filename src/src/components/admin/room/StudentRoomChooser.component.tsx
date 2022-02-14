import * as React from 'react';

export default class StudentRoomChooserComponent extends React.Component<any> {
    state = {
        val: '',

    }
    constructor(props: any) {
        super(props)
        console.log(props);
        this.state = {
            val: this.props.students[parseInt(this.props.indx)],
        }

        this.onChangeInput = this.onChangeInput.bind(this);
    }

    async onChangeInput(event: any) {
        await this.setState({ val: event.target.value });
        this.props.students[parseInt(this.props.indx)] = this.state.val;
    }

    public render() {
        return (
            <div>
                <input value={this.state.val} type='text' onChange={this.onChangeInput} />
            </div>
        )
    }
}
