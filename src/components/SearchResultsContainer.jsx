import React from "react";
import { Col } from "react-bootstrap";
import PetCard from "./PetCard";

function SearchResultsContainer({ searchResults }) {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        {searchResults.map((pet) => (
          <Col xs={6} sm={4} md={3} className="m-2">
            <PetCard key={pet.id} pet={pet} />
          </Col>
        ))}
      </div>
    </div>
  );
}

export default SearchResultsContainer;
