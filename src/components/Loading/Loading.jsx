import "./Loading.scss";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Loading() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    for (let i = 1; i <= 10; i++) {
      setTimeout(() => setArray((prev) => [...prev, i]), 200 * i);
    }
  }, []);

  return (
    <div className="Loading">
      <div className="Loading__title"></div>
      <div className="Loading__carousel">
        {array.map((elem, i) => {
          return <div key={i} className="Loading__carousel--poster"></div>;
        })}
      </div>
    </div>
  );
}
