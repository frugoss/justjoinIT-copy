import React from 'react';
import styles from './plan.module.scss';
import plan from '../../assets/images/planOffer.svg'
import {Link} from "react-router-dom";

const ChoosePlan = () => {

    return (
        <div className={styles.choosePlanContainer}>
            <div className={styles.bg}>
                <div className={styles.intro}>
                    <div className={styles.text}>
                        Dzięki nam dotrzesz skutecznie do społeczności ponad 200 tysięcy polskich programistów.
                    </div>
                    <img className={styles.program} src={plan} alt="programming"/>
                </div>
            </div>
            <div className={styles.cards}>
                <h1 className={styles.h1offer}>Poznaj ogłoszenia na Just Join IT</h1>
                <div className={styles.pricetable}>
                    <div className={styles.card} style={{paddingLeft: 30}}>
                        <div className={styles.package}>
                            <div className={styles.header}>
                                <div className={styles.title}>
                                    Basic
                                </div>
                                <div className={styles.price}>
                                    <span className={styles.pricetxt}>390</span>
                                    <span className={styles.pricecurr}>PLN</span>
                                </div>

                            </div>
                            <div className={styles.description}>
                                <ul className={styles.benefits}>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Ogłoszenie w prasówce technologicznej
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Brak Customer Care
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Bez odświeżeń
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Brak promocji w Social Media
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Brak indywidualnego copy
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Brak Social Boost - płatna kampania marketingowa w social media na budżecie
                                        klienta
                                    </li>

                                </ul>
                                <Link style={{textDecoration: "none"}} to={"/add/basic"}>
                                <div className={styles.btn}>Kup ogłoszenie</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card} style={{paddingRight: 12}}>
                        <div className={styles.packageMiddle}>
                            <div className={styles.recom}>Najczęściej wybierany</div>
                            <div className={styles.header}>
                                <div className={styles.title}>
                                    Premium
                                </div>
                                <div className={styles.price}>
                                    <span className={styles.pricetxt}>490</span>
                                    <span className={styles.pricecurr}>PLN</span>
                                </div>

                            </div>
                            <div className={styles.description}>
                                <ul className={styles.benefits}>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Ogłoszenie w prasówce technologicznej
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Dedykowany opiekun Customer Care
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        1 automatyczne odświeżenie
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Brak promocji w Social Media
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Brak indywidualnego copy
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconNotActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-circle-minus"/>
                                        </div>
                                        Brak Social Boost - płatna kampania marketingowa w social media na budżecie
                                        klienta
                                    </li>

                                </ul>
                                <Link style={{textDecoration: "none"}} to={"/add/premium"}>
                                <div className={styles.btn}>Kup ogłoszenie</div>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className={styles.card} style={{paddingRight: 30}}>
                        <div className={styles.package}>
                            <div className={styles.header}>
                                <div className={styles.title}>
                                    Business
                                </div>
                                <div className={styles.price}>
                                    <span className={styles.pricetxt}>790</span>
                                    <span className={styles.pricecurr}>PLN</span>
                                </div>

                            </div>
                            <div className={styles.description}>
                                <ul className={styles.benefits}>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Ogłoszenie w prasówce technologicznej
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Dedykowany opiekun Customer Care
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        2 automatyczne odświeżenia
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Indywidualna promocja w Social Media
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Indywidualne copy ogłoszenia + audyt
                                    </li>
                                    <li className={styles.point}>
                                        <div className={styles.iconActive}>
                                            <span style={{lineHeight: 0}} className="lnr lnr-checkmark-circle"/>
                                        </div>
                                        Możliwy Social Boost - płatna kampania marketingowa w social media na budżecie klienta
                                    </li>

                                </ul>
                                <Link style={{textDecoration: "none"}} to={"/add/business"}>
                                <div className={styles.btn}>Kup ogłoszenie</div>
                                </Link>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

        </div>
    )
};

export default ChoosePlan;
