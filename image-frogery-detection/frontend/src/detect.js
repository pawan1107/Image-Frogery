import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './detect.css';
import Helmet from 'react-helmet';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { Resizable } from 'react-resizable';
import PropTypes from 'prop-types';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import 'react-resizable/css/styles.css';
import axios from 'axios'


class Header extends Component {
  render() {
    return (
      <div className="App ">
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

class Detect extends Component {
  _handleDigest(e){
  document.getElementById("img1").style.display = "none";
  document.getElementById("table1").style.display = "block";
  axios.get(`http://127.0.0.1:8000/api/digest/`)
      .then(res => {
        updateData(res.data)
      })

  document.getElementById("table1").scrollIntoView() ;
  }
  _handleEla(e){
    document.getElementById("table1").style.display = "none";
    document.getElementById("img1").style.display = "block";
    axios.get(`http://127.0.0.1:8000/api/ela/`)
        .then(res => {
          updateImg(res.data["url"])
        })

    document.getElementById("img1").scrollIntoView() ;
    }
  _handleMetaData(e){
  document.getElementById("img1").style.display = "none";
  document.getElementById("table1").style.display = "block";
  axios.get(`http://127.0.0.1:8000/api/metadata/`)
      .then(res => {
        updateData(res.data)
      })
  document.getElementById("table1").scrollIntoView() ;
}
  _handleSource(e){
  document.getElementById("table1").style.display = "none";
  document.getElementById("img1").style.display = "block";
  axios.get(`http://127.0.0.1:8000/api/originalimg/`)
      .then(res => {
        updateImg(res.data["url"])
      })
  document.getElementById("img1").scrollIntoView() ;
  }
  render() {
    return (
       <div   className = "left-cont1">
       <Container>
       <Row>
        <Col>
          <div>
          <h3 className = "header1">Analysis:</h3>
            <ul className = "ullist1">
              <li  className = "lilist1" onClick={(e)=>this._handleDigest(e)}>Digest</li>
              <li  className = "lilist1" onClick={(e)=>this._handleEla(e)}>Ela</li>
              <li  className = "lilist1" onClick={(e)=>this._handleMetaData(e)}>MetaData</li>
              <li  className = "lilist1" onClick={(e)=>this._handleSource(e)}>Source</li>
            </ul>
          </div>
         </Col>
       </Row>
       </Container>
       </div>
    );
  }
}
class ShowImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
         imgurl : [],
         callvalue: 1,
        }
      }
  render() {
    if(this.state.callvalue != 3){
      axios.get(`http://127.0.0.1:8000/api/originalimg/`)
          .then(res => {
            this.setState({imgurl: res.data["url"],callvalue:this.state.callvalue+1})
          })
        }
    return (
       <div  className = "divimg">
       <img src={this.state.imgurl} alt = "Image" className = "img1" />
       </div>
    );
  }
}
const ResizeableTitle = props => {
  const { onResize, width, ...restProps } = props;

  if (!width) {
    return <th {...restProps} />;
  }

  return (
    <Resizable width={width} height={0} onResize={onResize}>
      <th {...restProps} />
    </Resizable>
  );
};
ResizeableTitle.propTypes = {
  onResize: PropTypes.func.isRequired,
  width: PropTypes.number,
};
function updateImg(text){
    this.setState({imgurl: text,})
}
function updateData(text){
    this.setState({data: text,})
}
class ShowData extends Component {
    constructor(props) {
        super(props)
        this.state = {
         columns: [
           { title: 'title1', dataIndex: 'a', key: 'a', width: 75 },
           { title: 'title2', dataIndex: 'b', key: 'b', width: 125 },
         ],
         data : [],
         imgurl : [],
        }
        updateImg = updateImg.bind(this)
        updateData = updateData.bind(this)
    }
 //  state = {
 //   columns: [
 //     { title: 'title1', dataIndex: 'a', key: 'a', width: 75 },
 //     { title: 'title2', dataIndex: 'b', key: 'b', width: 125 },
 //   ],
 //   data : [],
 // };
 components = {
   header: {
     cell: ResizeableTitle,
   },
 };
handleResize = index => (e, { size }) => {
    this.setState(({ columns }) => {
      const nextColumns = [...columns];
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      };
      return { columns: nextColumns };
    });
  };
  render() {
    const columns = this.state.columns.map((col, index) => ({
      ...col,
      onHeaderCell: column => ({
        width: column.width,
        onResize: this.handleResize(index),
      }),
    }));
    return (
       <div  className = "datadiv" id = "myDIV">
       <img className = "img1" id = "img1" src={this.state.imgurl} alt = "Ela"/>
       <Table className="table1" id = "table1"  components={this.components} columns={columns} data={this.state.data}   />

       </div>
    );
  }
}
class ImageFrogery extends Component {
  render() {
    return (
      <div >
      <Header />
      <Detect />
      <ShowImage />
      <ShowData />
      </div>
    );
  }
}
export default ImageFrogery;
