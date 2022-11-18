import React, {  useState } from 'react';
import { format } from 'date-fns';
import AppointmentOption from './AppointmentOption';
import BookingModal from '../BookingModal/BookingModal';
import { useQuery } from '@tanstack/react-query';
import Loading from '../../Shared/Loading/Loading';

const AvailableAppointment = ({ selectedDate }) => {
     
    // const [appointmentOption, setAppointmentOption] = useState([])
    const [treatment, setTreatment] = useState(null)
    
    const date = format(selectedDate, 'PP');

    const {data:appointmentOption=[],refetch,isLoading } = useQuery({
        queryKey: ['appointmentOption',date],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/appointmentOption?date=${date}`)
            const data = await res.json()
            return data
        }
    })
    
    // useEffect(() => {
    //     fetch('http://localhost:5000/appointmentOption')
    //         .then(res => res.json())
    //     .then(data => setAppointmentOption(data))
    // },[])

    if (isLoading) {
        return <Loading></Loading>
    }

   
    return (
        <section className='my-16'> 
            <p className='text-center text-secondary font-bold'>Available Appointments {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
                {
                    appointmentOption.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                selectedDate={selectedDate}       
                treatment={treatment} 
                        setTreatment={setTreatment}
                        refetch={refetch}
            ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointment;