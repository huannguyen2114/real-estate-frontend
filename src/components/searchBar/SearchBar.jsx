import { useState } from "react";
import "./searchBar.scss";
import { Link } from "react-router-dom";

const types = ["buy", "rent"];

function SearchBar({ location }) {
  let lat, lot;
  if (location) {
    lat = location.x;
    lot = location.y;
  }

  const [query, setQuery] = useState({
    type: "buy",
    area: 0,
    minPrice: 0,
    maxPrice: 0,
  });
  console.log(query);

  const switchType = (val) => {
    setQuery((prev) => ({ ...prev, type: val }));
  };

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <form>
        <input
          type="number"
          name="area"
          min={0}
          max={1000000}
          placeholder="Area"
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          min={0}
          max={1000000000000000}
          placeholder="Min Price"
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          min={0}
          max={10000000000000000}
          placeholder="Max Price"
          onChange={handleChange}
        />
        <Link
          to={`/list?estateType=${query.type}${
            query.area ? `&area=${query.area}` : ""
          }${query.minPrice ? `&minPrice=${query.minPrice}` : ""}${
            query.maxPrice ? `&maxPrice=${query.maxPrice}` : ""
          }${lat ? `&longitude=${lat}` : ""}${lot ? `&latitude=${lot}` : ""}`}
        >
          <button>
            <img src="/search.png" alt="" />
          </button>
        </Link>
      </form>
    </div>
  );
}

export default SearchBar;
