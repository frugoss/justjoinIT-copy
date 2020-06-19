import React from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import FilterButtonMobile from "App/views/Home/FilterButtonMobile";
import styles from "./home.module.scss";
import { TransitionProps } from '@material-ui/core/transitions';
import {filtersInterface, cityInterface} from "../../utils/const";


const useStyles = makeStyles(createStyles({
    root: {
        borderRadius: 20,
        textTransform: "none",
        letterSpacing: 0.5,
        fontSize: 12.6,
        color: '#777777',
        height: 35,
        background: "white",
        padding: '0 12px',
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
    },
    divider: {
        marginTop:45
    }
}));


const Transition = React.forwardRef(function Transition(
    props: TransitionProps & { children?: React.ReactElement },
    ref: React.Ref<unknown>,
)  {
    return <Slide direction="down" ref={ref} {...props} />;
});

type CityFilterMobile = {
    filters: filtersInterface,
    updateFilters: (key:string, value:string) => void,
    cities: cityInterface[]
}
const CityFilterMobile: React.FC<CityFilterMobile> = ({ filters, cities, updateFilters}) => {
    const classes = useStyles()

    const text = "Location"
      const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
          setOpen(true);
      };

      const handleClose = () => {
          setOpen(false);
      };
    const isActive = (link:string, filter:string): boolean => {
        return filter === link
    };
const polishCity = cities.filter(city => city.to === filters.city)
return (
<>
    <Button className={polishCity[0] && isActive(polishCity[0].to, filters.city) && polishCity[0].to !== "all" ? `${styles.activeButton} ${classes.root}` : classes.root} variant="outlined" onClick={handleClickOpen}>
        {polishCity[0] && polishCity[0] && polishCity[0].name !== "All" ? polishCity[0].name : "Location" }
    </Button>
    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
            <div onClick={handleClose}>
                <IconButton className={classes.close} edge="start" color="inherit" onClick={handleClose} aria-label="close">
                    <CloseIcon />
                </IconButton>
        <h2 className={styles.textTitleMobile}>{text}</h2>
            </div>
        <Divider className={classes.divider} />
            <div className={styles.buttonListMobile}>
        {cities && cities.map(({name, to}) => (

                <FilterButtonMobile filters={filters} name={name} to={to} key={to} setOpen={setOpen}
                              updateFilters={updateFilters} isActive={isActive(to, filters.city)}>
                </FilterButtonMobile>

            )
        )}
            </div>

    </Dialog>
</>
);
  }

export default CityFilterMobile;
