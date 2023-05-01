import { useState } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types'; 
import css from './contactsForm.module.css';

export const ContactsForm = ({ onSubmit }) => {
    const [name, setName] = useState ('');
    const [number, setNumber] = useState ('');  
  
const handleChange = e => {
      const target = e.target.name;
      if (target === 'name') {
        setName(e.target.value);
      } else {
        setNumber(e.target.value);
      }
    };
  
    const handleSubmit = e => {
      e.preventDefault();
  
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      onSubmit(newContact);
  
    setName (''); 
    setNumber ('');
    };
  
      return (
        <form onSubmit={handleSubmit} className={css.form}>
          <label>
            Name
            <input
              className={css.input}
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={handleChange}
              value={name}
            />
          </label>
          <label>
            Number
            <input
              className={css.input}
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={handleChange}
              value={number}
            />
          </label>
          <button type="submit">Add contacts</button>
        </form>
      );
    };
  
  ContactsForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };