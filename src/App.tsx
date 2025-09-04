



import './App.css';
import PayPalJoinParty from './components/paypal';




function App() {
  const partyId = '68b961491c695b05582c676f';
  const ticketCount = 5;
  const amount = 100; // example amount in USD

  return (
    <div className='h-[100vh] flex items-center justify-center text-center bg-gray-400'>
      <div>
        <h1 className='text-blue-500 '>Join Party Payment</h1>
      <PayPalJoinParty partyId={partyId} ticketCount={ticketCount} amount={amount} />
      </div>
    </div>
  );

}

export default App;


