import React from 'react';
import Modal from './Modal';
import '../css/help.css'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Accordion from 'react-bootstrap/Accordion';

const Help = () => {
  return (
    <>
          <h1 className='faq-header'>FAQ:</h1>

    <div id="help">
<Accordion defaultActiveKey="0" className='accordian-element'>
      <Accordion.Item eventKey="0">
        <Accordion.Header>Why can't I access the ai recipe page or dashboard?</Accordion.Header>
        <Accordion.Body>
          Login tokens are valid for an hour after a login. If you are keeping the website up for a while, please
          note that you may have to reload the webpage and log back in to regain access to functionality
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="1">
        <Accordion.Header>Why this application?</Accordion.Header>
        <Accordion.Body>
          Many a time have i found myself bashing my head against a wall, wondering what I could make for dinner 
          and I wondered if there would be a way to make that process just that little bit easier.This is my answer 
          to that, Recomeats is the result of my time and energy into engineering a product to make you have an easier 
          time being you. Enjoy!
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
    <div className="help-top">
      <h2>This is a demo application</h2>
        <br />
        <h2>As this is the case, no help is present as of yet</h2>
      </div>
      <div className="help-mid">
        <h2>If you would like to contact me, my details are as follows:</h2>
        <h4>Phone number: 07585413670</h4>
        <h4>Email: anthonymcdonald2001@hotmail.com</h4>
      </div>
    </div>
    </>
  );
};

export default Help;
