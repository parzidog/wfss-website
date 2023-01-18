import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [units, setUnits] = useState([]);

  useEffect(() => {
    if (!window.localStorage.token) {
      navigate("/");
    }
    fetch("/api/units", {
      headers: {
        "Content-Type": "application/json",

      },
    })
      .then((res) => res.json())
      .then((data) => {
        setUnits(data.sort((a, b) => a.id - b.id));
      }
      )
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (prop) => (event) => {
    let value = event.target.value;
    prop.price = value;
    let newUnits = units
    newUnits.map((unit) => {
      if (unit.id === prop.id) {
        unit.price = Number(prop.price);
      }
    });
    setUnits(newUnits.sort((a, b) => a.id - b.id));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    units.map((unit) => {
      fetch(`/api/units/${unit.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(unit),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    });
    window.localStorage.clear();
    navigate("/");
  };

  return (
    <div id="admin-dashboard">
      <div className="header">
        <h1>
          Update Prices
        </h1>
      </div>
      <div className="content">
        <div className="units">
          <form onSubmit={handleSubmit}>
            <div className="climate">
              {units.map((unit) =>
                unit.climate ?
                  <div className="unit climate" key={unit.id}>
                    <h3>{unit.length} x {unit.width} {unit.climate ? <span> Climate Controlled </span> : <span> Outside </span>}</h3>
                    <div className="unit-price">
                      <h4>Price</h4>
                      <input type="number" name={unit.id} defaultValue={unit.price} onChange={handleChange(unit)} />
                    </div>
                  </div>
                  : <></>
              )}
            </div>
            <div className="non-climate">
              {units.map((unit) =>
                !unit.climate ?
                  <div className="unit non-climate" key={unit.id}>
                    <h3>{unit.length} x {unit.width} {unit.climate ? <span> Climate Controlled </span> : <span> Outside </span>}</h3>
                    <div className="unit-price">
                      <h4>Price</h4>
                      <input type="number" name={unit.id} defaultValue={unit.price} onChange={handleChange(unit)} />
                    </div>
                  </div>
                  : <></>
              )}
            </div>
            <div id="submit">
              <input type="submit" value="Update Prices" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard