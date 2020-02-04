import React, { useState, useRef, useImperativeHandle } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ImageDrop } from 'quill-image-drop-module';
import { message } from 'antd';
import ajax from '@/util/request.js';
Quill.register('modules/imageDrop', ImageDrop);

function RichText (props, ref) {
    let quillRef = useRef(null);
    let onQuillChange = (content) => {
        props.onQuillChange && props.onQuillChange(content);
    };

    useImperativeHandle(ref, () => ({
        getContent: () => {
            return quillRef.current.getEditorContents();
        },
        onBlur: () => {
            quillRef.current.blur();
        }
    }));
    
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
                [{ 'align': []}],
                ['image']
            ],
            handlers: {
                'image': handleImage
            }
        },
        imageDrop: true
    };

    return  <ReactQuill ref={quillRef}
                        defaultValue={props.defaultValue}
                        modules={Object.assign(DEFAULT_OPTIONS, props.options)}/>
};

export default React.forwardRef(RichText);