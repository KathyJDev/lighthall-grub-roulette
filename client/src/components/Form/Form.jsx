/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Select from "react-select";
import { cuisineOptions } from "../../Utils/select-options";
import { priceOptions } from "../../Utils/select-options";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { setYelpUrl } from "../../Services/api.service";
import axios from "axios";
import { useNavigate, createSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

const FormComponent = (props) => {
  const { data, setData } = props;
  const { location, price, cuisine } = data;
  const navigate = useNavigate();

  const getYelpData = async (dataObject) => {
    const { location, price, cuisine } = dataObject;
    const url = setYelpUrl(location, price, cuisine);
    console.log(url);

    try {
      const { data } = await axios.get(url);
      console.log(data);
      navigate({
        pathname: "game",
        search: createSearchParams({
          location,
          price,
          cuisine,
        }).toString(),
      });
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={10}>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              getYelpData(data);
            }}
          >
            <Form.Group className="mb-3" controlId="formlocation">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Location"
                name="location"
                autoComplete="off"
                value={location}
                onChange={(e) =>
                  setData({
                    ...data,
                    location: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Row>
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formprice">
                  <Form.Label>Price</Form.Label>
                  <Select
                    options={priceOptions}
                    defaultValue={priceOptions[0]}
                    name="price"
                    onChange={(e) =>
                      setData({
                        ...data,
                        price: e.value,
                      })
                    }
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
              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formcuisine">
                  <Form.Label>Cuisine</Form.Label>
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
            </Row>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FormComponent;
