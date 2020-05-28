import React, {useEffect, useState} from 'react';
import Filters from './Filters';
import {withRouter} from 'react-router-dom';
import styles from './home.module.scss'

const Home = ({location, match, history, offers, fetching}) => {
    const [filters, setFilters] = useState({ city: match.params.city || "all",
        language: match.params.language || "all",
        experience: match.params.experience || "all",
        salarymin: match.params.salarymin || 0,
        salarymax: match.params.salarymax || 50,
    });

useEffect(() => {
    if (location.pathname === "/"){
        setFilters({city: "all", language: "all", experience: "all", salarymin: 0, salarymax: 50})
    }
}, [location.pathname])


    const updateFilter = (key,value) => {
        setFilters({...filters, [key]:value})
    };

    return (
        <div className={styles.filters}>
            <Filters offers={offers} fetching={fetching} updateFilters={updateFilter} setFilters={setFilters} filters={filters} history={history} match={match}/>
        </div>


    )
};


export default withRouter(Home)
