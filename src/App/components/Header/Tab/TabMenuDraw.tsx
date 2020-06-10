import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import React from "react";
import TabDraw from "./TabDraw";
import {faCode, faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandshake} from '@fortawesome/free-solid-svg-icons';
import List from "@material-ui/core/List";
import DrawerButton from "../Drawer/DrawerButton";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {userInterface} from '../../../utils/const'


type TabMenuDrawProps = {
    user: userInterface,
    logout: () => void,
    setOpen:  React.Dispatch<React.SetStateAction<boolean>>
}

const tabs = [
    {
        to: "/",
        text: "Job Offers",
        img: <WorkOutlineOutlinedIcon/>,
    },
    {
        to: '/ski-cams',
        text: 'Brand Stories',
        img: <BusinessOutlinedIcon/>,
    },
    {
        to: '/justgeekit',
        text: 'Just Geek IT',
        img: <FontAwesomeIcon icon={faNewspaper} size="lg"/>,
    },
    {
        to: '/devs',
        text: 'Matchmaking',
        img: <FontAwesomeIcon icon={faHandshake} size="lg"/>

    }
];


const TabMenuDraw: React.FC<TabMenuDrawProps> = ({user, logout, setOpen}) => {
    return (
        <>
            {user.auth ?
                    <DrawerButton setOpen={setOpen} to={"/dashboard"} text={"Dashboard"} img={<FontAwesomeIcon icon={faCode}/>}/>
             :<DrawerButton setOpen={setOpen} to={"/devs"} text={"Sign in"} img={
                <FontAwesomeIcon icon={faCode}/>}/>}
            <List> {tabs.map(({to, text, img}) => (
                <TabDraw
                    setOpen={setOpen}
                    img={img}
                    key={to}
                    to={to}
                    text={text}
                />

            ))
            }
                {user.auth ? <DrawerButton setOpen={setOpen} logout={logout} to={"/"} text={`Logout ${user && user.name ? user.name.slice(0, user.name.indexOf('@')): ""}`}  img={<ExitToAppIcon/>} />
                    : ""}
            </List>
        </>
    )

};

export default TabMenuDraw;
