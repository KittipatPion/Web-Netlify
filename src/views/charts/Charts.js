import React from "react";
import { CCard, CCardBody, CCardGroup, CCardHeader } from "@coreui/react";
import {
  CChartBar,
  CChartLine,
  CChartDoughnut,
  CChartRadar,
  CChartPie,
  CChartPolarArea,
} from "@coreui/react-chartjs";

const Charts = () => {
  var a = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  var b = [100, 90, 80, 70, 60, 50, 40, 30, 20, 10];
  var c = [
    {
      Letter: "A",
      Freq: 20,
    },
    {
      Letter: "B",
      Freq: 12,
    },
    {
      Letter: "C",
      Freq: 47,
    },
    {
      Letter: "D",
      Freq: 34,
    },
    {
      Letter: "E",
      Freq: 54,
    },
    {
      Letter: "F",
      Freq: 21,
    },
    {
      Letter: "G",
      Freq: 57,
    },
    {
      Letter: "H",
      Freq: 31,
    },
    {
      Letter: "I",
      Freq: 17,
    },
    {
      Letter: "J",
      Freq: 5,
    },
    {
      Letter: "K",
      Freq: 23,
    },
    {
      Letter: "L",
      Freq: 39,
    },
    {
      Letter: "M",
      Freq: 29,
    },
    {
      Letter: "N",
      Freq: 33,
    },
    {
      Letter: "O",
      Freq: 18,
    },
    {
      Letter: "P",
      Freq: 35,
    },
    {
      Letter: "Q",
      Freq: 11,
    },
    {
      Letter: "R",
      Freq: 45,
    },
    {
      Letter: "S",
      Freq: 43,
    },
    {
      Letter: "T",
      Freq: 28,
    },
    {
      Letter: "U",
      Freq: 26,
    },
    {
      Letter: "V",
      Freq: 30,
    },
    {
      Letter: "X",
      Freq: 5,
    },
    {
      Letter: "Y",
      Freq: 4,
    },
    {
      Letter: "Z",
      Freq: 2,
    },
  ];

  return (
    <CCardGroup columns className="cols-2">
      <CCard>
        <CCardHeader>Bar Chart</CCardHeader>
        <CCardBody>
          <CChartBar
            datasets={[
              {
                label: "Domestic",
                backgroundColor: "#056776",
                data: c.map((x) => {
                  return x.Freq
                })
              },
              {
                label: "Export",
                backgroundColor: "#056776",
                data: c.map((x) => {
                  return x.Freq
                })
              },
            ]}
            labels="months"
            options={{
              tooltips: {
                enabled: false,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Doughnut Chart</CCardHeader>
        <CCardBody>
          <CChartDoughnut
            datasets={[
              {
                backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                data: [40, 20, 80, 10],
              },
            ]}
            labels={["VueJs", "EmberJs", "ReactJs", "AngularJs"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Line Chart</CCardHeader>
        <CCardBody>
          <CChartLine
            datasets={[
              {
                label: "Data One",
                backgroundColor: "rgb(228,102,81,0.9)",
                data: [30, 39, 10, 50, 30, 70, 35],
              },
              {
                label: "Data Two",
                backgroundColor: "rgb(0,216,255,0.9)",
                data: [39, 80, 40, 35, 40, 20, 45],
              },
            ]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
            labels="months"
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Pie Chart</CCardHeader>
        <CCardBody>
          <CChartPie
            datasets={[
              {
                backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
                data: [40, 20, 80, 10],
              },
            ]}
            labels={["VueJs", "EmberJs", "ReactJs", "AngularJs"]}
            options={{
              tooltips: {
                enabled: true,
              },
            }}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Polar Area Chart</CCardHeader>
        <CCardBody>
          <CChartPolarArea
            datasets={[
              {
                label: "My First dataset",
                backgroundColor: "rgba(179,181,198,0.2)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "rgba(179,181,198,1)",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: [65, 59, 90, 81, 56, 55, 40],
              },
              {
                label: "My Second dataset",
                backgroundColor: "rgba(255,99,132,0.2)",
                pointBackgroundColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "rgba(255,99,132,1)",
                pointHoverBorderColor: "rgba(255,99,132,1)",
                data: [28, 48, 40, 19, 96, 27, 100],
              },
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true,
              },
            }}
            labels={[
              "Eating",
              "Drinking",
              "Sleeping",
              "Designing",
              "Coding",
              "Cycling",
              "Running",
            ]}
          />
        </CCardBody>
      </CCard>

      <CCard>
        <CCardHeader>Radar Chart</CCardHeader>
        <CCardBody>
          <CChartRadar
            datasets={[
              {
                label: "2019",
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                tooltipLabelColor: "rgba(179,181,198,1)",
                data: [65, 59, 90, 81, 56, 55, 40],
              },
              {
                label: "2020",
                backgroundColor: "rgba(255,99,132,0.2)",
                borderColor: "rgba(255,99,132,1)",
                pointBackgroundColor: "rgba(255,99,132,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(255,99,132,1)",
                tooltipLabelColor: "rgba(255,99,132,1)",
                data: [28, 48, 40, 19, 96, 27, 100],
              },
            ]}
            options={{
              aspectRatio: 1.5,
              tooltips: {
                enabled: true,
              },
            }}
            labels={[
              "Eating",
              "Drinking",
              "Sleeping",
              "Designing",
              "Coding",
              "Cycling",
              "Running",
            ]}
          />
        </CCardBody>
      </CCard>
    </CCardGroup>
  );
};

export default Charts;
