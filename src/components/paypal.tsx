/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';

interface Props {
  partyId: string;
  ticketCount: number;
  amount: number;
}

const PayPalJoinParty: React.FC<Props> = ({ partyId, ticketCount, amount }) => {
  const [paid, setPaid] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [showButtons, setShowButtons] = useState(false);

  const handleApprove = async (data: any) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json', 
          'authorization': `Bearer ${import.meta.env.VITE_TOKEN}`  // Use your actual token here
        },
        body: JSON.stringify({
          orderId: data.orderID,  // PayPal Order ID
          partyId,
          ticket: ticketCount,
          amount,
        }),
      });
      const result = await response.json();

      if (result.success) {
        setPaid(true);
        setError(null);
      } else {
        setError(result.message || 'Join party failed');
      }
    } catch (err) {
      setError('Server error: ' + err);
    }
  };

  return (
    <div>
      {!paid && !showButtons && (
        <button onClick={() => setShowButtons(true)}>Join Now</button>
      )}

      {showButtons && !paid && (
        <PayPalScriptProvider
          options={{
            clientId: `${import.meta.env.VITE_CLIENT_ID}`,  
            currency: 'USD',
          }}
        >
          <PayPalButtons
            style={{ layout: 'vertical' }}
            createOrder={(data, actions) => {
              return actions.order.create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: 'USD',
                      value: amount.toFixed(2),
                    },
                  },
                ],
                intent: 'CAPTURE',
              });
            }}
            onApprove={async (data, actions) => {
              if (actions.order) {
                const details = await actions.order.capture();
                setOrderId(details.id || null);
                await handleApprove(data);
              }
            }}
            onError={(err) => {
              setError('PayPal error: ' + err);
            }}
          />
        </PayPalScriptProvider>
      )}

      {paid && <p>Payment successful! You joined the party.</p>}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default PayPalJoinParty;























