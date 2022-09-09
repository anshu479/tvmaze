import React from "react";

function Shows(props) {
  let { data } = props;
  console.log(data);
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
          src={ele?.show?.image?.medium}
          className="card-img-top"
          alt="Not available"
        ></img>
        <div className="card-body">
          <p className="card-text">
            <strong>{ele?.show?.name}</strong> ⭐{" "}
            {ele?.show?.rating?.average || "0.0"}
          </p>
          <p>
            {ele?.show?.type}, {ele?.show?.language},{" "}
            {ele?.show?.genres.map((e) => {
              return <span>{e} </span>;
            })}
          </p>
          <a
            className="btn btn-outline-dark"
            href={ele?.show?.url}
            role="button"
          >
            Link
          </a>
        </div>
      </div>
    );
  });
}

export default Shows;
