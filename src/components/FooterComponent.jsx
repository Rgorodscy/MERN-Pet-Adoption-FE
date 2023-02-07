import React from 'react'

function FooterComponent() {
  const currentYear = Date()
  
    return (
    <div className="d-flex flex-column px-5 py-2 sticky-top shadow navbar-style">
        <div>
        App developed using React, Express, NodeJs and MongoDB
        </div>
        <div>
            Copyright {currentYear}
        </div>
    </div>
  )
}

export default FooterComponent