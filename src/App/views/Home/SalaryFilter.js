import React from 'react';
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styles from "./home.module.scss";

const filterStyles = makeStyles(theme =>({
    root: {
        color: "rgb(171, 71, 188)"
    },
}));

const useStyles = makeStyles({
    root: {
        maxWidth: 170,
        marginRight:10,
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
    }
});

const SalaryFilter = ({valuetext, filters, handleSliderChange, salaryfilter, handleSliderChangeCommitted}) => {

    const sliderClass = filterStyles()
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

    let salaryCases;
    if (salaryfilter[0] !== 0 && salaryfilter[1] !== 50) {
        salaryCases = String(salaryfilter[0]) + "k - " + String(salaryfilter[1]) + "k"
    } else if (salaryfilter[0] === 0 && salaryfilter[1] !== 50) {
        salaryCases = "<" + String(salaryfilter[1]) + "k";
    } else if (salaryfilter[0] !== 0 && salaryfilter[0] !== 50 && salaryfilter[1] === 50){
        salaryCases = ">" + String(salaryfilter[0]) + "k";
    } else if(salaryfilter[0] === 50 && salaryfilter[1] === 50){
        salaryCases = String(salaryfilter[0]) + "k+"
    }
    return(
        <>
            <Button  aria-describedby={id} onClick={handleClick} className={(Number(filters.salarymin) !== 0 || Number(filters.salarymax) !== 50) ? `${styles.activeButton} ${buttonClass.root}` : buttonClass.root} variant="outlined">
               <AttachMoneyIcon style={{marginRight:3, fontSize:17}}/> Salary {salaryCases} <ArrowDropDownIcon/>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
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
                <div style={{width:250, marginLeft:50, height:65, marginTop: 10}}>
                    <h4 style={{fontSize:16, marginLeft:30}}>In thousands (PLN)</h4>
                    <div style={{width:200}}>
                        <Typography id="range-slider" gutterBottom>
                        </Typography>
                        <Slider
                            className={sliderClass.root}
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

            </Popover>
        </>
    )




}

export default SalaryFilter;