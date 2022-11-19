import axios from "axios";
import React, { useEffect, useState } from "react"
// import { fetchAllUnits } from "../features/unitSlice"
// import { useSelector } from "react-redux"

const Pricing = () => {
  const [units, setUnits] = useState([]);

  console.log("units", units);

  useEffect(() => {
    setUnits(async () => await axios.get("http://localhost:3000/api/units"));
  }, []);

  return (
    <div>Pricing</div>
  )
}

export default Pricing