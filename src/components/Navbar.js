import React, { useState } from "react";
import { Button, Nav, Modal, CloseButton, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import PagesOffCanvas from "./PagesOffCanvas";
import SearchBar from "./SearchBar";

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
    <Nav className="d-flex flex-column px-5 py-2 sticky-top shadow navbar-style">
      <div className="d-flex flex-row justify-content-between">
        {currentUser && (
          <Button
            className="me-1 p-2 justify-self-center navbar-button-style"
            onClick={() => setShowOffCanvas(true)}
          >
            Pages
          </Button>
        )}
        {!currentUser && (
          <Button
            className="me-1 p-2 justify-self-center navbar-button-style"
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
            src="https://res.cloudinary.com/dyur3xjlc/image/upload/v1675772370/imgonline-com-ua-ReplaceColor-hYaHrcIxz2ThpC2-removebg-preview-modified_r5lmn0.png"
            height="40px"
            rounded
            className="me-3"
          />
          <h3 className="me-3">Pet Center</h3>
        </div>
        <Button
          className="font-weight-bold p-2 navbar-button-style"
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
        <div className="d-flex flex-column align-items-center p-3 rounded modal-style">
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
        className="modal-style"
      />
    </Nav>
  );
}

export default Navbar;
