import React, { useRef } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageDrop } from 'quill-image-drop-module';
import { message } from 'antd';
import ajax from '@/util/request.js';
Quill.register('modules/imageDrop', ImageDrop);

function RichText (props) {
    let quillRef = useRef(null);
    let onQuillChange = (content) => {
        props.onQuillChange && props.onQuillChange(content);
    };
    
    function uploadFile (formData, cb) {
        ajax({
            url: props.url,
            method: 'post',
            data: formData
        }).then((res) => {
            message.success('上传成功');
            cb && cb(res);
        }).catch(() => {
            message.error('上传失败');
        });
    }

    const handleImage = () => {
        let quillEditor = quillRef.current.getEditor();
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('quill-image', file);
            uploadFile(formData, (data) => {
                const range = quillEditor.getSelection();
                const link = data.filePath;
                quillEditor.insertEmbed(range.index, 'image', link);
            }) 
        }
    };
    const DEFAULT_OPTIONS = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                [{ 'script': 'sub'}, { 'script': 'super' }],
                ['blockquote', 'code-block'],
                [{ 'align': []}],
                ['bold', 'italic', 'underline', 'strike'],  
                [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                ['image']
            ],
            handlers: {
                'image': handleImage
            }
        },
        imageDrop: true
    };

    return  <ReactQuill ref={quillRef}
                        value={props.defaultValue}
                        modules={Object.assign(DEFAULT_OPTIONS, props.options)}
                        onChange={onQuillChange}/>
};

export default RichText;

// class RichText extends React.Component {
//     constructor (props) {
//         super(props);
//         this.state = {
//             editorVal: props.defaultValue
//         };
//         this.quillRef = React.createRef();
//         this.DEFAULT_OPTIONS = {
//             toolbar: {
//                 container: [
//                     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//                     [{ 'align': []}],
//                     ['image']
//                 ],
//                 handlers: {
//                     'image': this.handleImage
//                 }
//             },
//             imageDrop: true
//         };
//     }

//     uploadFile = (formData, cb) => {
//         ajax({
//             url: this.props.url,
//             method: 'post',
//             data: formData
//         }).then((res) => {
//             message.success('上传成功');
//             cb && cb(res);
//         }).catch(() => {
//             message.error('上传失败');
//         });
//     }
//     handleImage = () => {
//         let quillEditor = this.quillRef.current.getEditor();
//         const input = document.createElement('input');
//         input.setAttribute('type', 'file');
//         input.setAttribute('accept', 'image/*');
//         input.click();
//         input.onchange = async () => {
//             const file = input.files[0];
//             const formData = new FormData();
//             formData.append('quill-image', file);
//             this.uploadFile(formData, (data) => {
//                 const range = quillEditor.getSelection();
//                 const link = data.filePath;
//                 quillEditor.insertEmbed(range.index, 'image', link);
//             }) 
//         }
//     } 
//     onQuillChange = (content) => {
//         this.props.onQuillChange && this.props.onQuillChange(content);
//         this.setState({
//             editorVal: content
//         });
//     }
//     render () {
//         return (
//             <ReactQuill ref={this.quillRef}
//                         value={this.state.editorVal}
//                         modules={Object.assign(this.DEFAULT_OPTIONS, this.props.options)}
//                         onChange={this.onQuillChange}/>
//         )
//     }
// }
