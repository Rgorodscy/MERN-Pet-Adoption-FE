import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBar({ setSearchClicked, setShowOffCanvas }) {
  const [advancedSearch, setAdvancedSearch] = useState(false);
  const [searchObject, setSearchObject] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchObject({ ...searchObject, [e.target.name]: e.target.value });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(searchObject);
    navigate(`/search?${queryParams.toString()}`);
    setSearchClicked(false);
    setShowOffCanvas(false);
  };

  const formGroupClassList = "d-flex align-items-baseline my-2";
  const floatLabelClassList = "w-100 mx-1";

  return (
    <div className="modal-style">
      <Form onSubmit={handleSearch} className="d-flex flex-column text-center">
        <h1>Search your Pet</h1>
        <div className="toggle-container-style d-flex mb-2">
          <Button className="w-50 toggle-style text-nowrap" disabled={!advancedSearch} onClick={() => setAdvancedSearch(!advancedSearch)}>Basic Search</Button>
          <Button className="w-50 toggle-style text-nowrap" disabled={advancedSearch} onClick={() => setAdvancedSearch(!advancedSearch)}>Full Search</Button>
        </div>
        <Form.Group className={formGroupClassList}>
          <FloatingLabel label="Type" className={floatLabelClassList}>
            <Form.Select
              defaultValue={0}
              onChange={handleChange}
              name="type"
              placeholder="Type"
              className="input-style"
            >
              <option value={0} disabled>
                Select...
              </option>
              <option value={"Dog"}>Dog</option>
              <option value={"Cat"}>Cat</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        {advancedSearch && (
          <>
            <Form.Group className={formGroupClassList}>
              <FloatingLabel
                label="Adoption Status"
                className={floatLabelClassList}
              >
                <Form.Select
                  defaultValue={0}
                  onChange={handleChange}
                  name="adoptionStatus"
                  className="input-style"
                >
                  <option value={0} disabled={true}>
                    Select...
                  </option>
                  <option value={"Available"}>Available</option>
                  <option value={"Fostered"}>Fostered</option>
                  <option value={"Adopted"}>Adopted</option>
                </Form.Select>
              </FloatingLabel>
            </Form.Group>
            <div className="d-flex flex-row">
              <Form.Group className={formGroupClassList}>
                <FloatingLabel
                  label="Min Height"
                  className={floatLabelClassList}
                >
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="minHeight"
                    placeholder="Min Height"
                    className="input-style"
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className={formGroupClassList}>
                <FloatingLabel
                  label="Max Height"
                  className={floatLabelClassList}
                >
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="maxHeight"
                    placeholder="Max Height"
                    className="input-style"
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
            </div>
            <div className="d-flex flex-row">
              <Form.Group className={formGroupClassList}>
                <FloatingLabel
                  label="Min Weight"
                  className={floatLabelClassList}
                >
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="minWeight"
                    placeholder="Min Weight"
                    className="input-style"
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
              <Form.Group className={formGroupClassList}>
                <FloatingLabel
                  label="Max Weight"
                  className={floatLabelClassList}
                >
                  <Form.Control
                    type="text"
                    onChange={handleChange}
                    name="maxWeight"
                    placeholder="Max Weight"
                    className="input-style"
                  ></Form.Control>
                </FloatingLabel>
              </Form.Group>
            </div>
            <Form.Group className={formGroupClassList}>
              <FloatingLabel label="Name" className={floatLabelClassList}>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                  name="name"
                  placeholder="Name"
                  className="input-style"
                ></Form.Control>
              </FloatingLabel>
            </Form.Group>
          </>
        )}
        <Button type="submit" className="mt-2 button-style">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchBar;
