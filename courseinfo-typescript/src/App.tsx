import React from 'react';

import Header from './components/Header';
import Content from './components/Content';
import Total from './components/Total';

import { CoursePart } from './index';

const App: React.FC<{ courseParts: CoursePart[] }> = ({ courseParts }) => {
  const courseName = 'Half stack application development';

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
