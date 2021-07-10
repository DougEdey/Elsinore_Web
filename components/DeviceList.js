import React from "react";
import { useQuery } from "@apollo/client";
import { useI18n } from "@shopify/react-i18n";

import ErrorMessage from "./ErrorMessage";
import Device from "./Device";
import DeviceListQuery from "./graphql/DeviceListQuery.graphql";

export default function DeviceList() {
  const [i18n] = useI18n();
  const { loading, error, data } = useQuery(DeviceListQuery, {
    notifyOnNetworkStatusChange: true,
    pollInterval: 5000,
    // errorPolicy: 'all',
  });

  const errorComponent = error ? (
    <ErrorMessage message={i18n.translate("defaultNetworkError")} />
  ) : null;

  if (loading && !data) {
    return <div>{i18n.translate("DeviceList.loading")}</div>;
  }

  const allControllers = data?.temperatureControllers;

  if (allControllers && allControllers.length) {
    const controllers = allControllers.map((temperatureController) => (
      <Device
        temperatureController={temperatureController}
        key={temperatureController.name}
      />
    )) || <div>{i18n.translate("DeviceList.noData")}</div>;

    return (
      <>
        {controllers}
        {errorComponent}
      </>
    );
  }

  if (errorComponent) {
    return errorComponent;
  }
  return "No devices";
}
