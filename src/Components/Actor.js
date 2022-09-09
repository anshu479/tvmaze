function Actor(props) {
  let { data } = props;
  console.log(data);
  if (data.length !== 0)
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
