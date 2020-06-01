import React from 'react';
import styles from './header.module.scss'
import TabMenu from "./Tab/TabMenu";
import TabMenuDraw from "./Tab/TabMenuDraw";
import {userInterface} from "../../utils/const";
import History from 'history'


type MenuProps = {
    logout?: () => void,
    user: userInterface,
    direction: string,
    location: History.Location,
    setOpen?: (boolean: boolean) => void
}
const Menu: React.FC<MenuProps> = ({logout, user, direction, location, setOpen}) => {

    return (
        <>
            <div className={styles[`navigation-${direction}`]}>
                {direction === "column" && setOpen && logout ? <TabMenuDraw setOpen={setOpen} user={user} logout={logout}/> :
                    <TabMenu location={location}/>}
            </div>
        </>
    )
}


export default Menu

