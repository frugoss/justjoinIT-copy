import React from "react";
import styles from "../Home/home.module.scss";
import ButtonBase from "@material-ui/core/ButtonBase";


const Icons = ({name, to, img, onChange, color, background}) => {
    return (
        <div className={styles.iconContainerAdd}>
            <ButtonBase disableRipple onClick={() => {
                onChange({name: to, img, background, color})
            }}
            >
                <img className={styles.langImg} src={img} alt="Logo"/> </ButtonBase>
            <div className={styles.test}>{name}</div>
        </div>
    )
};


export default Icons;
