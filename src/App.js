import { useState } from "react";
import CountryCard from "./components/countryCard";
import data from "./data/countries.json";
import "./styles.css";

function random(n) {
  return Math.floor(Math.random() * n);
}

function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function ascCompare(a, b) {
  return a.population - b.population;
}

function dscCompare(a, b) {
  return b.population - a.population;
}

function sort(list, compareFunc) {
  return list.sort(compareFunc);
}

function filter(list, option) {
  if (option === "all") {
    return list;
  } else {
    return list.filter((item) => {
      return (
        item.continent.toLowerCase() === option.toLowerCase() ||
        item.population / 1000000 >= option.toLowerCase()
      );
    });
  }
}

export default function App() {
  const [sortOption, setSortOption] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  const countries = data.countries;

  const handleSort = (event) => {
    setSortOption(event.target.value);
  };

  function sortCountries() {
    let func;

    if (sortOption === "alpha") {
      func = alphaCompare;
    } else if (sortOption === "<") {
      func = ascCompare;
    } else if (sortOption === ">") {
      func = dscCompare;
    } else if (sortOption === "shuffle") {
      return countries.slice().sort(() => Math.random() - 0.5);
    }

    return sort(countries.slice(), func);
  }

  const handleFilter = (event) => {
    setFilterOption(event.target.value);
  };

  let sortedCountries = sortCountries();
  let filteredCountries = filter(sortedCountries.slice(), filterOption);

  return (
    <div className="App">
      <h1>World's Largest Countries By Population</h1>
      <div className="filters">
        <lable>
          Sort by:
          <select onChange={handleSort}>
            <option value="alpha">Alphabetically</option>
            <option value="<">Population Ascending</option>
            <option value=">" selected>
              Population Descending
            </option>
            <option value="shuffle">Shuffled</option>
          </select>
        </lable>

        <lable>
          Filters:
          <select onChange={handleFilter}>
            <optgroup label="By Continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By Population">
              <option value={1}>Less than 100M</option>
              <option value={100}>100M or more</option>
              <option value={200}>200M or more</option>
              <option value={500}>500M or more</option>
              <option value={1000}>1B or more</option>
            </optgroup>
          </select>
        </lable>
      </div>
      <div className="countries">
        {filteredCountries.map((country) => {
          return <CountryCard key={country.id} details={country} />;
        })}
      </div>
    </div>
  );
}
