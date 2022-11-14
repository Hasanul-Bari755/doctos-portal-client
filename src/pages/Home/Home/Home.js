import React from 'react';
import Banner from '../Banner/Banner';
import DentalCare from '../DentalCare/DentalCare';
import Infocards from '../Infocards/Infocards';
import MakeAppintment from '../MakeAppointment/MakeAppintment';
import Services from '../Services/Services';
import Testimonial from '../Testimonial/Testimonial';

const Home = () => {
    return (
        <div className='mx-5'>
            <Banner></Banner>
            <Infocards></Infocards>
            <Services></Services>
            <DentalCare></DentalCare>
            <MakeAppintment></MakeAppintment>
            <Testimonial></Testimonial>
        </div>
    );
};

export default Home;