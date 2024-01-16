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

function App() {
	return (
		<Router>
			{/*<fragment> is used to allow other component to exist in router, like this manu bar*/}
			<Fragment>
				<TopNavMenu/>
				{/*routes are equivalent to navigation stacks*/}
				<Routes>
					<Route path='/vital' element={<VitalPage/>}/>
				</Routes>
				<Routes>
					{/*add more <Route> after this route with different patient id as navigation*/}
					<Route path='/chat' element={<ChatPage/>}/>
				</Routes>
			</Fragment>
			
			
		</Router>
	);
}

export default App;
