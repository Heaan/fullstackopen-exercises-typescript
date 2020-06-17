import React from 'react';
import { Icon, Card } from 'semantic-ui-react';

import { HealthCheckEntry, HealthCheckRating } from '../types';
import DiagnosisCodes from './DiagnosisCodes';

const ratingOf = (rating: HealthCheckRating) => {
  switch (rating) {
    case 0:
      return <Icon name="heart" color="green" />;
    case 1:
      return <Icon name="heart" color="yellow" />;
    case 2:
      return <Icon name="heart" color="orange" />;
    case 3:
      return <Icon name="heart" color="red" />;
    default:
      return null;
  }
};

const HealthCheck: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="user doctor" size="big" />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>{ratingOf(entry.healthCheckRating)}</Card.Description>
      </Card.Content>
      <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
    </Card>
  );
};

export default HealthCheck;
