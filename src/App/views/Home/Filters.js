import React, {useState} from "react";
import styles from './home.module.scss'
import FilterButton from './FilterButton';
import LangButton from "./LangButton";
import IconButton from '@material-ui/core/IconButton';
import Switch from '@material-ui/core/Switch'
import Offers from './Offers'
import AllButton from "./AllButton";
import Hidden from '@material-ui/core/Hidden'
import CityFilterMobile from "./CityFilterMobile";
import LangFilterMobile from "./LangFilterMobile";
import ExpSalaryFilterMobile from './ExpSalaryFilterMobile';
import SalaryFilter from "./SalaryFilter";
import ExpFilter from "./ExpFilter";
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import {makeStyles} from "@material-ui/styles";
import {cities, language} from './constData';


const useStyles = makeStyles({
    root: {
        padding: 0
    },
});

function valuetext(value) {
    return `${value}$`;
}

const Filters = ({filters, history, match, updateFilters, setFilters, offers, fetching}) => {
    const classes = useStyles();
    const [darkMode, setDarkMode] = useState(false);

    const handleChange = (event) => {
        setDarkMode(event.target.checked);
    };
    const handleSelectChange = event => {
        updateFilters("experience", event.target.value);
        history.push(`/${filters.city}/${filters.language}/${event.target.value}`)
    };

    const handleSliderChange = (event, newValue) => {
        setFilters({...filters, salarymin: newValue[0], salarymax: newValue[1]})
    };

    const handleSliderChangeCommitted = (event, newValue) => {
        history.push(`/${filters.city}/${filters.language}/${filters.experience}/${newValue[0]}/${newValue[1]}`);
    };

    const salaryfilter = [parseInt(filters.salarymin, 10), parseInt(filters.salarymax, 10)];

    const isActive = (link, filter) => {
        return filter === link
    };

    const currency = {
        GBP: 5.17,
        EUR: 4.56,
        USD: 4.21,
        CHF: 4.34,
        PLN: 1
    }

    let offersList = [...offers];

    if (filters.language !== "all") {
        offersList = offersList.filter(e => (e.technology[0].name === filters.language))
    }
    if (filters.city.toLowerCase() !== "all") {
        const city = cities.find(element => element.to === filters.city)
        if (city) {
            offersList = offersList.filter(e => (e.city.toLowerCase() === city.name.toLowerCase()))
        }
    }
    if (filters.experience !== "all") {
        offersList = offersList.filter(e => (e.experience.toLowerCase() === filters.experience))

    }
    if (filters.salarymin >= 0) {
        offersList = offersList.filter(e =>
            (e.minSalary * currency[e.currency] >= filters.salarymin * 1000) || (e.maxSalary * currency[e.currency] >= filters.salarymin * 1000)
        );
    }
    if (filters.salarymax <= 100) {
        offersList = offersList.filter(e => (e.maxSalary * currency[e.currency] <= filters.salarymax * 1000) || (e.minSalary * currency[e.currency] <= filters.salarymax * 1000));
    }
    const [hideFilter, setHideFilter] = useState(false)
    return (

        <div className={styles.whiteBg}>
            <Hidden smDown>
                <div className={styles.view}>
                    <div className={styles.border}>
                        <div className={styles.flex}>
                            <div style={{width: "100%"}}>
                                {cities.map(({name, to}) => (
                                        <FilterButton filters={filters} name={name} to={to} key={to}
                                                      isActive={isActive(to, filters.city)} updateFilters={updateFilters}>
                                        </FilterButton>
                                    )
                                )}
                            </div>
                            <div className={styles.darkPosition}>
                                <IconButton className={classes.root}
                                            onClick={() => setDarkMode(false)}><WbSunnyIcon/></IconButton>
                                <Switch
                                    checked={darkMode}
                                    onChange={handleChange}
                                    color="default"
                                />
                                <IconButton className={classes.root}
                                            onClick={() => setDarkMode(true)}><Brightness3Icon/></IconButton>
                            </div>
                        </div>
                        <div className={styles.flex}>
                            <div className={styles.languagePosition}>
                                <AllButton filters={filters} name="All" to="all" key="all" updateFilters={updateFilters}
                                           isActive={isActive("all", filters.language)}/>
                                {language.map(({name, to, img}) => (
                                        <LangButton filters={filters} name={name} img={img} to={to} key={to}
                                                    updateFilters={updateFilters}
                                                    isActive={isActive(to, filters.language) || isActive("all", filters.language)}>

                                        </LangButton>
                                    )
                                )}
                            </div>

                            <div className={styles.salaryExpContainer}>

                                <SalaryFilter valuetext={valuetext}
                                              handleSliderChangeCommitted={handleSliderChangeCommitted}
                                              salaryfilter={salaryfilter} handleSliderChange={handleSliderChange}
                                              filters={filters}/>
                                <ExpFilter history={history} updateFilters={updateFilters} filters={filters}
                                           handleSelectChange={handleSelectChange}/>
                            </div>
                        </div>
                    </div>
                </div>
            </Hidden>
            <Hidden mdUp>
                <div style={{display: hideFilter ? "none" : "flex", margin: "10px"}}>
                    <div style={{marginRight: 15}}>
                        <CityFilterMobile filters={filters} cities={cities} updateFilters={updateFilters}/>
                    </div>
                    <div style={{marginRight: 15}}>
                        <LangFilterMobile language={language} filters={filters} updateFilters={updateFilters}/>
                    </div>
                    <div style={{marginRight: 15}}>
                        <ExpSalaryFilterMobile updateFilter={updateFilters} valuetext={valuetext}
                                               handleSliderChangeCommitted={handleSliderChangeCommitted}
                                               salaryfilter={salaryfilter} handleSliderChange={handleSliderChange}
                                               handleSelectChange={handleSelectChange}
                                               filters={filters} updateFilters={updateFilters}/>
                    </div>
                </div>
            </Hidden>


            <Offers hideFilter={hideFilter} setHideFilter={setHideFilter} fetching={fetching} filters={filters}
                    offers={offers} offersList={offersList} match={match} language={language}/>

        </div>
    )
};

export default Filters;
