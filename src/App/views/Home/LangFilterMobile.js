import React, {useState, forwardRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import LangButtonMobile from "./LangButtonMobile";
import AllButtonMobile from "./AllButtonMobile";
import styles from "./home.module.scss";

const useStyles = makeStyles({
    root: {
        display:"flex",
        width:"100%",
        borderRadius: 20,
        letterSpacing: 0.5,
        fontSize: 12.6,
        textTransform: "none",
        color: '#777777',
        height: 35,
        background: "white",
        borderColor: "rgb(228, 232, 240)",
        '&:hover': {
            borderColor: "rgb(186, 104, 200)",
            backgroundColor: "white"
        }
    },
    close: {
        position: "fixed",
        left:20,
        marginDown: 10
    }
});
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const LangFilterMobile = ({filters, language, updateFilters}) => {
    const buttonClass = useStyles()
    const [langImg, setLangImg] = useState(""
    )
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const isActive = (link, filter) => {
        return filter === link
    };

    const imgFiltered = language.filter(item => item.to === filters.language)
    return (
        <>
            <Button className={imgFiltered[0] && isActive(imgFiltered[0].to, filters.language) && imgFiltered[0].to !== "all" ? `${styles.activeButton} ${buttonClass.root}` : buttonClass.root} variant="outlined" onClick={handleClickOpen}>
                {imgFiltered[0] ? <div className={styles.langButtonMobile}><img alt="logo" className={styles.logoLang} src={imgFiltered[0].img}/> {imgFiltered[0].name}</div> : "Technology"}
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <div onClick={handleClose}>
                    <IconButton className={buttonClass.close} edge="start" color="inherit"
                                onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <h2 className={styles.textTitleMobile}>Language</h2>
                </div>
                <Divider style={{marginTop:45}} />
                <div className={styles.languagePositionMobile}>
                    <AllButtonMobile lang={langImg} setOpen={setOpen} setLang={setLangImg} filters={filters} name="All" to="all" key="all"
                                     updateFilters={updateFilters}
                                     isActive={isActive("all", filters.language)}/>
                    {language && language.map(({name, to, img}) => (

                            <LangButtonMobile lang={langImg} setOpen={setOpen} setLang={setLangImg} filters={filters} name={name} img={img}
                                              to={to} key={to} updateFilters={updateFilters}
                                              isActive={isActive(to, filters.language) || isActive("all", filters.language)}>

                            </LangButtonMobile>

                        )
                    )}
                </div>

            </Dialog>
        </>
    );
}

export default LangFilterMobile;