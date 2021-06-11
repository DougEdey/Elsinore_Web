import React from "react";
import { useQuery } from "@apollo/client";

import ErrorMessage from "./ErrorMessage";
import Device from "./Device";
import DeviceListQuery from "./graphql/DeviceListQuery.graphql";

export default function DeviceList() {
  const { loading, error, data } = useQuery(DeviceListQuery, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000,
  });

  if (error) {
    return <ErrorMessage message="Error loading devices." />;
  }
  if (loading && !data) {
    return <div>Loading</div>;
  }

  const allControllers = data.temperatureControllers;

  return (
    allControllers.map((temperatureController) => (
      <Device
        temperatureController={temperatureController}
        key={temperatureController.name}
      />
    )) || <div>No data</div>
  );
}
