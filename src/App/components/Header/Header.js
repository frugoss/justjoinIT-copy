import React from 'react';
import {withRouter} from 'react-router-dom';
import styles from './header.module.scss';
import jjit from '../../assets/images/jjitLogo.png';
import Drawer from '@material-ui/core/Drawer';
import MenuRoundedIcon from '@material-ui/icons/MenuRounded';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden'
import InsideDrawer from "./Drawer/InsideDrawer";
import {Link} from 'react-router-dom';
import Menu from "./Menu"
import {withStyles} from "@material-ui/core/styles";
import ButtonBase from "@material-ui/core/ButtonBase";



const Header = ({location, setUser, user}) => {
    const logout = () => {
        setUser({...user, auth: false, offPopup: true})
        try {
            fetch("http://192.168.10.25:7000/devs/logout", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })

        } catch (err) {
        }
    }
    const StyledButton = withStyles({
        root: {
            borderRadius: 30,
            border: 0,
            color: 'white',
            height: 42,
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
        <>
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <Link to="/"><img style={{marginRight: 10}} src={jjit} alt="just join it logo"/></Link>
                <Hidden smDown>
                    <Menu location={location} user={user} setUser={setUser} direction="row" />
                </Hidden>
            </div>
            <Hidden smDown>
            <div className={styles.flexRow}>
                <Link className={styles.hideButton} style={{textDecoration: "none"}} to={"/add"}>
                    <StyledButton>Post a job</StyledButton>
                </Link>
                {!user.auth ?
                    <Link style={{textDecoration: "none"}} to={"/devs"}> <StyledButton
                        style={{backgroundColor: "#ab47bc"}}>Sign
                        in</StyledButton></Link> :
                    <Link style={{textDecoration: "none"}} to={"/"}> <StyledButton onClick={() => logout()} style={{
                        backgroundColor: "#ab47bc"
                    }}>Logout {user && user.name ? user.name.slice(0, user.name.indexOf('@')) : ""}</StyledButton></Link>
                }
            </div>
            </Hidden>
                <>
                <IconButton onClick={() => setOpen(!open)} aria-label="drawer">
                    <MenuRoundedIcon/>
                </IconButton>
                <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
                    <Hidden smDown>
                    <InsideDrawer setOpen={setOpen} user={user}/>
                    </Hidden>
                    <Hidden mdUp>
                        <div className={styles.view}>
                            <img className={styles.img} src={jjit} alt="just join it logo"/>
                            <hr className={styles.double}/>
                        <Menu setOpen={setOpen} logout={logout} location={location} user={user} setUser={setUser} direction="column" />
                        </div>
                    </Hidden>
                </Drawer>
                </>

        </div>

        </>
    );
};

export default withRouter(Header);
