import { createElement } from "react";

export default function compose(...comp) {
  if (comp.length === 0) {
    throw new Error("Please throw in at least one component!");
  }
  const Composed = ({ children, ...props }) =>
    helper({ components: comp, child: children, props });
  const displayName = comp.map(c => c.displayName || c.name).join("|");
  Composed.displayName = `Composed(${displayName})`;
  return Composed;
}

function helper({ components, child, args = [], props }) {
  if (components.length === 1) {
    return createElement(components[0], props, (...finalArg) =>
      child(...args, finalArg)
    );
  }
  return createElement(
    components[0],
    props,
    (...arg) => (
      args.push(arg), helper({ components: components.slice(1), child, args })
    )
  );
}
