import React from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import "./Boardview.css";

const TaskShowModal = (props) => {
  return (
    <div className="Container taskshowmodal-body">
      <Modal
        {...props}
        onHide={props.onHide}
        className="text-center taskshowmodal"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="w-100 m-0 text-center">Task details</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center w-100 bg-white">
          <Row className="d-flex justify-content-center">
            <Row className="my-2">
            <Col sm={6}>
              <label htmlFor="task_id">Task ID:</label>
              <p id="task_id">{props.ele.task_id}</p>
            </Col>
            <Col sm={6}>
              <label htmlFor="task_name">Task Name:</label>
              <p id="task_name">{props.ele.task_name}</p>
            </Col>
            </Row>
            
            <Row className="my-3">
            <Col sm={12}>
            <label htmlFor="task_desc">Task Description:</label>
              <p id="task_desc">{props.ele.task_desc}</p>
            </Col>
            </Row>
            
            <Row className="my-3">
            <Col sm={12}>
            <label htmlFor="time_stamp">Task Created:</label>
              <p id="time_stamp">{props.ele.time_stamp}</p>
            </Col>
            </Row>

            <Row className="my-3">
            <Col sm={12}>
            <label htmlFor="assigned_to">Task Assignee:</label>
              <p id="assigned_to">{props.ele.assigned_to}</p>
            </Col>
            </Row>

          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};

export default TaskShowModal;
