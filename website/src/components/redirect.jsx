import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Redirect = () => {
  const navigate = useNavigate();
  const params = new URLSearchParams(window.location.search);
  const queryParam = params.get("code");
  console.log("query: ", queryParam);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Check if the access_token is already in local storage
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      // If it exists, you can navigate to the home page immediately
      navigate("/");
    } else {
      // Append the queryParam as a URL parameter
      const url = `https://google-square-4zxc4m7upa-el.a.run.app/token/get?code=${queryParam}`;

      // Send a POST request to the specified endpoint with the code as a query parameter
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Log the result from the fetch
          console.log("Fetch result:", data);

          // Store the access_token in local storage
          const accessToken = data.access_token;
          if (accessToken) {
            localStorage.setItem("access_token", accessToken);
          }

          // Wait for 0 seconds before redirecting to /home
          setTimeout(() => {
            navigate("/");
          }, 0);
        })
        .catch((error) => {
          console.error("Error sending POST request:", error);
          setError(error); // Set the error state
          // Handle errors as needed
        });
    }
  }, [queryParam]);

  return (
    <div>
      <h1>{queryParam}</h1>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

export default Redirect;
