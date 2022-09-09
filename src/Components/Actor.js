import React, { useEffect, useState } from "react";
import axios from "axios";

function Actor(props) {
  let [data, setData] = useState([]);
  useEffect(() => {
    console.log("actor api 2 working", props);
    if (props.data.length !== 0) {
      console.log(props?.data[0]?.person?.id, props?.data[0]?.person?.name);
      axios
        .get(
          `https://api.tvmaze.com/people/${props?.data[0]?.person.id}/castcredits?embed=show`
        )
        .then((response) =>
          setData((prevState, prevProp) => (prevState = response.data))
        );
    }

    // return console.log(data);
  }, [props]);

  return data.map((ele) => {
    return (
      <div
        className="card"
        style={{
          width: "18rem",
          display: "inline-flex",
          flexWrap: "wrap",
          margin: "20px",
        }}
      >
        <img
          src={ele?._embedded?.show?.image?.medium}
          className="card-img-top"
          alt="Not available"
        ></img>
        <div className="card-body">
          <p className="card-text">
            <strong>{ele?._embedded?.show?.name}</strong> ⭐{" "}
            {ele?._embedded?.show?.rating?.average || "0.0"}
          </p>
          <p>
            {ele?._embedded?.show?.type}, {ele?._embedded?.show?.language},{" "}
            {ele?._embedded?.show?.genres}
          </p>
          <a
            className="btn btn-outline-dark"
            href={ele?._embedded?.show?.url}
            role="button"
          >
            Link
          </a>
        </div>
      </div>
    );
  });
}
export default Actor;
