import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function PagesOffCanvas({
  showOffCanvas,
  setShowOffCanvas,
  searchClicked,
  setSearchClicked,
}) {
  const { adminUser } = useAuth();
  const navigate = useNavigate();

  const handleClose = () => setShowOffCanvas(false);

  const pageNavigate = (route) => {
    navigate(route);
    handleClose();
  };

  return (
    <>
      <Offcanvas show={showOffCanvas} onHide={handleClose}>
        <Offcanvas.Header className="modal-style">
          <Offcanvas.Title>Pages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className=" modal-style">
          <div className="d-flex flex-column">
            <Button
              className="btn-info mb-2 button-style"
              variant="info"
              onClick={() => setSearchClicked(!searchClicked)}
            >
              Search
            </Button>
            <Button
              className="btn-info mb-2 button-style"
              onClick={() => pageNavigate("/mypets")}
            >
              My Pets
            </Button>
            <Button
              className="btn-info mb-2 button-style"
              onClick={() => pageNavigate("/myprofile")}
            >
              Profile
            </Button>
            {adminUser === true && (
              <Button
                className="btn-info mb-2 button-style"
                onClick={() => pageNavigate("/dashboard")}
              >
                Dashboard
              </Button>
            )}
            {adminUser === true && (
              <Button
                className="btn-info mb-2 button-style"
                onClick={() => pageNavigate("/petadd")}
              >
                Add a Pet
              </Button>
            )}
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default PagesOffCanvas;
