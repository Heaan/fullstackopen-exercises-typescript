import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon, Grid, Button } from 'semantic-ui-react';
import axios from 'axios';

import { useStateValue, patientDetails, addEntry } from '../state';
import { Patient, Gender, Entry } from '../types';
import { apiBaseUrl } from '../constants';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { EntryFormValues } from '../AddEntryModal/AddEntryForm';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [{ patients }, dispatch] = useStateValue();

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const { data: patientData } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(patientDetails(patientData));
        setPatient(patientData);
      } catch (err) {
        console.error(err.message);
      }
    };

    if (patients[id]?.entries && patients[id]?.ssn) {
      setPatient(patients[id]);
    } else {
      axios.get<void>(`${apiBaseUrl}/ping`);
      fetchData(id);
    }
  }, [id]); // eslint-disable-line

  const getGenderIcon = (gender: Gender | undefined) => {
    switch (gender) {
      case 'male':
        return <Icon name="mars" />;
      case 'female':
        return <Icon name="venus" />;
      default:
        return <Icon name="genderless" />;
    }
  };

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values,
      );
      dispatch(addEntry({ id, newEntry }));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      // todo Error message
      setError(e.response.data.error);
    }
  };

  if (patient === undefined) {
    return null;
  }

  return (
    <div>
      <h2>
        {patient.name} {getGenderIcon(patient.gender)}
      </h2>
      <div>ssn: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <Grid style={{ marginTop: 0, marginLeft: 0 }}>
        <Grid.Column floated="left" width={3} verticalAlign="middle">
          <h3>Entries</h3>
        </Grid.Column>
        <Grid.Column floated="right" width={3} verticalAlign="middle">
          <Button
            onClick={() => openModal()}
            animated="vertical"
            color="green"
            style={{ width: 100 }}
          >
            <Button.Content hidden>Add Entry</Button.Content>
            <Button.Content visible>
              <Icon name="plus" />
            </Button.Content>
          </Button>
        </Grid.Column>
      </Grid>
      {patient.entries.map((entry) => {
        return <EntryDetails key={entry.id} entry={entry} />;
      })}
      <AddEntryModal
        name={patient.name}
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={submitNewEntry}
        error={error}
      />
    </div>
  );
};

export default PatientDetails;
