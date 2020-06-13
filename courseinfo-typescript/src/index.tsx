import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

export interface Course {
  name: string;
  exerciseCount: number;
}

ReactDOM.render(<App />, document.getElementById('root'));
