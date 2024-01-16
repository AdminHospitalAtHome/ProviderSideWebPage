import {
	BrowserRouter as Router,
	Route,
	Routes
} from "react-router-dom";
import './App.css';
import ChatPage from "./Pages/ChatPage";

function App() {
	return (
		<Router>
			{/*routes are equivalent to navigation stacks*/}
			<Routes>
				{/*add more <Route> after this route with different patient id as navigation*/}
				<Route path='/chat' element={<ChatPage/>}/>
			</Routes>
			
		</Router>
	);
}

export default App;
