import React, { useState } from "react";
import { Button, Nav, Modal, CloseButton, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PagesOffCanvas from "./PagesOffCanvas";
import SearchBar from "./SearchBar";
import { modalBgColor } from "./libs";

function Navbar() {
  const navigate = useNavigate();
  const { setShowLoginModal, currentUser, setCurrentUser, setToken } =
    useAuth();
  const [searchClicked, setSearchClicked] = useState(false);
  const [showOffCanvas, setShowOffCanvas] = useState(false);

  const handleLoginLogout = (e) => {
    if (!currentUser) {
      e.preventDefault();
      navigate("/");
      setShowLoginModal(true);
    }
    if (currentUser) {
      setCurrentUser();
      setToken();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/");
      setShowLoginModal(false);
    }
  };

  return (
    <Nav className="d-flex flex-column px-5 py-2 bg-info sticky-top shadow">
      <div className="d-flex flex-row justify-content-between">
        {currentUser && (
          <Button
            className="me-1 p-2 justify-self-center"
            variant="info"
            onClick={() => setShowOffCanvas(true)}
          >
            Pages
          </Button>
        )}
        {!currentUser && (
          <Button
            className="me-1 p-2 justify-self-center"
            variant="info"
            onClick={() => setSearchClicked(!searchClicked)}
          >
            Search
          </Button>
        )}
        <div
          className="d-flex flex-row align-items-center"
          onClick={() => navigate("/")}
          role="button"
        >
          <Image
            src="https://res.cloudinary.com/dyur3xjlc/image/upload/v1675608162/pet_image-removebg-preview_gq9f0q.png"
            height="40px"
            rounded
            className="me-3"
          />
          <h3 className="me-3">Pet Center</h3>
        </div>
        <Button
          className="font-weight-bold p-2"
          onClick={handleLoginLogout}
          variant="info"
          type="submit"
        >
          {currentUser ? "Logout" : "Login"}
        </Button>
      </div>

      <Modal
        show={searchClicked}
        onHide={() => setSearchClicked(false)}
        dialogClassName
      >
        <div
          className="d-flex flex-column align-items-center p-3 rounded"
          style={modalBgColor}
        >
          <CloseButton
            onClick={() => setSearchClicked(!searchClicked)}
            className="align-self-end"
          />
          <SearchBar
            setSearchClicked={setSearchClicked}
            setShowOffCanvas={setShowOffCanvas}
          />
        </div>
      </Modal>

      <PagesOffCanvas
        showOffCanvas={showOffCanvas}
        setShowOffCanvas={setShowOffCanvas}
        setSearchClicked={setSearchClicked}
        searchClicked={searchClicked}
        style={modalBgColor}
      />
    </Nav>
  );
}

export default Navbar;
