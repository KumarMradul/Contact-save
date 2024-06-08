import './App.css'
import NavBar from './components/NavBar'
import { FiSearch } from 'react-icons/fi'
import { AiFillPlusCircle } from 'react-icons/ai'
import { useEffect, useState } from 'react'
import { collection,  getDocs, onSnapshot } from 'firebase/firestore'
import { db } from './config/Firebase'
import ContactCard from './components/ContactCard'
import  AddAndUdateContact  from './components/AddAndUdateContact'
import UseDisclouse from './hooks/useDisclouse'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContact from './components/NotFoundContact'
function App() {

  const [Contacts, setContacts] = useState([]);

  const {isOpen, onClose, onOpen}=  UseDisclouse();

  useEffect (() => {
    const getContacts = async () =>{
      try {
        const contactCollection = collection(db, "Contacts")
        const contactSnapshot  = await getDocs(contactCollection)

        onSnapshot(contactCollection, (Snapshot) => {
          const contactLists = Snapshot.docs.map ((doc)=> {
            return {
              id: doc.id,
              ...doc.data()
            }
          } )
          setContacts(contactLists)
          return contactLists
        })

      } catch (error) {
        console.log(error);
      }
    }
    getContacts();
  }, []);


  const filterContacts = (e) => {
    const value = e.target.value;

    const contactCollection = collection(db, "Contacts")
    onSnapshot(contactCollection, (Snapshot) => {
      const contactLists = Snapshot.docs.map ((doc)=> {
        return {
          id: doc.id,
          ...doc.data()
        }
      } )

      const filteredContacts = contactLists.filter(Contacts => Contacts.name.toLowerCase().includes(value.toLowerCase()))

      setContacts(filteredContacts)
      return filteredContacts
    })
  }
  return (
    <>
      <div className='mx-auto max-w-[370px] px-4'>
      <NavBar />
        <div className='flex gap-2'>
            <div className='relative flex  flex-grow items-center'>
            <FiSearch className='ml-1 absolute text-3xl text-white flex-grow' />
              <input 
              onChange={filterContacts}
              type="text" 
              className=' h-10 flex-grow border border-white bg-transparent rounded-md text-white pl-9'/>
            </div>

              <AiFillPlusCircle onClick={onOpen} className='text-5xl text-white cursor-pointer'/>


        </div>
        <div className='mt-4 gap-3 flex flex-col'>
          {
            Contacts.length <= 0 ? <NotFoundContact />: Contacts.map((Contacts) => (
              <ContactCard key={Contacts.id} Contacts={Contacts} />
            )
          )}
        </div>
      </div>
        <ToastContainer position="bottom-center" />
        <AddAndUdateContact 
          onClose = { onClose }
          isOpen = { isOpen }
        />
    </>
  )
}

export default App
