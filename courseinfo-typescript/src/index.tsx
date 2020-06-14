import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescribe extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescribe {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescribe {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescribe {
  name: 'Testing with Jest';
  extraExercisesCount: number;
}

export type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const courseParts: CoursePart[] = [
  {
    name: 'Fundamentals',
    exerciseCount: 10,
    description: 'This is an awesome course part',
  },
  {
    name: 'Using props to pass data',
    exerciseCount: 7,
    groupProjectCount: 3,
  },
  {
    name: 'Deeper type usage',
    exerciseCount: 14,
    description: 'Confusing description',
    exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev',
  },
  {
    name: 'Testing with Jest',
    exerciseCount: 8,
    description: 'Learning testing library Jest',
    extraExercisesCount: 3,
  },
];

ReactDOM.render(<App courseParts={courseParts} />, document.getElementById('root'));
