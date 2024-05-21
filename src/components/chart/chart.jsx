import { listData } from "../../lib/dummydata";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";

const DemoPie = () => {
  const [chartSize, setChartSize] = useState({ width: 400, height: 300 });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        // Mobile devices
        setChartSize({ width: 240, height: 240});
      } else if (width < 992) {
        // Tablets
        setChartSize({ width: 300, height: 300 });
      } else {
        // Desktop
        setChartSize({ width: 300, height: 300 });
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const categorizedData = listData.reduce((acc, item) => {
    const priceRange =
      item.Price <= 5 ? "1-5" : item.Price <= 10 ? "5-10" : ">10";
    acc[priceRange] = (acc[priceRange] || 0) + 1;
    return acc;
  }, {});

  const data = Object.entries(categorizedData).map(([name, value]) => ({
    name,
    value,
  }));

  const config = {
    data,
    angleField: "value",
    colorField: "name",
    legend: false,
    innerRadius: 0.6,
    width: chartSize.width,
    height: chartSize.height,
    labels: [
      {
        text: "name",
        style: { fontSize: 10, fontWeight: "bold" },
      },
      {
        text: (d, i, data) => (i < data.length - 3 ? d.value : ""),
        style: { fontSize: 9, dy: 12 },
      },
    ],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${listData.length}\n Data`,
          x: '50%',
          y: '50%',
          textAlign: 'center',
          fontSize: 40,
          fontStyle: 'bold',
        },
      },
    ],
    style: {
      stroke: "#fff",
      inset: 1,
      radius: 10,
    },
    scale: {
      color: {
        palette: "spectral",
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };

  return <Pie {...config} />;
};

export default DemoPie;
