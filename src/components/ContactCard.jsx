import { deleteDoc, doc } from 'firebase/firestore'
import React from 'react'
import { HiOutlineUserCircle } from 'react-icons/hi'
import { IoMdTrash } from 'react-icons/io'
import { RiEditCircleLine } from 'react-icons/ri'
import { db } from '../config/Firebase'
import AddAndUdateContact from './AddAndUdateContact'
import UseDisclouse from '../hooks/useDisclouse'
import { toast } from 'react-toastify'

function ContactCard({Contacts}) {
  const {isOpen, onClose, onOpen}= UseDisclouse();

 
  const deleteContact = async(id) => {
    try {
       await deleteDoc(doc(db,"Contacts", id))
        toast.success("Contact Deleted Successfully")
    } catch (error) {
       console.log(error);
    }
  }

    return (
        <>
        <div key = {Contacts.id} className='bg-yellow flex justify-between  items-center p-2 rounded-lg'>
            
            <div className='flex gap-1'>
              <HiOutlineUserCircle className='text-orange text-4xl '/>
                <div className=''>
                  <h2 className='font-medium'>
                    {Contacts.name}
                  </h2>
                  <p className='text-sm'>
                    {Contacts.email}
                  </p>
                </div>
            </div>
    
              <div className='flex text-2xl '>

                <RiEditCircleLine onClick={onOpen}
                className='cursor-pointer' />

                <IoMdTrash onClick={ () => deleteContact(Contacts.id) } className='cursor-pointer text-orange'/>
              </div>
    
            </div>

            <AddAndUdateContact 
            Contacts ={Contacts}
            isUpdate 
            isOpen={isOpen} 
            onClose={onClose} 
            />
        </>
    )
}

export default ContactCard
