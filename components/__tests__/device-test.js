import React from "react";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import { MockedProvider } from "@apollo/client/testing";
import { mount } from "enzyme";

import Device from "../Device";

describe("Device component with basic device and no configured inputs", () => {
  const mockedDevice = {
    name: "Sample",
    tempProbeDetails: [],
    heatSettings: {
      configured: false,
    },
    coolSettings: {
      configured: false,
    },
    manualSettings: {
      configured: false,
    },
  };
  const locale = "en";
  const i18nManager = new I18nManager({
    locale,
    onError(error) {
      console.log(error);
    },
  });
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <I18nContext.Provider value={i18nManager}>
          <Device temperatureController={mockedDevice} />
        </I18nContext.Provider>
      </MockedProvider>
    );
  });

  it("shows the current name on the card header", () => {
    const inputName = wrapper.find(".MuiCardContent-root");

    expect(inputName.text()).toEqual("Sample");
  });

  it("does not show the general settings form by default", () => {
    const inputField = wrapper.find("TextField");
    expect(inputField).toHaveLength(0);
  });

  it("does show the general settings form when the general button is clicked", () => {
    const generalButton = wrapper.find("button[aria-label='general settings']");
    expect(generalButton).not.toBeNull();
    generalButton.simulate("click");
    const visibleTextField = wrapper.find("input[name='name']");
    expect(visibleTextField).toHaveLength(1);
  });

  it("does not show any of the heat settings input forms when the heat setting button is clicked", () => {
    const heatButton = wrapper.find("button[aria-label='heat settings']");
    expect(heatButton).not.toBeNull();
    heatButton.simulate("click");
    const gpioField = wrapper.find("input[name='heatSettings.gpio']");
    expect(gpioField).toHaveLength(0);
  });

  it("does not show any of the heat settings input forms when the cool setting button is clicked", () => {
    const coolButton = wrapper.find("button[aria-label='cool settings']");
    expect(coolButton).not.toBeNull();
    coolButton.simulate("click");
    const gpioField = wrapper.find("input[name='coolSettings.gpio']");
    expect(gpioField).toHaveLength(0);
  });

  it("does not show any of the manual settings input forms when the manual setting button is clicked", () => {
    const manualButton = wrapper.find("button[aria-label='manual settings']");
    expect(manualButton).not.toBeNull();
    manualButton.simulate("click");
    const gpioField = wrapper.find("input[name='manualSettings.gpio']");
    expect(gpioField).toHaveLength(0);
  });
});

describe("Device component with basic device and all configured inputs", () => {
  const mockedDevice = {
    name: "Sample",
    tempProbeDetails: [],
    heatSettings: {
      configured: true,
      gpio: "GPIO1",
    },
    coolSettings: {
      configured: true,
      gpio: "GPIO2",
    },
    manualSettings: {
      configured: true,
    },
  };
  const locale = "en";
  const i18nManager = new I18nManager({
    locale,
    onError(error) {
      console.log(error);
    },
  });
  let wrapper;
  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={[]} addTypename={false}>
        <I18nContext.Provider value={i18nManager}>
          <Device temperatureController={mockedDevice} />
        </I18nContext.Provider>
      </MockedProvider>
    );
  });

  it("shows the current name on the card header", () => {
    const inputName = wrapper.find(".MuiCardContent-root");

    expect(inputName.text()).toEqual("Sample");
  });

  it("does not show the general settings form by default", () => {
    const inputField = wrapper.find("TextField");
    expect(inputField).toHaveLength(0);
  });

  it("does show the general settings form when the general button is clicked", () => {
    const generalButton = wrapper.find("button[aria-label='general settings']");
    expect(generalButton).not.toBeNull();
    generalButton.simulate("click");
    const visibleTextField = wrapper.find("input[name='name']");
    expect(visibleTextField).toHaveLength(1);
  });

  it("shows the heat settings input forms when the heat setting button is clicked", () => {
    const heatButton = wrapper.find("button[aria-label='heat settings']");
    expect(heatButton).not.toBeNull();
    heatButton.simulate("click");
    const gpioField = wrapper.find("input[name='heatSettings.gpio']");
    expect(gpioField).toHaveLength(1);
    expect(gpioField.at(0).prop("defaultValue")).toEqual("GPIO1");
  });

  it("shows the cool settings input forms when the cool setting button is clicked", () => {
    const coolButton = wrapper.find("button[aria-label='cool settings']");
    expect(coolButton).not.toBeNull();
    coolButton.simulate("click");
    const gpioField = wrapper.find("input[name='coolSettings.gpio']");
    expect(gpioField).toHaveLength(1);
    expect(gpioField.at(0).prop("defaultValue")).toEqual("GPIO2");
  });

  it("does show the manual settings input forms when the manual setting button is clicked", () => {
    const manualButton = wrapper.find("button[aria-label='manual settings']");
    expect(manualButton).not.toBeNull();
    manualButton.simulate("click");
    const gpioField = wrapper.find("input[name='heatSettings.gpio']");
    expect(gpioField).toHaveLength(1);
    expect(gpioField.at(0).prop("defaultValue")).toEqual("GPIO1");
  });
});
