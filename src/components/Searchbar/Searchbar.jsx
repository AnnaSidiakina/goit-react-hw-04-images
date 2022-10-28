import { BsSearch } from 'react-icons/bs';
import PropTypes from 'prop-types';
import { useState } from 'react';
import styles from './Searchbar.module.css';

const Searchbar = ({ onSubmit, loading }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => setQuery(event.currentTarget.value);
  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
    reset();
  };
  function reset() {
    setQuery('');
  }

  return (
    <header className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button
          type="submit"
          className={styles.SearchFormButton}
          disabled={loading}
        >
          <BsSearch />

          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          onChange={handleInputChange}
          className={styles.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Searchbar;
