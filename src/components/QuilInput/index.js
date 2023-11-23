import React, {Component} from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.bubble.css';
import "react-quill/dist/quill.core.css";
import './quill/variables.scss';
import './quill/quill.scss';

export default class HtmlInput extends Component{
    quillEdit = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            getText: '',
            getHtml: '',
            getLength: '',
            content:  '',
        }
        this.modules = {
            toolbar: [
                [{ 'font': [] }],
                [{ 'size': ['small', false, 'large', 'huge'] }],
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'link', 'image'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                //[{ 'indent': '-1'}, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'align': ['center'] }],
                [{ 'color': [] }, { 'background': [] }],
                ['clean']
            ]
        };
        this.formats = [
            'font',
            'size',
            'bold', 'italic', 'underline', 'link', 'image',
            'list', 'bullet',
            'align',
            'color', 'background',
            'direction', 'header',
            'script', 'indent'
        ];
    }

    rteChange = (content, delta, source, editor) => {
        //console.log("emailMsg",content)
        this.setState({
            /*getHTML:editor.getHTML(),*/
            getText: editor.getText(),
            getHtml: editor.getHTML(),
            getLength: editor.getLength(),
            content: `${content}`,
        });
        this.props.onChange(content)
        console.log("emailMsg",content)
    };

    render() {
        let {defaultDetails} = this.props;
        console.log("data",defaultDetails)
        return (
            <div className="reactQuill d-flex mt-20 mb-20 mr-20 ml-20">
                <ReactQuill ref={this.quillEdit} onChange={this.rteChange} theme='snow' modules={this.modules}
                            formats={this.formats} defaultValue={defaultDetails}/>
            </div>
        )
    }
}
