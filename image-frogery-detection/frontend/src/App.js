import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Helmet from 'react-helmet';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import axios from 'axios'

class Header extends Component {
  render() {
    return (
      <div className="App ">

<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
              <Helmet>
                  <style>{'body { background-color: #282c34; }'}</style>
              </Helmet>
        <header className="App-header">
        <h1 className = "Header-main" >Photo Forgery Detection</h1>
        </header>

      </div>
    );
  }
}
function checkImageExists(imageUrl, callBack) {
  var imageData = new Image();
    imageData.onload = function() {
      callBack(true);
    };
    imageData.onerror = function() {
      callBack(false);
    };
  imageData.src = imageUrl;
}class ImageUpload extends React.Component {
  constructor(props) {
    super(props);
    this.state = {file: '',imagePreviewUrl: ''};
  }

  _handleSubmit(e) {
    e.preventDefault();
    // alert(this.state.file);
    if ( this.state.file == '' && this.state.imagePreviewUrl.trim() == ''  ){
      alert("Please Upload a File or URL");
    return null;}
    if ( this.state.file == '' && this.state.imagePreviewUrl.trim() != ''  ){
        checkImageExists(this.state.imagePreviewUrl.trim(), function(existsImage) {
      if(existsImage == false) {
        alert("Please enter a valid Url");
        return null;
      }
      });
    }
    // TODO: do something with -> this.state.file
    const formData = new FormData();
    if (this.state.file != ''){
    formData.append('image',this.state.file)
    axios.post("http://127.0.0.1:8000/api/upload_image/",formData,{
    onUploadProgress: progressEvent => {
      console.log(progressEvent.loaded / progressEvent.total)
    }}).then((response) => {
                alert("The file is successfully uploaded");
                window.location.replace('http://localhost:3000/detect');

            }).catch((error) => {
        });
    console.log('handle uploading-', this.state.file);
    }
    else {
    formData.append('imageurl',this.state.imagePreviewUrl.trim())
    axios.post("http://127.0.0.1:8000/api/upload_image_url/",formData,{
    onUploadProgress: progressEvent => {
      console.log(progressEvent.loaded / progressEvent.total)
    }}).then((response) => {
                alert("The file is successfully uploaded");
                window.location.replace('http://localhost:3000/detect');

            }).catch((error) => {
        });
    console.log('handle uploading-', this.state.file);

    }
  }
  _handleUrlChange(e) {
    e.preventDefault();

    let file = e.target.value;

      this.setState({
        imagePreviewUrl: file,
      });
      }
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
      });
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
     $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select an Image for Preview</div>);
    }

    return (
      <div className="previewComponent">
      <Container className = "cont1">
      <Row>
        <div className = "divhead2">
          Upload an Image for Frogery Detection
        </div>
      </Row>
        <Row>
        <form onSubmit={(e)=>this._handleSubmit(e)}>
            <Col className >
            <div className = "para1" >Upload URL:</div>
            <input className="fileInput" name="url"
            placeholder="http://" type="text" onChange={(e)=>this._handleUrlChange(e)} />
            <button className="submitButton" type="submit"
                onClick={(e)=>this._handleSubmit(e)}>Upload URL</button>

            <Col>
            </Col>
            <div className = "para1" >Upload File:</div>
              <input className="fileInput"
                type="file"
                onChange={(e)=>this._handleImageChange(e)} />
              <button className="submitButton"
                type="submit"
                onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
            </Col>

        </form>
      </Row>
      <Row>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </Row>
      </Container>;
      </div>
    )
  }
}
class App extends Component {
  render() {
    return (
       <div>
      <Header />
      <ImageUpload />
       </div>
    );
  }
}
export default App;
