import React from 'react';

export default function Root(props: any) {
  // eslint-disable-next-line react/prop-types
  // eslint-disable-next-line react/destructuring-assignment
  return <section>{props.name} is mounted!</section>;
}
