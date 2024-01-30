import React,{useEffect} from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate} from "react-router";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddTaskModal = (props) => {
  const navigate = useNavigate();
  let session = document.cookie.match(/user_name=([^;]*)/);
  useEffect(() => {
    async function fetchData() {
      if (session===null){
        console.log(session);
        navigate("/");
      }
    }
    fetchData();
  },[]);

  let user_name=document.cookie.match(/user_name=([^;]*)/)[1];
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/${user_name}/${props.board_id}/addtask`, {
        task_name: e.target.task_name.value,
        task_desc: e.target.task_desc.value

      })
      .then((response) => response.data)
      .then(
        (result) => {
          toast.success("Successfully added board");
          props.setupdated(true);
          props.onHide();
        },
        (error) => {
          toast.error("Unsuccessful in adding board");
        }
      );
  };

  return (
    <div className="Container" id="modal">
      <Modal {...props} className="title">
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="w-100 m-0">Add Task</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center w-100">
          <Row className="d-flex justify-content-center">
            <Col sm={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="task_name">
                  <Form.Label className="fs-6 w-100 mt-4 text-center">
                    Task Name
                  </Form.Label>
                  <div className="board_name_div">
                    <Form.Control
                      type="text"
                      name="task_name"
                      required
                      placeholder=""
                    />
                  </div>
                </Form.Group>
                <Form.Group controlId="task_desc">
                  <Form.Label className="fs-6 w-100 mt-4 text-center">
                    Task Description
                  </Form.Label>
                  <div className="board_name_div">
                    <Form.Control
                      type="textarea"
                      name="task_desc"
                      required
                      placeholder=""
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <p className="mt-5 w-100 text-center">
                    <Button id="btn-modal" variant="default" type="submit">
                      Submit
                    </Button>
                  </p>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </div>
  );
};
export default AddTaskModal;