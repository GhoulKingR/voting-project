import { BarChartOptions } from "@carbon/charts-react";

export const options: BarChartOptions = {
  title: "Current voting analysis",
  legend: {
    enabled: false,
  },
  axes: {
    left: {
      title: "Votes",
      mapsTo: "value",
    },
    bottom: {
      title: "Candidates",
      mapsTo: "group",
      scaleType: "labels" as any,
    },
  },
  getFillColor() {
    return "rgba(15, 172, 255, 0.50)";
  },
  height: "440px",
  resizable: false,
  toolbar: {
    enabled: false,
  },
  canvasZoom: {
    enabled: false,
  },
  bars: {
    width: 94.7,
  },
  accessibility: {
    svgAriaLabel: "Simple bar chart",
  },
};
