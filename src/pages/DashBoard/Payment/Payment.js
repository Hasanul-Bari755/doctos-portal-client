import React from 'react';
import { useLoaderData } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import {Elements} from '@stripe/react-stripe-js'
import Checkout from './Checkout';


const stripePromise = loadStripe(process.env.REACT_APP_stripe_pk);
console.log(stripePromise)

const Payment = () => {
    const booking = useLoaderData();
    console.log(booking)
    const {treatment,price,appointmentDate,slot } = booking;
    console.log(booking)
    return (
        <div>
            <h3 className='text-3xl'>Payment for {treatment}</h3>
            <p className='text-xl'>Please pay {price} for your appointment on {appointmentDate} at {slot}</p>
            <div className='W-96 my-12'>
                  <Elements stripe={stripePromise}>
                    <Checkout
                        booking={booking}
                    ></Checkout>
                  </Elements>
            </div>
        </div>
    );
};

export default Payment;