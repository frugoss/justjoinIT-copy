import React, {useState, forwardRef} from 'react';
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Divider from "@material-ui/core/Divider";
import Slide from '@material-ui/core/Slide';
import {makeStyles} from '@material-ui/core/styles';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styles from "./home.module.scss";
import ExperienceButtonMobile from './ExperienceButtonMobile'


const experience = ["All", "Junior", "Mid", "Senior"]
const sliderStyles = makeStyles({
    root: {
        background: "white",
        color: "rgb(171, 71, 188)"
    },
    salaryText: {
        display: "flex",
        justifyContent: "center"
    },
    expText: {
        display: "flex",
        justifyContent: "center",
        marginBottom: 10,
    },
    close: {
        position: "fixed",
        left:20,
        marginDown: 10
    }
})
const useStyles = makeStyles({
    root: {
        borderRadius: 20,
        letterSpacing: 0.5,
        fontSize: 12.6,
        color: '#777777',
        height: 35,
        textTransform: "none",
        background: "white",
        padding: '0 12px',
        borderColor: "rgb(228, 232, 240)",
        '&:hover': {
            borderColor: "rgb(186, 104, 200)",
            backgroundColor: "white"
        }
    }
});
const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});
const ExpSalaryFilterMobile = ({valuetext, updateFilter, filters, handleSliderChange, salaryfilter, handleSliderChangeCommitted}) => {
    const buttonClass = useStyles()
    const sliderClass = sliderStyles();
    const text = "Filters"
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
    return (
        <>
            <Button
                className={(Number(filters.salarymin) !== 0 || Number(filters.salarymax) !== 50 || filters.experience !== "all") ? `${styles.activeButton} ${buttonClass.root}` : buttonClass.root}
                variant="outlined" onClick={handleClickOpen}>
                {text}
            </Button>
            <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
                <div onClick={handleClose}>
                    <IconButton className={sliderClass.close} edge="start" color="inherit"
                                onClick={handleClose} aria-label="close">
                        <CloseIcon/>
                    </IconButton>
                    <h2 className={styles.textTitleMobile}>{text}</h2>
                    <Divider style={{marginTop: 45}}/>
                </div>

                <div style={{marginTop: 20}}>
                    <Typography className={sliderClass.expText} id="range-slider" gutterBottom>
                        Choose experience level
                    </Typography>
                    <div className={styles.expContainerMobile}>
                        {experience.map((lvl, index) => <ExperienceButtonMobile key={index}
                                                                                isActive={isActive(lvl.toLowerCase(), filters.experience)}
                                                                                filters={filters}
                                                                                updateFilters={updateFilter}
                                                                                name={lvl}/>)}
                    </div>
                    <div className={styles.salaryContainerMobile}>
                        <Typography className={sliderClass.salaryText} id="range-slider" gutterBottom>
                            Choose salary in thousands (PLN)
                        </Typography>
                        <Slider className={sliderClass.root}
                                max={50}
                                value={salaryfilter}
                                onChange={handleSliderChange}
                                onChangeCommitted={handleSliderChangeCommitted}
                                valueLabelDisplay="auto"
                                aria-labelledby="salary-slider"
                                getAriaValueText={valuetext}
                        />
                    </div>
                </div>
            </Dialog>
        </>
    )


}

export default ExpSalaryFilterMobile;