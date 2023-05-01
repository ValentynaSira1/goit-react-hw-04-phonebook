import { useState, useEffect, useRef } from 'react';
import { ContactsList } from '../components/contacts/contactsList/contactsList';
import { ContactsForm } from './contactsForm/contactsForm';
import { Filter } from './filter/filter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import css from './App.module.css';

export const App = () => {
  const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);
  const [filter, setFilter] = useState('');

  const firstRender = useRef(true)

  useEffect(() => {
    if (firstRender.current) {
        const savedContacts = localStorage.getItem('contacts_book');
        if (savedContacts) {
          setContacts(JSON.parse(localStorage.getItem('contacts_book')));
        }
        firstRender.current = false;
        return
      }
     localStorage.setItem('contacts_book', JSON.stringify(contacts));
    }, [contacts]);
    
  const addContact = newContact => {
      if (
        contacts.find(
          contact =>
            contact.name.toLowerCase() === newContact.name.toLowerCase() ||
            contact.number === newContact.number
        )
      ) {
        return toast.error(
          `${newContact.name} or ${newContact.number} is already in contacts`
        );
      }
      setContacts(prevContacts => [...prevContacts, newContact]);
    };
  
  const deleteContact = id => {
    setContacts(prevContacts =>
      prevContacts.filter(contact => contact.id !== id)
    );
  };
  
  const changeFilter = e => {
      setFilter (e.target.value);
    };
  
  const filteredContacts = () => {
      return contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      );
    };
  
    return (
        <div className={css.container}>
          <h1>Phonebook</h1>
          <ContactsForm onSubmit={addContact} />
  
          <h2>Contacts</h2>
          <Filter handleChange={changeFilter} value={filter} />
          <ContactsList
            contacts={filteredContacts()}
            deleteContact={deleteContact}
          />
          <ToastContainer position="top-center" autoClose={2000} theme="dark" />
        </div>
    );
  };


