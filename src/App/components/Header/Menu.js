import React from 'react';
import styles from './header.module.scss'
import TabMenu from "./Tab/TabMenu";
import TabMenuDraw from "./Tab/TabMenuDraw";


const Menu = ({logout, user, direction, location, setOpen}) => {

    return (
        <>
            <div className={styles[`navigation-${direction}`]}>
                {direction === "column" ? <TabMenuDraw setOpen={setOpen} user={user} logout={logout}/> :
                    <TabMenu location={location}/>}
            </div>
        </>
    )
}


export default Menu

