import React, { useContext } from 'react';
import { format } from 'date-fns';
import { AuthContext } from '../../../contexts/AuthProvider';

import toast from 'react-hot-toast';
const BookingModal = ({ treatment,setTreatment, selectedDate,refetch }) => {
    
    const { name, slots } = treatment; //treatment is appointment options
   
    const date = format(selectedDate, 'PP')
    const {user} =  useContext(AuthContext)
    
    const handleBooking = event => {
        event.preventDefault();
        const form = event.target;
        const slot = form.slot.value;
        const name = form.name.value;
        const email = form.email.value;
        const phone = form.phone.value;

        const booking = {
            appintmentDate: date,
            treatment: treatment.name,
            patient: name,
            slot,
            email,
            phone
        }
   
        fetch('http://localhost:5000/bookings', {
            method: 'POST',
            headers: {
                 'content-Type': 'application/json'
            },
            body:JSON.stringify(booking)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                     setTreatment(null)
                    toast.success('Booking confirmed')
                    refetch()
                }
                else {
                    toast.error(data.message)
                }
               
        })
 
    }
    

    return (
        <>
            <input type="checkbox" id="booking-modal" className="modal-toggle" />
            <div className="modal">
            <div className="modal-box relative">
                <label htmlFor="booking-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className="text-lg font-bold">{name}</h3>
                <form onSubmit={handleBooking} className='grid grid-cols-1 gap-4 mt-10'>
                      <input type="text" disabled value={date} className="input w-full input-bordered" />  
                      <select name='slot' className="select select-bordered w-full">
                            
                            {
                                slots.map((slot, index) => <option
                                key={index}    value={slot}>{slot}</option>)
                            }
                      </select>
                      <input name='name' type="text" disabled defaultValue={user?.displayName} placeholder="Your Name" className="input w-full input-bordered" />  
                      <input name='email' type="email" disabled defaultValue={user?.email} placeholder="Email Address" className="input w-full input-bordered" />  
                      <input name='phone' type="text" placeholder="Phone" className="input w-full input-bordered" />  
                         

                        <input className='btn btn-accent w-full' type="submit" value="Submit" />
                </form>
            </div>
            </div>
        </>
    );
};

export default BookingModal;