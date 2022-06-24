import React from 'react';
import { Container} from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import { Route, Router, Routes, useLocation } from 'react-router-dom';
import ActivityDetails from '../../features/activities/details/ActivityDetails';


function App() {
    let component;
    const location = useLocation();
    switch (window.location.pathname) {
        case '/':
            component = <HomePage />
            break;
        default:
            component =
            <>
                <NavBar />
                <Container style={{ marginTop: '7em' }}>
                    <Routes>
                        <Route path='/activities' element={<ActivityDashboard />} />
                        <Route path='/activities/:id' element={<ActivityDetails />} />
                        {/*Use key from location to force activityform to reload between edit and create new. It does not re-load even though querystring parm changes */}
                        <Route key={location.key} path='/createActivity' element={<ActivityForm />} />
                        <Route key={location.key} path='/createActivity/:id' element={<ActivityForm />} />
                    </Routes>
                </Container>
            </>
            break;
    }
    return (
        <>
            {component}
        </>
  );
}

//Wrap in observer to to grant additional mobx-lite powers to observer the observeable in the store
export default observer(App);



