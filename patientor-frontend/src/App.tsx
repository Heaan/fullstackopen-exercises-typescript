import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Button, Divider, Header, Container } from 'semantic-ui-react';

import { apiBaseUrl } from './constants';
import { useStateValue, setPatientList, fetchDiagnosis } from './state';
import { Patient, Diagnosis } from './types';

import PatientListPage from './PatientListPage';
import PatientDetails from './PatientDetails';

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchData = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);
        dispatch(setPatientList(patientListFromApi));
        const { data: diagnosisFromApi } = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
        dispatch(fetchDiagnosis(diagnosisFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [dispatch]);

  return (
    <div className="App">
      <Container>
        <Router>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={() => <PatientDetails />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Router>
        <footer style={{ paddingBottom: 50 }}></footer>
      </Container>
    </div>
  );
};

export default App;
