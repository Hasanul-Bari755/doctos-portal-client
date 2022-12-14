
import { useQuery } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyAppointment = () => {

    const { user } = useContext(AuthContext);

    console.log(user.email)
   
   
      const url = `http://localhost:5000/bookings?email=${user?.email}`;

 const { data: bookings = [] } = useQuery({
        queryKey: ['bookings', user?.email],
        queryFn: async () => {
            const res = await fetch(url, {
                headers: {
                    authorization:`bearer ${localStorage.getItem('accessToken')}` 
                }
            });
            const data = await res.json();
            return data;
        }
 })
    
    console.log(bookings)
    

    return (
        <div>
            <h2 className='mb-5'>My appointment</h2>
            <div className="overflow-x-auto">
                <table className="table w-full">
                   
                    <thead>
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Treatment</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Payment</th>
                    </tr>
                        
                    </thead>
                    <tbody>
                  
                        {
                            bookings.map((booking,index) => <tr key={booking._id}>
                                <th>{index+1 }</th>
                                <td>{booking.patient }</td>
                                <td>{booking.treatment }</td>
                                <td>{ booking.appintmentDate}</td>
                                <td>{booking.slot}</td>
                                <td>
                                    {
                                        booking.price && !booking.pain &&
                                        <Link to={`/dashboard/payment/${booking._id}`}> 
                                                <button className='btn btn-primary btn-sm'>Pay</button>
                                        </Link>
                                    }
                                    {
                                        booking.price && booking.paid && 
                                        <span className='text-primary'>paid</span>
                                    }
                                </td>
                                
                    </tr> )
                        }
                    </tbody>
                </table>
                </div>
        </div>
    );
};

export default MyAppointment;