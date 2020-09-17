import React, { useRef } from 'react';
import { render } from 'react-dom'
import axios from "axios";
import { notification , Modal, message} from 'antd';
import EmailEditor from 'react-email-editor';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  height: 100%;
`; 

const Bar = styled.div`
  flex: 1;
  background-color: #61dafb;
  color: #000;
  padding: 10px;
  display: flex;
  max-height: 40px;

  h1 {
    flex: 1;
    font-size: 16px;
    text-align: left;
  }

  button {
    flex: 1;
    padding: 10px;
    margin-left: 10px;
    font-size: 14px;
    font-weight: bold;
    background-color: #000;
    color: #fff;
    border: 0px;
    max-width: 150px;
    cursor: pointer;
  }
`;


const host = 'https://backend-entr.herokuapp.com';

const EmailBuilder = (props) => {
  const emailEditorRef = useRef(null);
  // console.log('this is my token', props.token)
  
  const onDesignLoad = (data) => {
    console.log('onDesignLoad', data);
  };

  const onLoad = () => {
  //  emailEditorRef.current.editor.addEventListener('onDesignLoad', onDesignLoad);
  //  emailEditorRef.current.editor.loadDesign(sample);
  };

  const exportHtml = () => {
    emailEditorRef.current.editor.exportHtml((data) => {
      const { design, html } = data;
      console.log('exportHtml', html);

      const PreviewedHTML = html
      const endpoint = host + `/management/store-vendor-temp/`
      
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: `Token ${props.token}`
      };
      const preJSON = 'qq'

      const fd = new FormData()
      fd.append('PreviewedHTML' ,PreviewedHTML)
      fd.append('preJSON',preJSON)

      axios.post(endpoint,fd )
      .then(res=>{
        if (res.status == 200){
          props.props.history.push('/create-website-portal/')
          //window.location.replace("/create-website-portal/")
          message.success('Saved Successfully')
        }else{
          message.error('error saving temp')
        }

      })
    });
  };

  const redirectHome = ()=>{
    props.props.history.push('/create-website-portal/')
  }

  // const onLoad = () => {
  //   // you can load your template here;
  //   // const templateJson = {};
  //   // emailEditorRef.current.editor.loadDesign(templateJson);
  // };

  return (
    <div>
      
      
      <div className="base-card">
      <EmailEditor
        ref={emailEditorRef}
        onLoad={onLoad}
      />
      </div>

      <div>

      <button
        style={{padding:1}}
        className="custom-button"
        onClick={redirectHome}>Back </button>

        <button
        className="custom-button"
        onClick={exportHtml}>Save </button>
      </div>
    </div>
  );
};

export default EmailBuilder