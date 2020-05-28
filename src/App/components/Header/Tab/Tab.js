import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './tab.module.scss';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    textTransform:"none",
    marginBottom:4,
    width: 140
  }});
const Tab = ({ text, to, isActive, img }) => {
  const buttonClass = useStyles();
  return (
      <Link to={to} style={{textDecoration: "none"}}>
        <Button className={`${styles.tab} ${buttonClass.root} ${isActive ? styles.activeTab : ''}`} startIcon={img}>{text}</Button>
      </Link>
  );
}

Tab.propTypes = {
  isActive: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  img: PropTypes.node.isRequired,
};


export default Tab;
