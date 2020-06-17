import React from 'react';
import { OccupationalHealthcareEntry } from '../types';

import DiagnosisCodes from './DiagnosisCodes';
import { Icon, Card, Step } from 'semantic-ui-react';

const OccupationalHealthcare: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="treatment" size="big" /> {entry.employerName}
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          Specialist: <strong>{entry.specialist}</strong>
        </Card.Description>
      </Card.Content>
      <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
      {entry.sickLeave ? (
        <Card.Content extra>
          <Card.Header>Sick Leave</Card.Header>
          <Step.Group size="mini">
            <Step>
              <Icon name="calendar alternate outline" />
              <Step.Content>
                <Step.Title>{entry.sickLeave.startDate}</Step.Title>
              </Step.Content>
            </Step>

            <Step>
              <Icon name="calendar alternate outline" />
              <Step.Content>
                <Step.Title>{entry.sickLeave.endDate}</Step.Title>
              </Step.Content>
            </Step>
          </Step.Group>
        </Card.Content>
      ) : null}
    </Card>
  );
};

export default OccupationalHealthcare;
