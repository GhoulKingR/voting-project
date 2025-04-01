"use client";
import { SimpleBarChart } from "@carbon/charts-react";
import { options } from "@/libs/bar-options";
import "@carbon/charts-react/styles.css";

export default function Chart({ data }: { data: any }) {
  return <SimpleBarChart data={data} options={options}></SimpleBarChart>;
}
