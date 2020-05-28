import React from 'react';
import ButtonBase from "@material-ui/core/ButtonBase";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from 'react-router-dom';
import styles from "./home.module.scss";


const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        letterSpacing: 0.5,
        fontSize: 12.6,
        borderColor: 'rgb(186, 104, 200)',
        height: 35,
        background: "white",
        padding: '10px 12px',
        marginRight: 12,
        marginBottom: 12,
        color: '#777777',
        border: "1px solid"

    },

});

const FilterButtonMobile = ({name, to, isActive, filters, updateFilters, setOpen}) => {

    const classes = useStyles();
    return (
        <>
            <Link to={`/${to}/${filters.language}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`} style={{textDecoration: "none"}}>
                <ButtonBase onClick={() => {
                    updateFilters("city",to)
                    setOpen(false)
                }} className={isActive ? styles.activeButton : ''}
                            classes={{root: classes.root}}>{name}</ButtonBase>
            </Link>
        </>
    )
};

export default FilterButtonMobile;


