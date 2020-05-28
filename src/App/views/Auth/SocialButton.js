import styles from "./auth.module.scss";
import Button from "@material-ui/core/Button";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        borderRadius: 30

    },
    text: {
        fontSize: 12,
        color: "rgb(117, 117, 117)",
        fontFamily: "Open Sans,sans-serif",
        textTransform: "none"
    },
    socialButton: {
        minWidth: 177,
        width: "100%",
        height: 50,
        textAlign: "center",
        margin: "1px 1px 1px 1px"
}
});


const SocialButton = ({children,icon}) => {
    const classes = useStyles();
    return (<div className={styles.padding}>
            <Button  className={`${classes.root} ${classes.text} ${classes.socialButton}`} variant="contained" size="small"><img alt="logo" className={styles.socialImg} src={icon}/>{children}</Button>
        </div>

    )};
export default SocialButton





