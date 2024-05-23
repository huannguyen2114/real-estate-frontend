import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Pie } from "@ant-design/plots";

const DemoPie = ({someData}) => {
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

  const categorizedData = someData.reduce((acc, item) => {
    const price = item.price;
    let priceRange;

    if (price >= 1000000 && price < 3000000) {
      priceRange = "1-3mil";
    } else if (price >= 3000000 && price < 5000000) {
      priceRange = "3-5mil";
    } else if (price >= 5000000 && price < 10000000) {
      priceRange = "5-10mil";
    } else if (price >= 10000000 && price < 15000000) {
      priceRange = "10-15mil";
    } else if (price >= 15000000 && price < 20000000) {
      priceRange = "15-20mil";
    } else {
      priceRange = ">20mil";
    }

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
        text: "value",
        style: { fontSize: 9, dy: 12 },
      },
    ],
    annotations: [
      {
        type: 'text',
        style: {
          text: `${someData.length}\n Data`,
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
        palette: "tableau10",
        offset: (t) => t * 0.8 + 0.1,
      },
    },
  };

  return <Pie {...config} className="chart"/>;
};

export default DemoPie;
