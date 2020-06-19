import React from 'react';
import { Entry } from '../types';
import { useStateValue } from '../state';
import { Card, List } from 'semantic-ui-react';

interface Props {
  diagnosisCodes: Entry['diagnosisCodes'];
}

const DiagnosisCodes: React.FC<Props> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnosisCodes) {
    return null;
  }

  return (
    <Card.Content extra>
      <Card.Header>Diagnoses</Card.Header>
      <Card.Description as={List}>
        {diagnosisCodes.map((code) => (
          <List.Item key={code} icon="h square" header={code} description={diagnoses[code]?.name} />
        ))}
      </Card.Description>
    </Card.Content>
  );
};

export default DiagnosisCodes;
