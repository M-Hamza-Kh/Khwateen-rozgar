import React, {Component} from 'react';
import 'react-image-lightbox/style.css';
import Lightbox from "react-image-lightbox";
import "./style.css";

export default class ZoomImageLightBox extends Component {

    constructor(props) {
        super(props);
        this.state = {
            photoIndex: 0,
            images: props.images
        }
    }

    handleClose = () => {
        this.props.closeZoom()
    }

    render() {
        let {photoIndex, images} = this.state;
        let {isOpen} = this.props;
        return (
            <React.Fragment>
                {
                    isOpen ?
                        <Lightbox
                            mainSrc={images[photoIndex]}
                            // nextSrc={images[(photoIndex + 1) % images.length]}
                            // prevSrc={images[(photoIndex + images.length - 1) % images.length]}
                            // onMoveNextRequest={() => this.setState({
                            //     photoIndex: photoIndex + 1 % images.length
                            // })}
                            // onMovePrevRequest={() => this.setState({
                            //     photoIndex: (photoIndex + images.length - 1) % images.length
                            // })}
                            onCloseRequest={this.handleClose}
                        /> : ''
                }
            </React.Fragment>
        );
    }
}