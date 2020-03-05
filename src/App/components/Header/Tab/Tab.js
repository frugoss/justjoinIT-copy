import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './tab.module.scss';
import Button from '@material-ui/core/Button';

const Tab = ({ text, to, isActive, img }) => (
  <Link to={to} style={{textDecoration: "none"}}>
    <Button style={{textTransform:"none", marginBottom:4}} className={`${styles.tab} ${styles.tab} ${isActive ? styles.activeTab : ''}`} startIcon={img}>{text}</Button>
  </Link>
);

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  img: PropTypes.node.isRequired,
};


export default Tab;
