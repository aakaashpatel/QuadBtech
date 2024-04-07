import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";

const DataFetch = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.tvmaze.com/search/shows?q=all"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShows(data);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card-body">
          <h2 className="heading">TV Shows</h2>
          <div className="card">
            <ul>
              {shows.map((show) => (
                <li key={show.show.id} className="show-item">
                  {show.show.image ? (
                    <img src={show.show.image.original} alt={show.show.name} />
                  ) : (
                    <img src="/download.jpg" />
                  )}
                  <div className="show-details p-2">
                    <h3>{show.show.name}</h3>
                    <p>Type: {show.show.type}</p>
                    <p>Language: {show.show.language}</p>
                    <p>
                      Network:{" "}
                      {show.show.network ? show.show.network.name : "N/A"}
                    </p>
                    <p>
                      Rating:
                      {show.show.rating ? show.show.rating.average : "N/A"}
                      <CiStar className="star" />
                    </p>
                    <p>
                      Schedule:{" "}
                      {show.show.schedule
                        ? `${show.show.schedule.days.join(", ")} at ${
                            show.show.schedule.time
                          }`
                        : "N/A"}
                    </p>
                    {/* Corrected Link usage */}
                    <Link to={`/show/${show.show.id}`}>
                      <button>View Summary</button>
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataFetch;
