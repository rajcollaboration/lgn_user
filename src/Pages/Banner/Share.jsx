import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import Sidebar from './SideBar'

const Share = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='main-content'>
   <Sidebar/>
   <div className="content_area">
      <div className="row">
         <Button variant="primary" onClick={handleShow}>
         Open Modal
         </Button>
         <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
               <Modal.Title>Modal Title</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ color: 'red', important: 'true' }}>
               This is the body of the modal.
            </Modal.Body>
            <Modal.Footer>
               <Button variant="secondary" onClick={handleClose}>
               Close
               </Button>
               <Button variant="primary" onClick={handleClose}>
               Save Changes
               </Button>
            </Modal.Footer>
         </Modal>
      </div>
   </div>
</div>

  );
};

export default Share
