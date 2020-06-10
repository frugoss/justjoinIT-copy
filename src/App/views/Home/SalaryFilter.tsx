import React from 'react';
import Button from "@material-ui/core/Button";
import Popover from '@material-ui/core/Popover';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import styles from "./home.module.scss";
import {filtersInterface} from "../../utils/const";

const filterStyles = makeStyles(createStyles({
    root: {
        color: "rgb(171, 71, 188)"
    },
}));

const useStyles = makeStyles(createStyles({
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
}));

type SalaryFilterProps = {
    valuetext: (value: number) => string,
    filters: filtersInterface,
    handleSliderChange:(event: React.ChangeEvent<{}>, newValue:number[] | number) => void,
    salaryFilter: number[],
    handleSliderChangeCommitted: (event: React.ChangeEvent<{}>, newValue: number[] | number) => void
}
const SalaryFilter: React.FC<SalaryFilterProps> = ({valuetext, filters, handleSliderChange, salaryFilter, handleSliderChangeCommitted}) => {

    const sliderClass = filterStyles()
    const buttonClass = useStyles()
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    let salaryCases;
    if (salaryFilter[0] !== 0 && salaryFilter[1] !== 50) {
        salaryCases = String(salaryFilter[0]) + "k - " + String(salaryFilter[1]) + "k"
    } else if (salaryFilter[0] === 0 && salaryFilter[1] !== 50) {
        salaryCases = "<" + String(salaryFilter[1]) + "k";
    } else if (salaryFilter[0] !== 0 && salaryFilter[0] !== 50 && salaryFilter[1] === 50){
        salaryCases = ">" + String(salaryFilter[0]) + "k";
    } else if(salaryFilter[0] === 50 && salaryFilter[1] === 50){
        salaryCases = String(salaryFilter[0]) + "k+"
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
                            value={salaryFilter}
                            valueLabelDisplay="auto"
                            aria-labelledby="salary-slider"
                            getAriaValueText={valuetext}
                            onChange={handleSliderChange}
                            onChangeCommitted={handleSliderChangeCommitted}
                        />
                    </div>
                </div>

            </Popover>
        </>
    )




}

export default SalaryFilter;
