import React, { useEffect, useState } from "react";
import Actor from "./Actor";
import Shows from "./Shows";
import axios from "axios";
import "./App.css";

function App() {
  let [dataActor, setDataActor] = useState([]);
  let [dataShows, setDataShows] = useState([]);
  let [actorShowData, setActorShowData] = useState([]);
  let [noData, setNoData] = useState("");

  let [radio, setRadio] = useState("");
  let [input, setInput] = useState("");

  useEffect(() => {
    if (radio === "actor") {
      console.log("actor api called");
      let id = setTimeout(() => {
        axios
          .get(`https://api.tvmaze.com/search/people?q=${input}`)
          .then((response) => setDataActor(response.data));
      }, 500);

      return () => {
        clearTimeout(id);
      };
    } else {
      if (input !== "") {
        console.log("shows api called");
        let id = setTimeout(() => {
          axios
            .get(`https://api.tvmaze.com/search/shows?q=${input}`)
            .then((response) => setDataShows(response.data));
        }, 500);

        return () => {
          clearTimeout(id);
        };
      }
    }
  }, [input]);

  useEffect(() => {
    if (dataActor.length !== 0) {
      console.log(dataActor[0]?.person?.id, dataActor[0]?.person?.name);
      if (input === "") {
        setActorShowData([]);
      } else
        axios
          .get(
            `https://api.tvmaze.com/people/${dataActor[0]?.person?.id}/castcredits?embed=show`
          )
          .then((response) =>
            setActorShowData(
              (prevState, prevProp) => (prevState = response.data)
            )
          );
      // console.log("actor show data", actorShowData);
    }
  }, [dataActor, input]);

  // let timerName;
  // const onSearch = (e) => {
  //   console.log("onSearcch", e.target.value);
  //   clearTimeout(timerName);

  //   timerName = setTimeout(() => {
  //     var string = e.target.value;

  //     setInput(string);
  //   }, 300);
  // };

  function updateRadio(event) {
    setRadio((radio = event.target.value));
    setDataActor((prevState, prevProp) => (prevState = []));
    setDataShows((prevState, prevProp) => (prevState = []));
    setInput((prevState, prevProp) => (prevState = ""));
    setActorShowData((prevState, prevProp) => (prevState = ""));
    setNoData((prevState, prevProp) => (prevState = ""));
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
              onBlur={() => {
                setNoData("NO SHOWS AVAILABLE");
              }}
              onChange={(e) => {
                setInput(e.target.value);
                // setInput(e.target.value);
                setNoData("NO SHOWS AVAILABLE");
              }}
              type="text"
            ></input>
          </div>
        </form>
      </div>
      {console.log("actor show data", actorShowData, "data show", dataShows)}
      {radio === "actor" ? (
        actorShowData.length !== 0 ? (
          <Actor data={actorShowData}></Actor>
        ) : (
          <h3 style={{ color: "red" }}>{noData}</h3>
        )
      ) : dataShows.length !== 0 ? (
        <Shows data={dataShows}></Shows>
      ) : (
        <h3 style={{ color: "red" }}>{noData}</h3>
      )}
    </div>
  );
}

export default App;
