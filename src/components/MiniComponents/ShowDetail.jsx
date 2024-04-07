import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const ShowDetail = () => {
  const { id } = useParams();
  const [show, setShow] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    row: "",
    seat: "",
    date: "",
  });

  useEffect(() => {
    const fetchShowSummary = async () => {
      try {
        const response = await fetch(`https://api.tvmaze.com/shows/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setShow(data);
      } catch (error) {
        console.error("Error fetching show summary:", error);
      }
    };

    fetchShowSummary();
  }, [id]);

  const handleBookTicket = () => {
    console.log("Form Data:", formData);
    setFormData({ name: "", email: "", row: "", seat: "", date: "" });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      {show && (
        <div className="container">
          <h2 className="d-flex justify-content-center mt-5 font-weight-bold h1">
            {show.name}
          </h2>
          <p className="p-1 font-weight-bold h2">{show.summary}</p>
          <form className="mt-5 form-group ">
            <h1>Book your ticket</h1>
            <div className="form-row mt-2">
              <div className=" form-group col">
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className=" form-group col mt-2">
                <label>
                  Email:
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="mt-2">
                <div className="form-group col-md-6">
                  <label htmlFor="inputCity">Row:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="inputCity"
                    name="row"
                    value={formData.row}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group col-md-4 mt-2">
                  <label htmlFor="inputState">Seat Number:</label>
                  <select
                    id="inputState"
                    className="form-control"
                    name="seat"
                    value={formData.seat}
                    onChange={handleChange}
                  >
                    <option value="">Choose...</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                  </select>
                </div>
                <div className="form-group col-md-2 mt-2">
                  <label htmlFor="inputZip">Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    id="inputZip"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
          </form>
          <button onClick={handleBookTicket} className="btn btn-secondary mt-3">
            Book Ticket
          </button>
          <Link to="/" className="d-flex justify-content-center mt-4">
            <button className="p-2 btn btn-primary shadow">Go Back</button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShowDetail;
