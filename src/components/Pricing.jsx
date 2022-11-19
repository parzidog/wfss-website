import React, { useEffect, useState } from "react"
// import { fetchAllUnits } from "../features/unitSlice"
import { useSelector } from "react-redux"

const Pricing = () => {
  const [units, setUnits] = useState(useSelector((state) => state.unit.allUnits));

  console.log("units", units);

  useEffect(() => {
    setUnits([...units]);
  }, []);

  return (
    <div>Pricing</div>
  )
}

export default Pricing