import React, { useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import NavBar from './NavBar';
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import { observer } from 'mobx-react-lite';
import HomePage from '../../features/home/HomePage';
import ActivityForm from '../../features/activities/form/ActivityForm';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponents from './LoadingComponents';
import ModalContainer from '../common/Modals/ModalContainer';

function App() {
    let component;
    const location = useLocation();
    const { commonStore, userStore } = useStore();

    //Get user if token set 
    useEffect(() => {
        
        if (commonStore.token)
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        else
            commonStore.setAppLoaded()
    }, [commonStore, userStore]);


    if (!commonStore.appLoaded) return <LoadingComponents content='Loading app....'/>


    switch (window.location.pathname) {
        case '/':
            
            component =
            <>
                <ToastContainer position='bottom-right' hideProgressBar />
                <ModalContainer />
                <HomePage />
            </>
            break;
        default:
            component =
                <>
                //Add toast and ModalContainer,ToastContainer at top level so they can be used anywhere in the app
                <ToastContainer position='bottom-right' hideProgressBar />
                <ModalContainer />
                <NavBar />
                <Container style={{ marginTop: '7em' }}>
                    {/*Routes replacement for switch*/}
                    <Routes> 
                        <Route path='/activities' element={<ActivityDashboard />} />
                        <Route path='/activities/:id' element={<ActivityDetails />} />
                        {/*Use key from location to force activityform to reload between edit and create new. It does not re-load even though querystring parm changes */}
                        <Route key={location.key} path='/createActivity' element={<ActivityForm />} />
                        <Route key={location.key} path='/createActivity/:id' element={<ActivityForm />} />

                        <Route key={location.key} path='/login' element={<LoginForm />} />

                        <Route key={location.key} path='/errors' element={<TestErrors />} />
                        <Route key={location.key} path='/server-error' element={<ServerError />} />
                        {/*Catch all route*/}
                        <Route path="*" element={<NotFound />} />
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



