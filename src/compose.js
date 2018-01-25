import React from "react";

export default function compose(...Components) {
  if (Components.length === 0) {
    throw new Error("Please throw in at least one component!");
  }
  return Components.reduce(
    (Composed, Next) => {
      return ({ children }) => (
        <Composed>
          {(...composedArgs) => (
            <Next>
              {(...nextArgs) => {
                return children(...composedArgs, nextArgs);
              }}
            </Next>
          )}
        </Composed>
      );
    },
    ({ children }) => <React.Fragment>{children()}</React.Fragment>
  );
}
