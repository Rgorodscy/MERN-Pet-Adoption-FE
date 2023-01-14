import React from "react";
import { Col } from "react-bootstrap";
import PetCard from "./PetCard";

function SearchResultsContainer({ searchResults }) {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {searchResults.map((pet) => (
          <Col
            xs={{ span: 6 }}
            sm={{ span: 4 }}
            md={{ span: 3 }}
            className="m-2"
          >
            <PetCard key={pet.id} pet={pet} />
          </Col>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsContainer;
