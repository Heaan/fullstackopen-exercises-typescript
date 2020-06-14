import React from 'react';

import { CoursePart } from '../index';

const Total: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  return (
    <p>Number of exercise {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
  );
};

export default Total;
