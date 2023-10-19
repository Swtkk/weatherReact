'use client'

import {Card,AreaChart,Title} from "@tremor/react"
import {number} from "prop-types";

type Props = {
    results: Root
}

export function HumidityChart({results}: Props) {
    const hourly = results?.hourly.time.map((time)=>
        new Date(time)
        .toLocaleString("en-US",{
        hour: "numeric",
        hour12: false,
    })).slice(0,24)

    const data = hourly.map((hour, i) => ({
        time: Number(hour),
        "Humidity (%)": results.hourly.relativehumidity_2m[i],
    }))

    const dataFormatter = (number: number)=>`${number} %`
    return (

            <Card >
                <Title>Humidity</Title>
                <AreaChart className={"mt-6"}
                    data={data}
                    showLegend
                    categories={["Humidity (%)"]}
                    index="time"
                    colors={["blue"]}
                    minValue={0}
                    maxValue={100}
                    valueFormatter={dataFormatter}
                    yAxisWidth={40}/>
            </Card>
    );
}