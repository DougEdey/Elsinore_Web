import React from "react";
import { I18nContext, I18nManager } from "@shopify/react-i18n";
import { MockedProvider } from "@apollo/client/testing";
import { mount } from "enzyme";

import Device from "../Device";

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

describe("Device component", () => {
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

  // const [i18n] = useI18n();
  it("shows the current name on the card header", () => {
    const inputName = wrapper.find(".MuiCardContent-root");

    expect(inputName.text()).toEqual("Sample");
  });

  it("does not show the general settings form by default", () => {
    const inputField = wrapper.find("TextField");
    expect(inputField).toHaveLength(0);
  });

  it("does show the general settings form when the general button is clicked", () => {
    const inputField = wrapper.find("button[aria-label='general settings']");
    expect(inputField).not.toBeNull();
    inputField.simulate("click");
    const visibleTextField = wrapper.find("input[name='name']");
    expect(visibleTextField).toHaveLength(1);
  });
});
