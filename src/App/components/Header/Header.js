import React from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import styles from './header.module.scss';
import jjit from '../../assets/images/jjitLogo.png';
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import {withStyles} from '@material-ui/core/styles';
import InsideDrawer from "./Drawer/InsideDrawer";
import TabMenu from "./Tab/TabMenu";
import {Link} from 'react-router-dom';


const Header = ({location}) => {
    const StyledButton = withStyles({
        root: {
            borderRadius: 30,
            border: 0,
            color: 'white',
            height: 42,
            width: 110,
            padding: '0px 22px',
            backgroundColor: "#ff4081",
            fontSize: 14,
            fontWeight: 600,
            margin: "0px 2px 0px 5px",
            fontFamily: "Open Sans,sans-serif",
        },
    })(ButtonBase);

    const [open, setOpen] = React.useState(false);

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <Link to={'/'}><img src={jjit} alt="just join it logo"/></Link>
                <TabMenu location={location}/>
            </div>
            <div className={styles.navigation}>
                <Link style={{textDecoration: "none"}} to={"/add-offer"}>
                <StyledButton>Post a job</StyledButton>
                </Link>
                <Link style={{textDecoration: "none"}} to={"/devs"}> <StyledButton style={{backgroundColor: "#ab47bc"}}>Sign
                    in</StyledButton></Link>
                <IconButton onClick={() => setOpen(!open)} aria-label="drawer">
                    <MenuRoundedIcon/>
                </IconButton>
                <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                    <InsideDrawer/>
                </Drawer>
            </div>
        </div>
    );
};

Header.propTypes = {
    location: PropTypes.object.isRequired,
};

export default withRouter(Header);
