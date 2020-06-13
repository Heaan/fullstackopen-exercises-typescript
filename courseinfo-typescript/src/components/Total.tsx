import React from 'react';

import { Course } from '../index';

const Total: React.FC<{ courseParts: Course[] }> = ({ courseParts }) => {
  return (
    <p>Number of exercise {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}</p>
  );
};

export default Total;
