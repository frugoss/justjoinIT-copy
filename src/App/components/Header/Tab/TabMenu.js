import WorkOutlineOutlinedIcon from "@material-ui/icons/WorkOutlineOutlined";
import BusinessOutlinedIcon from "@material-ui/icons/BusinessOutlined";
import React from "react";
import Tab from "./Tab";
import {faNewspaper} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faHandshake} from '@fortawesome/free-solid-svg-icons';
import TabOffers from "./TabOffers";


const tabs = [
    {
        to: '/ski-cams',
        text: 'Brand Stories',
        img: <BusinessOutlinedIcon/>,
    },
    {
        to: '/justgeekit',
        text: 'Just Geek IT',
        img: <FontAwesomeIcon icon={faNewspaper}/>,
    },
    {
        to: '/devs',
        text: 'Matchmaking',
        img: <FontAwesomeIcon icon={faHandshake}/>

    }
];


const TabMenu = ({location}) => {
    const isActive = destination => location.pathname === destination;
    return (
        <>
            <TabOffers location={location} to="/" text="Job Offers" img={<WorkOutlineOutlinedIcon/>}/>
            {tabs.map(({to, text, img}) => (
            <Tab
                img={img}
                key={to}
                to={to}
                text={text}
                isActive={isActive(to)}
            />

        ))
        }
        </>
    )
};

export default TabMenu;
