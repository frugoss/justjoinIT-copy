import React from 'react';
import Button from "@material-ui/core/Button";
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import styles from "./home.module.scss";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


const useStyles = makeStyles({
    root: {
        maxWidth: 175,
        borderRadius: 20,
        height:40,
        letterSpacing: 0.5,
        fontSize: 12.6,
        color: '#777777',
        textTransform: "none",
        background: "white",
        padding: '0 12px',
        borderColor: "rgb(228, 232, 240)",
        '&:hover': {
            borderColor: "rgb(186, 104, 200)",
            backgroundColor: "white"
        }
    },
    position:{
        marginRight:3,
        fontSize: 17
    }
});

const ExpFilter = ({filters, updateFilters}) => {
    const buttonClass = useStyles()

    const [anchorEl, setAnchorEl] = React.useState(null);



    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return(
        <>
            <Button  aria-describedby={id} onClick={handleClick} className={filters.experience !== "all" ? `${styles.activeButton} ${buttonClass.root}` : buttonClass.root} variant="outlined">
               <TrendingUpIcon className={buttonClass.position}/>Exp. {filters.experience !== "all" ? filters.experience : ""} level <ArrowDropDownIcon/>
            </Button>
            <Menu
                style={{marginTop:37}}
                id="exp-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <MenuItem onClick={() => {
                    updateFilters("experience", "all")
                    handleClose()
                }}>All</MenuItem>
                <MenuItem onClick={() => {
                    updateFilters("experience", "junior")
                    handleClose()
                }}>Junior</MenuItem>
                <MenuItem onClick={() => {
                    updateFilters("experience", "mid")
                    handleClose()
                }}>Mid</MenuItem>
                <MenuItem onClick={() => {
                    updateFilters("experience", "senior")
                    handleClose()}}>Senior</MenuItem>
            </Menu>
        </>
    )
}

export default ExpFilter;