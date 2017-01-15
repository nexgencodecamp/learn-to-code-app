import React from 'react';
import ReactSelect from 'react-select';
import styles from './Select.scss';

const ReactSelectWrapper = (props) => {
  return (
      <div className={styles.select}><ReactSelect {...props} /></div>
  );
};

ReactSelectWrapper.propTypes = {};
ReactSelectWrapper.defaultProps = {};

export default ReactSelectWrapper;
