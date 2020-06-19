import React from "react";
import {Link} from "react-router-dom";
import styles from "./home.module.scss";
import ButtonBase from "@material-ui/core/ButtonBase";
import {makeStyles, createStyles} from "@material-ui/core/styles";
import {filtersInterface} from "../../utils/const";


const useStyles = makeStyles(createStyles({
    root: {
        borderRadius: 20,
        letterSpacing: 0.5,
        fontSize: 12.6,
        color: '#777777',
        height: 35,
        border: "1px solid",
        background: "white",
        padding: '0 12px',
        borderColor: "rgb(228, 232, 240)"
    }
}));

type AllButtonProps = {
    to: string,
    name: string,
    isActive: boolean
    filters: filtersInterface
    updateFilters: (key:string, value:string) => void
}
const AllButton: React.FC<AllButtonProps> = ({to, name, isActive, filters, updateFilters}) => {
    const classes = useStyles();
    return (
        <div className={styles.buttonContainer}>
            <Link to={`/${filters.city}/${to}/${filters.experience}`} className={styles.linkRouteAllBtn}>
                <ButtonBase  onClick={() => updateFilters("language",to)}  disableRipple
                            className={isActive ? styles.activeButton : ""}
                            classes={{root: classes.root}}>
                    {name}
                </ButtonBase>
            </Link>
        </div>
    )
}


export default AllButton;
