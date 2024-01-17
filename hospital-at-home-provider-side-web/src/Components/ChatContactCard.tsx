import Card from 'react-bootstrap/Card'

export default function ChatContactCard({threadID}:{threadID:string}):React.JSX.Element{
  return <Card style={{margin: '5px'}}>
    <Card.Title>Name</Card.Title>
    <Card.Text>most recent text message</Card.Text>
  </Card>
}
