import React from "react";

function FooterComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <div className="d-flex mt-1  px-5 py-2 justify-content-between shadow navbar-style">
      <div>App developed using React, Express, NodeJs and MongoDB</div>
      <div>Copyright {currentYear}</div>
    </div>
  );
}

export default FooterComponent;
