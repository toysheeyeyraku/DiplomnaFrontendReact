import * as React from 'react';
import './paymentCard.css'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default class PaymendCardComponent extends React.Component<any> {

    state = {
        paymentCheck: '',
        viewerIsOpen: false,
    }

    constructor(props: any) {
        super(props)
        this.state = {
            paymentCheck: `data:image/png;base64,${props.props.paymentImage}`,
            viewerIsOpen: false,
        }
        this.closeViewer = this.closeViewer.bind(this);
        this.openViewer = this.openViewer.bind(this);

    }

    openViewer() {
        this.setState({ viewerIsOpen: true })
    }

    closeViewer() {
        this.setState({ viewerIsOpen: false });
    }

    renderExpandImage() {
        if (this.state.viewerIsOpen === false) {
            return (
                <div></div>
            )
        }
        return (
            <div className='expandedImage'>
                <div className='image'>
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={200}
                        initialPositionY={100}>
                        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                            <React.Fragment>
                                <div className="tools">

                                    <button className='closeButton' onClick={() => this.closeViewer()}>X</button>
                                </div>
                                <TransformComponent>
                                    <img src={this.state.paymentCheck} alt="test" />
                                    <div>Example text</div>
                                </TransformComponent>
                            </React.Fragment>
                        )}
                    </TransformWrapper>
                </div>
            </div>
        );
    }

    public render() {
        return (

            <div>
                {this.renderExpandImage()}
                <button onClick={() => this.openViewer()}>
                    <img className='paymentCard' src={this.state.paymentCheck} />
                </button>
                <p>Date: {this.props.props.date}</p>
            </div>

        )
    }
}
