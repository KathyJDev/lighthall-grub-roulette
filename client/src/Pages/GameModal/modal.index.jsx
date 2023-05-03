import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Select from "react-select";
import Form from "react-bootstrap/Form";
import { cuisineOptions } from "../../Utils/select-options";

const GameModal = () => {

  const [show, setShow] = useState(true);

  const handleClick = () => setShow(false);

  // navigate({
  //   pathname: "game",
  //   search: createSearchParams({
  //     location,
  //     price,
  //     cuisine,
  //   }).toString(),
  // });

  return (
    <Modal show={show}>
      <Modal.Header>
        <Modal.Title>Welcome to Grub Roulette</Modal.Title>
      </Modal.Header>
      <Modal.Body>You've been invited by ...</Modal.Body>
      <Col sm={6} style={{ marginLeft: "50px" }}>
        <Form.Group className="mb-3" controlId="formcuisine">
          <Form.Label>Select Cuisine</Form.Label>
          <Select
            options={cuisineOptions}
            defaultValue={cuisineOptions[0]}
            onChange={(e) => {
              setData({
                ...data,
                cuisine: e.value,
              });
            }}
            theme={(theme) => ({
              ...theme,
              borderRadius: 0,
              colors: {
                ...theme.colors,
                primary25: "hotpink",
                primary: "black",
              },
            })}
          />
        </Form.Group>
      </Col>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClick}>
          Start
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default GameModal