import React, { useState, useEffect } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PetEditForm() {
  const { serverUrl, token, setShowNotificationToast, setToastMessage } =
    useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const formGroupClass =
    "d-flex align-items-baseline justify-content-between mb-2";
  const formLabelClass = "me-3 text-nowrap";
  const formInputClass = "w-100";
  const floatLabelClassList = "w-100";
  const [validated, setValidated] = useState(false);
  const [image, setImage] = useState();
  const [petData, setPetData] = useState([]);
  const [newPet, setNewPet] = useState(petData);

  useEffect(() => {
    initialFetch();
  }, []);

  const initialFetch = async () => {
    const petId = id.slice(1);
    try {
      const petFound = await axios.get(`${serverUrl}/pet/${petId}`, {
        headers: { authorization: `Bearer ${token}`, withCredentials: true },
      });
      setPetData(petFound.data[0]);
    } catch (err) {
      console.log(err);
      const errorMessage =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.statusText;
      setToastMessage({
        variant: "Danger",
        messageType: "Error",
        message: errorMessage,
      });
      setShowNotificationToast(true);
    }
  };

  console.log(newPet);

  const handleChange = (e) => {
    setNewPet({ ...petData, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);

    const editPet = {
      ...newPet,
      hypoallergenic: Boolean(newPet.hypoallergenic),
      height: Number(newPet.height),
      weight: Number(newPet.weight),
    };

    const petFormData = new FormData();
    petFormData.append("image", image);
    for (let key in editPet) {
      petFormData.append(key, editPet[key]);
    }

    putPet(petFormData);
  };

  const putPet = async (petFormData) => {
    try {
      const res = await axios.put(
        `${serverUrl}/pet/${petData.id}`,
        petFormData,
        { headers: { authorization: `Bearer ${token}`, withCredentials: true } }
      );
      if (res) {
        navigate("/dashboard");
        setToastMessage({
          variant: "Info",
          messageType: "Success",
          message: "Pet updated successfully!",
        });
        setShowNotificationToast(true);
      }
    } catch (err) {
      console.log(err);
      const errorMessage =
        typeof err.response.data === "string"
          ? err.response.data
          : err.response.statusText;
      setToastMessage({
        variant: "Danger",
        messageType: "Error",
        message: errorMessage,
      });
      setShowNotificationToast(true);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h1>Edit {petData.name}'s info</h1>
      <Form
        className="w-50"
        onSubmit={handleEdit}
        noValidate
        validated={validated}
      >
        <div className="d-flex flex-row justify-content-between">
          <Form.Group className="mb-2 w-50 me-1">
            <FloatingLabel className={floatLabelClassList} label="Type">
              <Form.Select
                className={formInputClass}
                defaultValue={petData.type}
                onChange={handleChange}
                name="type"
                required
              >
                <option disabled={true}>Select...</option>
                <option value={"Dog"}>Dog</option>
                <option value={"Cat"}>Cat</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-2 w-50 ms-1">
            <FloatingLabel
              className={floatLabelClassList}
              label="Adoption Status"
            >
              <Form.Select
                className={formInputClass}
                onChange={handleChange}
                name="adoptionStatus"
                defaultValue={petData.adoptionStatus}
                required
              >
                <option disabled={true}>Select...</option>
                <option value={"Available"}>Available</option>
                <option value={"Fostered"}>Fostered</option>
                <option value={"Adopted"}>Adopted</option>
              </Form.Select>
            </FloatingLabel>
          </Form.Group>
        </div>
        <Form.Group className={formGroupClass}>
          <FloatingLabel className={floatLabelClassList} label="Name">
            <Form.Control
              className={formInputClass}
              type="text"
              onChange={handleChange}
              name="name"
              defaultValue={petData.name}
              required
              placeholder="Name"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClass}>
          <Form.Label className={formLabelClass}>Image</Form.Label>
          <Form.Control
            className={formInputClass}
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            name="image"
            defaultValue={petData.image}
            required
          ></Form.Control>
        </Form.Group>
        <div className="d-flex flex-row justify-content-between">
          <Form.Group className="mb-2 w-25 me-1">
            <FloatingLabel className={floatLabelClassList} label="Height">
              <Form.Control
                className={formInputClass}
                type="number"
                onChange={handleChange}
                name="height"
                defaultValue={petData.height}
                required
                placeholder="Height"
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-2 w-25 ms-1 me-1">
            <FloatingLabel className={floatLabelClassList} label="Weight">
              <Form.Control
                className={formInputClass}
                type="number"
                onChange={handleChange}
                name="weight"
                defaultValue={petData.weight}
                required
                placeholder="Weight"
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-2 w-25 ms-1">
            <FloatingLabel className={floatLabelClassList} label="Color">
              <Form.Control
                className={formInputClass}
                type="text"
                onChange={handleChange}
                name="color"
                defaultValue={petData.color}
                required
                placeholder="Color"
              ></Form.Control>
            </FloatingLabel>
          </Form.Group>
        </div>
        <Form.Group className={formGroupClass}>
          <FloatingLabel className={floatLabelClassList} label="Bio">
            <Form.Control
              className={formInputClass}
              as="textarea"
              onChange={handleChange}
              name="bio"
              defaultValue={petData.bio}
              required
              placeholder="Bio"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClass}>
          <FloatingLabel className={floatLabelClassList} label="Hypoallergenic">
            <Form.Select
              className={formInputClass}
              onChange={handleChange}
              name="hypoallergenic"
              defaultValue={petData.hypoallergenic}
              required
            >
              <option disabled={true}>Select...</option>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </Form.Select>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClass}>
          <FloatingLabel
            className={floatLabelClassList}
            label="Dietary Restrictions"
          >
            <Form.Control
              className={formInputClass}
              type="text"
              onChange={handleChange}
              name="dietary"
              defaultValue={petData.dietary}
              required
              placeholder="Dietary Restrictions"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Form.Group className={formGroupClass}>
          <FloatingLabel className={floatLabelClassList} label="Breed">
            <Form.Control
              className={formInputClass}
              type="text"
              onChange={handleChange}
              name="breed"
              defaultValue={petData.breed}
              required
              placeholder="Breed"
            ></Form.Control>
          </FloatingLabel>
        </Form.Group>
        <Button
          className="mb-2 w-100"
          disabled={!newPet.type}
          type="submit"
          variant="info"
        >
          Edit Pet
        </Button>
      </Form>
    </div>
  );
}

export default PetEditForm;
