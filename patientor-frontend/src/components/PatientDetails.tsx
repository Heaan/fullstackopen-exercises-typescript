import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Icon } from 'semantic-ui-react';
import axios from 'axios';

import { useStateValue } from '../state';
import { Patient, Gender } from '../types';
import { apiBaseUrl } from '../constants';

const PatientDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | undefined>();
  const [{ patients }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchData = async (id: string) => {
      try {
        const { data: patientDetails } = await axios.get(`${apiBaseUrl}/patients/${id}`);
        dispatch({ type: 'PATIENT_DETAILS', payload: patientDetails });
        setPatient(patientDetails);
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

  return (
    <div>
      <h2>
        {patient?.name} {getGenderIcon(patient?.gender)}
      </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
    </div>
  );
};

export default PatientDetails;
