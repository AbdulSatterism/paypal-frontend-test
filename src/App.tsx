



import './App.css';
import PayPalJoinParty from './components/paypal';




function App() {
  const partyId = '682f3d446f106d9c2fa8fbe1';
  const ticketCount = 1;
  const amount = 100; // example amount in USD

  return (
    <div style={{ padding: 20 }}>
      <h1>Join Party Payment</h1>
      <PayPalJoinParty partyId={partyId} ticketCount={ticketCount} amount={amount} />
    </div>
  );

}

export default App;


