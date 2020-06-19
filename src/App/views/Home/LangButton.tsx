import React from "react";
import {Link} from "react-router-dom";
import styles from "./home.module.scss";
import ButtonBase from "@material-ui/core/ButtonBase";
import {filtersInterface} from "../../utils/const";

type LangButtonProps = {
    to: string,
    name: string,
    isActive: boolean,
    img: string,
    filters: filtersInterface,
    updateFilters: (key:string, value:string) => void
}
const LangButton:React.FC<LangButtonProps> = ({to, name, isActive, img, filters, updateFilters}) => {
    return (
        <div className={styles.langButtonContainer}>
            <Link to={`/${filters.city}/${to}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`}
                  className={styles.linkRoute}>
                <ButtonBase disableRipple onClick={() => updateFilters("language", to)}
                            className={isActive ? styles.langBtnActive : styles.langBtn}
                >
                    <img className={styles.langImg} src={img} alt="Logo"/> </ButtonBase>
                <div className={styles.test}>{name}</div>
            </Link>
        </div>
    )
}


export default LangButton;
