import React from 'react';
import {Link} from 'react-router-dom';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles,createStyles } from '@material-ui/core/styles';


type DrawerButtonProps = {
    to: string,
    text: string,
    img: React.ReactNode,
    setOpen: (boolean:boolean) => void,
    logout?: () => void
}
const useStyles = makeStyles(createStyles({
    root: {
        color: "#B0BAC9",
        fontSize: 14,
        textDecoration: "none",
        fontWeight: 400,
        lineHeight: 1.5,
        width: "100%",
        alineHeight: 56,
        padding: "6px 6px 5px 0px",
    }
}));

const DrawerButton: React.FC<DrawerButtonProps> = ({to, text, img, setOpen, logout}) => {
    const classy = useStyles();
    return (
        <>
            <Link  onClick={() => setOpen(false)} to={to} style={{textDecoration: "none"}}>
                <ListItem onClick={to === "/" ? () => logout && logout() : () => ""} style={{width:310}}>
                    <ListItemIcon style={{marginLeft:5}}>
                        {img}
                    </ListItemIcon>
                    <ListItemText  className={classy.root} primary={text} />
                </ListItem>
            </Link>
        </>
    );
};


export default DrawerButton
