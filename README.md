# Compose Component [![Build Status](https://travis-ci.org/raibima/compose-component.svg?branch=master)](https://travis-ci.org/raibima/compose-component) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

A utility function for composing React components with children function. Inspired by redux `compose` / lodash `flowRight`.

## Installation
    $ npm i --save compose-component

## Example
The following code will render `A1,A2-B1,B2`
```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import compose from 'compose-component';

const A = ({ children }) => <div>{children('A1', 'A2')}</div>;
const B = ({ children }) => <div>{children('B1', 'B2')}</div>;

const AB = compose(A, B);

// <AB>
//   {
//     (A, B) => <div>{`${A}-${B}`}</div>
//   }
// </AB>
//
// is equivalent to
//
// <A>
//   {(...A) => (
//     <B>
//       {
//         (...B) => <div>{`${A}-${B}`}</div>
//       }
//     </B>
//   )}
// <A>

ReactDOM.render(
  <AB>
    {(a1Args, [ b1, b2 ] /* destructured B args */) =>
      <span>{`${a1Args.join()}-${b1},${b2}`}</span>
    }
  </AB>,
  document.querySelector('#app')
);
```

You can also pass props to your resulting component and it will be passed down to EVERY components you compose.

_(Note that you might have to deal with component props naming conflicts. Having two components with at least 1 mutual props can lead to unwanted behaviors)_

```jsx
const Foo = ({ children, ...props }) => <div className={props.className}>{children('foo')}</div>
const Bar = ({ children, ...props }) => <div style={props.style}>{children('bar')}</div>
const FooBar = compose(Foo, Bar);

// render
<FooBar className="foo" style={{ fontSize: 14 }}>
  {([ foo ], [ bar ]) => ... }
</FooBar>
```

## API
    compose(...Components: Array<ReactClass | ReactStatelessFunction>)
Returns: `ReactClass` with a children function, the parameters of which consist of arrays from each Component's children function parameter

## License
MIT
