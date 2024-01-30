import React, { useEffect } from "react";
import { Modal, Col, Row, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast , ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const AddBoardModal = (props) => {
  const navigate = useNavigate();
  let session = document.cookie.match(/user_name=([^;]*)/);

  useEffect(() => {
    async function fetchData() {
      if (session === null) {
        console.log(session);
        navigate("/");
      }
    }
    fetchData();
  }, []);

  let user_name = document.cookie.match(/user_name=([^;]*)/)[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://127.0.0.1:8000/${user_name}/addboard`, {
        board_name: e.target.board_name.value,
      })
      .then((response) => response.data)
      .then(
        (result) => {
          toast.success("Successfully added board");
          props.setupdated(true);

          // Close the modal after successful submission
          props.onHide();
        },
        (error) => {
          toast.error("Unsuccessful in adding board");
        }
      );
  };

  return (
    <div className="Container" id="modal">
      <Modal {...props} onHide={props.onHide} className="title">
        <Modal.Header closeButton>
          <Modal.Title>
            <p className="w-100 m-0">Add Board</p>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-center w-100">
          <Row className="d-flex justify-content-center">
            <Col sm={12}>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="board_name">
                  <Form.Label className="fs-6 w-100 text-center">
                    Board Name
                  </Form.Label>
                  <div className="board_name_div">
                    <Form.Control
                      type="text"
                      name="board_name"
                      required
                      placeholder=""
                    />
                  </div>
                </Form.Group>
                <Form.Group>
                  <p className="mt-4 w-100 text-center">
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

export default AddBoardModal;