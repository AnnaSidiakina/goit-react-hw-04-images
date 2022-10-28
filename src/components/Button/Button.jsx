import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css';

const LoadMoreButton = ({ onLoadMore, isLoading }) => {
  return (
    <div className={styles.buttonContainer}>
      <button
        onClick={onLoadMore}
        disabled={isLoading}
        type="button"
        className={styles.Button}
      >
        Load more
      </button>
    </div>
  );
};

LoadMoreButton.propTypes = {
  onLoadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default LoadMoreButton;
