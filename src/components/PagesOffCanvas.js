import React from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { modalBgColor, buttonStyle } from "./libs";

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
        <Offcanvas.Header style={modalBgColor}>
          <Offcanvas.Title>Pages</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body style={modalBgColor}>
          <div className="d-flex flex-column">
            <Button
              className="btn-info mb-2"
              variant="info"
              onClick={() => setSearchClicked(!searchClicked)}
              style={buttonStyle}
            >
              Search
            </Button>
            <Button
              className="btn-info mb-2"
              onClick={() => pageNavigate("/mypets")}
              style={buttonStyle}
            >
              My Pets
            </Button>
            <Button
              className="btn-info mb-2"
              onClick={() => pageNavigate("/myprofile")}
              style={buttonStyle}
            >
              Profile
            </Button>
            {adminUser === true && (
              <Button
                className="btn-info mb-2"
                onClick={() => pageNavigate("/dashboard")}
                style={buttonStyle}
              >
                Dashboard
              </Button>
            )}
            {adminUser === true && (
              <Button
                className="btn-info mb-2"
                onClick={() => pageNavigate("/petadd")}
                style={buttonStyle}
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
