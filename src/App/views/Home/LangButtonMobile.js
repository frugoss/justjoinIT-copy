import React from "react";
import {Link} from "react-router-dom";
import styles from "./home.module.scss";
import ButtonBase from "@material-ui/core/ButtonBase";


const LangButtonMobile = ({to, name, isActive, img, filters, updateFilters, setOpen}) => {
    return (
        <div className={styles.langButtonContainer}>
            <Link to={`/${filters.city}/${to}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`}
                  style={{textDecoration: "none"}}>
                <ButtonBase disableRipple onClick={() => {
                    updateFilters("language", to)
                    setOpen(false)
                }}
                            className={isActive ? styles.langBtnActive : styles.langBtn}
                >
                    <img className={styles.langImg} src={img} alt="Logo"/> </ButtonBase>
                <div className={styles.test}>{name}</div>
            </Link>
        </div>
    )
}
export default LangButtonMobile;
