import React from "react";
import "./App.css";
import DataFetch from "./components/DataFetch/DataFetch";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShowDetail from "./components/MiniComponents/ShowDetail";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<DataFetch />} />
        <Route path="/show/:id" exact element={<ShowDetail />} />
      </Routes>
    </Router>
  );
};

export default App;
