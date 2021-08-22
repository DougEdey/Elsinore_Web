import React from "react";
import { useQuery } from "@apollo/client";
import { useI18n } from "@shopify/react-i18n";

import SwitchDevice from "./SwitchDevice";
import ErrorMessage from "./ErrorMessage";
import Switches, { SwitchesQueryData } from "./graphql/SwitchListQuery.graphql";

export default function SwitchList() {
  const [i18n] = useI18n();
  const { loading, error, data } = useQuery(Switches, {
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

  const switches = data?.switches;

  if (switches && switches.length) {
    const controllers = switches.map((device: SwitchesQueryData.Switches) => (
      <SwitchDevice device={device} key={device.name} />
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
  return "No Switches!";
}
