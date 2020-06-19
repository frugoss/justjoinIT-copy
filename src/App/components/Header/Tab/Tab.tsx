import React from 'react';
import { Link } from 'react-router-dom';
import styles from './tab.module.scss';
import Button from '@material-ui/core/Button';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(createStyles({
  root: {
    textTransform:"none",
    marginBottom:4,
    width: 140
  }}));
type TabProps = {
  text: string,
  to: string,
  isActive: boolean,
  img: React.ReactNode
}
const Tab: React.FC<TabProps> = ({ text, to, isActive, img }) => {
  const buttonClass = useStyles();
  return (
      <Link to={to} className={styles.linkStyle}>
        <Button className={`${styles.tab} ${buttonClass.root} ${isActive ? styles.activeTab : ''}`} startIcon={img}>{text}</Button>
      </Link>
  );
}

export default Tab;
