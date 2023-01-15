import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import SearchResultsContainer from "../components/SearchResultsContainer";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const { serverUrl, setToastMessage, setShowNotificationToast } = useAuth();
  const search = useLocation().search;
  const queryParams = new URLSearchParams(search);
  const type = queryParams.get("type");
  const adoptionStatus = queryParams.get("adoptionStatus");
  const minHeight = queryParams.get("minHeight");
  const maxHeight = queryParams.get("maxHeight");
  const minWeight = queryParams.get("minWeight");
  const maxWeight = queryParams.get("maxWeight");
  const name = queryParams.get("name");
  const searchObject = {
    type: type,
    adoptionStatus: adoptionStatus,
    minHeight: minHeight,
    maxHeight: maxHeight,
    minWeight: minWeight,
    maxWeight: maxWeight,
    name: name,
  };

  useEffect(() => {
    handleSearch();
  }, [search]);

  const handleSearch = async () => {
    try {
      const searchResponse = await axios.get(`${serverUrl}/pet/`, {
        params: searchObject,
        headers: { withCredentials: true },
      });
      setSearchResults(searchResponse.data);
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
    <div className="text-secondary mt-3">
      <h1>Pets Found:</h1>
      {!searchResults[0] && <Spinner className="mt-5" />}
      <SearchResultsContainer searchResults={searchResults} />
    </div>
  );
}

export default Search;
