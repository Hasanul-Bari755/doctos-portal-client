import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConformationModal from '../../Shared/ConformationModal/ConformationModal';
import Loading from '../../Shared/Loading/Loading';

const ManageDoctors = () => {
    const [deletingDoctor, setDeletingDoctor] = useState(null);

    const closeModal = () => {
        console.log('hasan')
        setDeletingDoctor(null)
    }



    const { data: doctors,isLoading,refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async()=> {
            try {
                const res = await fetch('http://localhost:5000/doctors', {
                    headers: {
                        authorization:`bearer ${localStorage.getItem('accessToken')}`
                    }
                });
                const data = await res.json();
                return data;

            }
            catch(error) {
                
            }
        }
    })

        const handleDeleteDoctor = doctor => {
        fetch(`http://localhost:5000/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount >0) {
                     console.log(data)
                    refetch()
                    toast.success('Delete successfully')
                }
               
        })
    }

    if (isLoading) {
        return <Loading></Loading>
    }
    return (
        <div>
            <h2 className='text-4xl'>Manage Doctors: {doctors?.length}</h2>
            
            <div className="overflow-x-auto">
  <table className="table w-full">
   
    <thead>
      <tr>
        <th></th>
        <th>Avater</th>
        <th>Name</th>
        <th>Email</th>
        <th>Specialty</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
    
     {
          doctors?.map((doctor,i) =>  <tr key={doctor._id}>
              <th>{i+1 }</th>
        <td><div class="avatar">
                <div class="w-24 rounded-full">
                      <img src={doctor.image } alt='' />
                </div>
                </div></td>
              <td>{doctor.name}</td>
              <td>{doctor.email }</td>
              <td>{doctor.specialty }</td>
              <td>
                    <label onClick={() =>setDeletingDoctor(doctor)} htmlFor="conformationModal" className="btn  btn-sm btn-error">Delete</label>
                
              </td>
      </tr>)                
       }
  
     
    </tbody>
  </table>
            </div>
            
         {
                deletingDoctor && <ConformationModal
                    title={`Are you sure want to delete?`}
                    message={`If you delete ${deletingDoctor.name}.It cannot be undone`}
                    closeModal={closeModal}
                    successAction={handleDeleteDoctor}
                    modalData={deletingDoctor}
                    successButtonName='Delete'
                ></ConformationModal>
         }   
        </div>
    );
};

export default ManageDoctors;