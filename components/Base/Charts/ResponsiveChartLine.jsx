// install (please make sure versions match peerDependencies)
import { ResponsiveLine } from "@nivo/line";
import { useIntl } from "react-intl";
import { linearGradientDef } from "@nivo/core";

// Coming from documentation, keeping it to see what it looks like
// everything is here : https://nivo.rocks/line/
const dataTest = [
  {
    id: "japan",
    color: "hsl(302, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 58,
      },
      {
        x: "helicopter",
        y: 53,
      },
      {
        x: "boat",
        y: 172,
      },
      {
        x: "train",
        y: 150,
      },
      {
        x: "subway",
        y: 196,
      },
      {
        x: "bus",
        y: 49,
      },
      {
        x: "car",
        y: 109,
      },
      {
        x: "moto",
        y: 76,
      },
      {
        x: "bicycle",
        y: 61,
      },
      {
        x: "horse",
        y: 157,
      },
      {
        x: "skateboard",
        y: 131,
      },
      {
        x: "others",
        y: 108,
      },
    ],
  },
  {
    id: "france",
    color: "hsl(25, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 211,
      },
      {
        x: "helicopter",
        y: 32,
      },
      {
        x: "boat",
        y: 88,
      },
      {
        x: "train",
        y: 30,
      },
      {
        x: "subway",
        y: 298,
      },
      {
        x: "bus",
        y: 68,
      },
      {
        x: "car",
        y: 2,
      },
      {
        x: "moto",
        y: 64,
      },
      {
        x: "bicycle",
        y: 122,
      },
      {
        x: "horse",
        y: 89,
      },
      {
        x: "skateboard",
        y: 97,
      },
      {
        x: "others",
        y: 108,
      },
    ],
  },
  {
    id: "us",
    color: "hsl(50, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 2,
      },
      {
        x: "helicopter",
        y: 76,
      },
      {
        x: "boat",
        y: 75,
      },
      {
        x: "train",
        y: 42,
      },
      {
        x: "subway",
        y: 201,
      },
      {
        x: "bus",
        y: 3,
      },
      {
        x: "car",
        y: 184,
      },
      {
        x: "moto",
        y: 153,
      },
      {
        x: "bicycle",
        y: 244,
      },
      {
        x: "horse",
        y: 244,
      },
      {
        x: "skateboard",
        y: 197,
      },
      {
        x: "others",
        y: 262,
      },
    ],
  },
  {
    id: "germany",
    color: "hsl(92, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 9,
      },
      {
        x: "helicopter",
        y: 234,
      },
      {
        x: "boat",
        y: 215,
      },
      {
        x: "train",
        y: 299,
      },
      {
        x: "subway",
        y: 34,
      },
      {
        x: "bus",
        y: 114,
      },
      {
        x: "car",
        y: 1,
      },
      {
        x: "moto",
        y: 289,
      },
      {
        x: "bicycle",
        y: 164,
      },
      {
        x: "horse",
        y: 299,
      },
      {
        x: "skateboard",
        y: 183,
      },
      {
        x: "others",
        y: 289,
      },
    ],
  },
  {
    id: "norway",
    color: "hsl(303, 70%, 50%)",
    data: [
      {
        x: "plane",
        y: 118,
      },
      {
        x: "helicopter",
        y: 122,
      },
      {
        x: "boat",
        y: 126,
      },
      {
        x: "train",
        y: 281,
      },
      {
        x: "subway",
        y: 63,
      },
      {
        x: "bus",
        y: 213,
      },
      {
        x: "car",
        y: 59,
      },
      {
        x: "moto",
        y: 251,
      },
      {
        x: "bicycle",
        y: 291,
      },
      {
        x: "horse",
        y: 201,
      },
      {
        x: "skateboard",
        y: 55,
      },
      {
        x: "others",
        y: 85,
      },
    ],
  },
];

const MyResponsiveLine = ({ data, height, width }) => {
  const intl = useIntl();

  const dailyConsumptionTranslated = intl.formatMessage({
    id: "page.myAccount.useageAndBilling.graph.dailyConsumption",
    defaultMessage: "Day",
  });
  const amountTranslated = intl.formatMessage({
    id: "page.myAccount.useageAndBilling.graph.amount",
    defaultMessage: "Amount",
  });

  return (
    <ResponsiveLine
      enableArea={true}
      defs={[
        // using helpers
        // will inherit colors from current element
        linearGradientDef("gradientA", [
          { offset: 0, color: "inherit" },
          { offset: 100, color: "inherit", opacity: 0 },
        ]),
        linearGradientDef("gradientB", [
          { offset: 0, color: "#000" },
          { offset: 100, color: "inherit" },
        ]),
        // using plain object
        {
          id: "gradientC",
          type: "linearGradient",
          colors: [
            { offset: 0, color: "#3f51b5" },
            { offset: 100, color: "#ffffff" },
          ],
        },
      ]}
      fill={[
        // match using object query
        { match: { id: "react" }, id: "gradientA" },
        // match using function
        { match: (d) => d.id === "vue", id: "gradientB" },
        // match all, will only affect 'elm', because once a rule match,
        // others are skipped, so now it acts as a fallback
        { match: "*", id: "gradientC" },
      ]}
      areaOpacity={0.1}
      colors={(d) => d.color}
      data={data}
      width={width}
      height={height}
      margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: dailyConsumptionTranslated,
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: amountTranslated,
        legendOffset: -40,
        legendPosition: "middle",
      }}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default MyResponsiveLine;
