import List from "@material-ui/core/List";
import GroupRoundedIcon from '@material-ui/icons/GroupRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import RssFeedOutlinedIcon from '@material-ui/icons/RssFeedOutlined';
import PictureAsPdfOutlinedIcon from '@material-ui/icons/PictureAsPdfOutlined';
import {faCode} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import React from "react";
import {mdiFacebook} from '@mdi/js';
import DrawerButton from "./DrawerButton";
import Icon from '@mdi/react';
import jjit from "../../../assets/images/jjitLogo.png";
import styles from "./drawer.module.scss"


interface userInterface {
        auth: boolean;
        name: string;
        userID: string;
        loggedPopup: boolean;
        offPopup: boolean;
        createPopup: boolean;
        addPopup: boolean;
}
type InsideDrawerProps = {
    user:  userInterface,
    setOpen: (boolean:boolean) => void
}

const InsideDrawer: React.FC<InsideDrawerProps> = ({user, setOpen}) => {
    const buttons = [
        {
            to: '/facebook',
            text: 'Facebook',
            img: <Icon path={mdiFacebook} size={1} color={"rgb(117, 117, 117)"}/>,
        },
        {
            to: '/brands/story/just-join-it',
            text: 'About Us',
            img: <GroupRoundedIcon/>,
        },
        {
            to: '/event',
            text: 'Event',
            img: <MicRoundedIcon/>,
        },
        {
            to: '/rss',
            text: 'RSS',
            img: <RssFeedOutlinedIcon/>,
        },
        {
            to: '/terms-and-policies',
            text: 'Terms',
            img: <PictureAsPdfOutlinedIcon/>,
        },
        {
            to: '/terms-and-policies',
            text: 'Policy',
            img: <PictureAsPdfOutlinedIcon/>,
        }
    ];

    return(
        <div className={styles.view}>
            <img className={styles.img} src={jjit} alt="just join it logo"/>
            <hr className={styles.double}/>
            <List>
                {user.auth ? <DrawerButton setOpen={setOpen} to={"/dashboard"} text={"Dashboard"} img={<FontAwesomeIcon icon={faCode}/>}/> : <DrawerButton setOpen={setOpen} to={"/devs"} text={"Sign in"} img={<FontAwesomeIcon icon={faCode}/>}/> }
                {buttons.map(({to, text, img}) => (
                    <DrawerButton
                        setOpen={setOpen}
                        img={img}
                        key={text}
                        to={to}
                        text={text}
                    />
                ))
                }
            </List>
        </div>
    );
}

export default InsideDrawer
