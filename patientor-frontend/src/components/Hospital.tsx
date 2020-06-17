import React from 'react';
import { HospitalEntry } from '../types';
import DiagnosisCodes from './DiagnosisCodes';
import { Icon, Card } from 'semantic-ui-react';

const Hospital: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  return (
    <Card style={{ width: '100%' }}>
      <Card.Content>
        <Card.Header>
          {entry.date} <Icon name="hospital" size="big" />
        </Card.Header>
        <Card.Meta>{entry.description}</Card.Meta>
        <Card.Description>
          <strong style={{ fontSize: '1.2em' }}>Discharge</strong>
          <div>
            <Icon name="calendar alternate outline" /> {entry.discharge.date}
          </div>
          <div>
            <Icon name="first aid" /> {entry.discharge.criteria}
          </div>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Card.Description>
          Specialist: <strong>{entry.specialist}</strong>
        </Card.Description>
      </Card.Content>
      <DiagnosisCodes diagnosisCodes={entry.diagnosisCodes} />
    </Card>
  );
};

export default Hospital;
