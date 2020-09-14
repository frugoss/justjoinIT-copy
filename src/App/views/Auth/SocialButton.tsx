import styles from "./auth.module.scss";
import Button from "@material-ui/core/Button";
import React from "react";
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(createStyles({
    root: {
        borderRadius: 30,
        fontSize: 12,
        color: "rgb(117, 117, 117)",
        fontFamily: "Open Sans,sans-serif",
        textTransform: "none",
        minWidth: 190,
        width: "100%",
        height: 50,
        textAlign: "center",
        margin: "1px 1px 1px 1px"

    }
}));

type SocialButtonProps = {
    children: string,
    icon: string
}
const SocialButton: React.FC<SocialButtonProps> = ({children,icon}) => {
    const classes = useStyles();
    return (<div className={styles.padding}>
            <Button  className={classes.root} variant="contained" size="small"><img alt="logo" className={styles.socialImg} src={icon}/>{children}</Button>
        </div>

    )};
export default SocialButton





