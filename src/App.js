import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './App.css';
import AuthProvider from './context/AuthProvider';
import Account from './Pages/Account/Account';
import AddAgent from './Pages/Account/AddAgent/AddAgent';
import ManageAll from './Pages/Account/ManageAll/ManageAll';
import MyBookings from './Pages/Account/MyBookings/MyBookings';
import PrivateRoute from './Pages/Account/PrivateRoute/PrivateRoute';
import AllAgents from './Pages/AllAgents/AllAgents';
import AgentDetails from './Pages/Home/AgentDetails/AgentDetails';
import Home from './Pages/Home/Home/Home';
import Header from './Pages/Shared/Header/Header';

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                
                <Header />
                
                <Switch>
                    <Route exact path="/">
                        <Home />
                    </Route>
                    
                    <Route path="/home">
                        <Home />
                    </Route>
                    
                    <Route path="/allAgents">
                        <AllAgents />
                    </Route>
                    
                    <PrivateRoute path="/manageAll">
                        <ManageAll />
                    </PrivateRoute>
                    
                    <PrivateRoute path="/addAgent">
                        <AddAgent />
                    </PrivateRoute>
                    
                    <PrivateRoute path="/bookings">
                        <MyBookings />
                    </PrivateRoute>
                    
                    <PrivateRoute path="/agent/:agentID">
                        <AgentDetails />
                    </PrivateRoute>
                    
                    <Route path="/account">
                        <Account />
                    </Route>
                </Switch>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
