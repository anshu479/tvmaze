import React, { useEffect, useState } from "react";
import Actor from "./Actor";
import Shows from "./Shows";
import axios from "axios";
import "./App.css";

function App() {
  let [dataActor, setDataActor] = useState([]);
  let [dataShows, setDataShows] = useState([]);

  let [radio, setRadio] = useState("");
  let [input, setInput] = useState("");

  useEffect(() => {
    if (radio === "actor") {
      console.log("actor api called");
      axios
        .get(`https://api.tvmaze.com/search/people?q=${input}`)
        .then((response) => setDataActor(response.data));
    } else {
      console.log("shows api called");
      axios
        .get(`https://api.tvmaze.com/search/shows?q=${input}`)
        .then((response) => setDataShows(response.data));
    }
  }, [input]);

  function updateRadio(event) {
    setRadio((radio = event.target.value));
    setDataActor((prevState, prevProp) => (prevState = []));
    setDataShows((prevState, prevProp) => (prevState = []));
    setInput((prevState, prevProp) => (prevState = ""));
    console.log(radio);
  }

  return (
    <div className="App container">
      <div className="main">
        <h1 style={{ color: "white" }}>TVmaze</h1>
        <h3 style={{ color: "white" }}>Search your favourite shows </h3>
        <br></br>
        <form>
          <div style={{ padding: "10px", color: "white" }}>
            <input
              style={{ margin: "10px" }}
              className="form-check-input"
              onChange={updateRadio}
              name="tv"
              type="radio"
              value="actor"
            ></input>
            <label style={{ fontSize: "20px" }}>Actor</label>
            <input
              style={{ margin: "10px" }}
              className="form-check-input"
              onChange={updateRadio}
              name="tv"
              type="radio"
              value="shows"
            ></input>
            <label style={{ fontSize: "20px" }}>Shows</label>
          </div>
          <p></p>
          <div style={{ margin: "20px" }}>
            <input
              className="form-control w-50 mx-auto"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              type="text"
            ></input>
          </div>
        </form>
      </div>
      {radio === "actor" ? (
        <Actor data={dataActor}></Actor>
      ) : (
        <Shows data={dataShows}></Shows>
      )}
    </div>
  );
}

export default App;
