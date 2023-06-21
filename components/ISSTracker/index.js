import { useEffect, useState } from "react";
import Controls from "../Controls/index";
import Map from "../Map/index";
import useSWR from "swr";

const URL = "https://api.wheretheiss.at/v1/satellites/25544";

export default function ISSTracker() {
  const {
    data: coords,
    error,
    mutate,
  } = useSWR(URL, {
    refreshInterval: 5000,
  });
  if (error) return <div>ISS crashed</div>;
  if (coords === undefined) return <div>ISS still in outer space…</div>;
  return (
    <main>
      <Map longitude={coords.longitude} latitude={coords.latitude} />
      <Controls
        longitude={coords.longitude}
        latitude={coords.latitude}
        onRefresh={() => mutate()}
      />
    </main>
  );
}
