import Navbar from 'react-bootstrap/Nav';
import {NavbarBrand} from "react-bootstrap";

export default function TopNavMenu(): JSX.Element {
	//reference https://react-bootstrap.netlify.app/docs/components/navbar/
	return <div>
		<Navbar>
			<NavbarBrand href={'/vital'}>Vitals</NavbarBrand>
			<NavbarBrand href={'/chat'}>Chat</NavbarBrand>
		</Navbar>
	</div>
}
