import React, {useEffect, useState} from 'react';
import Filters from './Filters';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import styles from './home.module.scss'
import {matchInterface, offerInterface} from "../../utils/const";



interface HomeProps extends RouteComponentProps<matchInterface>{
    offers: offerInterface[],
    fetching: boolean
}


const Home: React.FC<HomeProps> = ({location, match, offers, fetching, history}) => {
    const [filters, setFilters] = useState({ city: match.params.city || "all",
        language: match.params.language || "all",
        experience: match.params.experience || "all",
        salarymin: parseInt(match.params.salarymin, 10) || 0,
        salarymax: parseInt(match.params.salarymax, 10) || 50,
    });

useEffect(() => {
    if (location.pathname === "/"){
        setFilters({city: "all", language: "all", experience: "all", salarymin: 0, salarymax: 50})
    }
}, [location.pathname])


    const updateFilter = (key:string,value:string | number) => {
        setFilters({...filters, [key]:value})
    };

    return (
        <div className={styles.filters}>
            <Filters history={history} offers={offers} fetching={fetching} updateFilters={updateFilter} setFilters={setFilters} filters={filters}/>
        </div>


    )
};


export default withRouter(Home)
