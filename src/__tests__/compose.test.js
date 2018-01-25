import React from "react";
import { mount } from "enzyme";
import compose from "../compose";

describe("compose", () => {
  const A = ({ children }) => <div>{children("A1")}</div>;
  const B = ({ children }) => <div>{children("B1", "B2", "B3")}</div>;
  const C = ({ children }) => <div>{children("C1", "C2")}</div>;

  it("should behave correctly", () => {
    const mockRender = jest.fn();
    const ABC = compose(A, B, C);
    mount(<ABC>{mockRender}</ABC>);
    expect(mockRender).toHaveBeenCalledWith(
      ["A1"],
      ["B1", "B2", "B3"],
      ["C1", "C2"]
    );
  });

  it("should throw error if no args given", () => {
    expect(() => {
      compose();
    }).toThrow();
  });
});
