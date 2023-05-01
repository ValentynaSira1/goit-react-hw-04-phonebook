import PropTypes from 'prop-types';
import css from './contactsListItem.module.css';

export const ContactsListItem =({name, number, id, deleteContact}) => {

    return (
      <li className={css.contacts__item}>
        {name}: {number}
        <button
          type="button"
          onClick={() => deleteContact(id)}
          className={css.button}
        >
          Delete
        </button>
      </li>
    );
}

ContactsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  number: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};