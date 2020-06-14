import React from 'react';

import { CoursePart } from '../index';

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.description}
          </p>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount} {part.groupProjectCount}
          </p>
        </div>
      );
    case 'Deeper type usage':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.exerciseSubmissionLink}
        </p>
      );
    case 'Testing with Jest':
      return (
        <p>
          {part.name} {part.exerciseCount} {part.description} {part.extraExercisesCount}
        </p>
      );
    default:
      return assertNever(part);
  }
};

export default Part;
