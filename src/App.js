import React from 'react';
import './App.css';
import { Row, Col, Button } from 'react-bootstrap'
import Amplify, { Auth, Analytics, AWSKinesisProvider } from 'aws-amplify';
import awsconfig from './aws-exports';
import { withAuthenticator } from 'aws-amplify-react';
Amplify.configure(awsconfig);
Analytics.addPluggable(new AWSKinesisProvider());

Analytics.configure({
  AWSKinesis: {

      // OPTIONAL -  Amazon Kinesis service region
      region: 'us-west-2',
      
      // OPTIONAL - The buffer size for events in number of items.
      bufferSize: 1000,
      
      // OPTIONAL - The number of events to be deleted from the buffer when flushed.
      flushSize: 100,
      
      // OPTIONAL - The interval in milliseconds to perform a buffer check and flush if necessary.
      flushInterval: 5000, // 5s
      
      // OPTIONAL - The limit for failed recording retries.
      resendLimit: 5
  } 
});

class App extends React.Component {

  constructor(props) {
    super(props)
    this.putrecord = this.putrecord.bind(this);
    this.userLogInAction = this.userLogInAction.bind(this);
    this.userRegisterAction = this.userRegisterAction.bind(this);
    this.userCoreAction = this.userCoreAction.bind(this);
  }

  userLogInAction() {
    this.putrecord("logIn")

  }

  userRegisterAction() {
    this.putrecord("register")
  }
  userCoreAction() {
    this.putrecord("coreAction")
  }

  putrecord(action) {
    Auth.currentAuthenticatedUser({
      bypassCache: false  // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
    }).then(user => { 
      console.log(user)
    //use amplify put record to send record to kinesis
    let data  = { 
      user: user.username,
      action: action,
      date: new Date()
   }
    Analytics.record({
      data: data,
      streamName: 'anzwebinar'
  }, 'AWSKinesis');
    })
    .catch(err => console.log(err));

  }

  render() {
    return (
      <div className="App">
        <br />
        <Row>
          <Col lg={4}>
        <Button onClick={this.userLogInAction}>User Log In</Button>
        </Col>
        <Col lg={4}>
        <Button onClick={this.userRegisterAction}>User Register</Button>
        </Col>
        <Col lg={4}>
        <Button onClick={this.userCoreAction}>User took Core Action</Button>
        </Col>
        </Row>
      </div>
    );
  }
}

export default withAuthenticator(App, true);
