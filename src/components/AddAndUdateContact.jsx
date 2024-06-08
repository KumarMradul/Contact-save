import React from 'react'
import {ErrorMessage, Field, Form, Formik} from 'formik'
import Modal from './Modal'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/Firebase'
import { toast } from 'react-toastify'
import * as Yup from "yup";

const contactSchemaValidation = Yup.object().shape({
  name: Yup.string().required("Name is Required"),
  email: Yup.string().email("Invalid Email").required("Email is Required")
})

function AddAndUdateContact({ isOpen, onClose, isUpdate, Contacts}) {

  const addContact = async (contact) => {
    try {
      const contactCollection = collection(db, "Contacts");
      await addDoc(contactCollection, contact)
      onClose();
      toast.success("Contact Added Seccesfully")
    } catch (error) {
      console.log(error);
      
    }
  };
  const updateContact = async (contact, id) => {
    try {
      const contactCollection = doc(db, "Contacts", id);
      await updateDoc(contactCollection, contact)
      onClose();
      toast.success("Contact Updated Seccesfully")
    } catch (error) {
      console.log(error);
      
    }
  };


    return (
       <div>
        <Modal isOpen={isOpen} onClose={onClose}>
          <Formik
            validationSchema={contactSchemaValidation}
            initialValues={
              isUpdate ? {
                name: Contacts.name,
                email: Contacts.email,
            }:
            {
              name:"",
              email: "",
            }
            }
            onSubmit={(values) => {
              console.log(values);
              isUpdate ?
              updateContact(values, Contacts.id) :
              addContact(values)
            }}
          >
            <Form className='flex flex-col'>
              <div className='flex flex-col gap-1'>
                <label htmlFor="name">Name</label>
                <Field name = 'name' className = 'border h-10' />
                <div className=' text-xs text-red-500'>
                  <ErrorMessage name='name' />
                </div>
              </div>
              <div className='flex flex-col gap-1'>
                <label htmlFor="Email">Email</label>
                <Field /*type = "email" */ name = 'email' className = 'border h-10' />
                <div className=' text-xs text-red-500'>
                  <ErrorMessage name ='email' />
                </div>
              </div>

              <button type='submit' className='bg-orange px-3 py-1.5 border self-end mt-6' >
                {isUpdate ? "Update" : "Add"} Contact
              </button>
            </Form>
          </Formik>
        </Modal>
       </div> 
    )
}

export default AddAndUdateContact
