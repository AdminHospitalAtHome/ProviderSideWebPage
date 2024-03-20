import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom";
import './App.css';
import ChatPage from "./Pages/ChatPage";
import VitalPage from "./Pages/VitalPage";
import {Fragment} from "react";
import TopNavMenu from "./Components/TopNavMenu";
import PatientDetailPage from "./Pages/PatientDetailPage";
import {WarningPage} from "./Pages/WarningPage";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div>
		<ToastContainer
		theme="light"
		autoClose={false}
		closeButton={true}
		/>
		<Router>
			{/*<fragment> is used to allow other component to exist in router, like this manu bar*/}
			<Fragment>
				<TopNavMenu/>
				{/*routes are equivalent to navigation stacks*/}
				<Routes>
					<Route index element={<WarningPage/>}/>
					<Route path='/vital' element={<VitalPage/>}/>
				</Routes>
				<Routes>
					{/*add more <Route> after this route with different patient id as navigation*/}
					<Route path='/chat' element={<ChatPage/>}/>
					<Route path="/patient/:patientId" element={<PatientDetailPage/>} />
				</Routes>
			</Fragment>


		</Router>
		</div>
	);
}

export default App;
