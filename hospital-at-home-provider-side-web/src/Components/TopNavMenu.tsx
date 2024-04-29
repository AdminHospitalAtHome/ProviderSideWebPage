import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

export default function TopNavMenu(): JSX.Element {
	//reference https://react-bootstrap.netlify.app/docs/components/navbar/
	return <Container>
		<Navbar fixed="top" bg="dark" data-bs-theme="dark" style={{display: "flex", justifyContent: "space-around"}}>
			<Navbar.Text>Hospital-At-Home</Navbar.Text>
			<Navbar.Brand href={'/vital'}>Vitals</Navbar.Brand>
			<Navbar.Brand href={'/chat'}>Chat</Navbar.Brand>
			<Navbar.Brand href={'/medications'}>Medications</Navbar.Brand>
			<Navbar.Brand href={'/alerts'}>Alerts</Navbar.Brand>
		</Navbar>
	</Container>
}
