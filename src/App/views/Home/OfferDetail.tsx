import React, {useEffect, useState, useCallback} from 'react';
import slugify from "slugify";
// @ts-ignore
import ReactHtmlParser from 'react-html-parser';
import styles from './offers.module.scss'
import {ButtonBase} from '@material-ui/core';
import MailIcon from '@material-ui/icons/Mail';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleIcon from '@material-ui/icons/People';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import CreateIcon from '@material-ui/icons/Create';
import InputAdornment from '@material-ui/core/InputAdornment';
import {useDropzone} from 'react-dropzone';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faFileUpload} from '@fortawesome/free-solid-svg-icons';
import {makeStyles, createStyles} from '@material-ui/core/styles'
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {withRouter, RouteComponentProps} from 'react-router-dom';
import NumberFormat from "react-number-format";
import BackgroundOffer from '../../assets/images/BackgroundOffer.png'
// @ts-ignore
import Loading from "react-loading-animation";
import CVSentIcon from '../../assets/images/CVSent.svg'
import {Field, Form} from "react-final-form";
import {TextField, Checkboxes} from "mui-rff";
import FormGroup from "@material-ui/core/FormGroup";
import {filtersInterface, offerInterface, formValuesCV} from "../../utils/const";

interface MatchParams {
    offerTitle: string;
}


interface OfferDetailProps extends RouteComponentProps<MatchParams> {
    offersList: offerInterface[],
    filters: filtersInterface,
    fetching: boolean,
    setHideFilter?: React.Dispatch<React.SetStateAction<boolean>>,

}



const OfferDetail: React.FC<OfferDetailProps> = ({offersList, match, history, filters, fetching, setHideFilter}) => {
    const offers = [...offersList]
    const offer = offers.filter(e => (match.params.offerTitle === slugify(`${e.company}-${e.title}`, {
        lower: true
    })))[0];

    const useStyles = makeStyles(createStyles({
        root: {
            color: 'rgb(255, 255, 255)',
            fontWeight: 600,
            position: 'relative',
            paddingRight: 34,
            paddingLeft: 34,
            textTransform: "none",
            boxShadow: 'rgba(255, 64, 129, 0.31) 0px 23px 26px -13px',
            background: 'rgb(255, 64, 129)',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: 'rgb(255, 64, 129)',
            borderImage: 'initial',
            borderRadius: 18,
            overflow: "hidden",
            transition: "all 0.3s ease-out 0s",
            height: 40,
            margin: "5px 20px 20px 20px"
        }
    }));

    const classes = useStyles();

    const [CVSent, setCVSent] = useState(false)


    const onSubmit = async (values:formValuesCV) => {
        const form = new FormData();
        form.append('name', values.name)
        form.append('email', values.email)
        form.append('message', values.message)
        form.append('checkbox', values.checkbox)
        if(values.file) {
            form.append('file', values.file, values.file.name)
        }
        form.append('offerID', offer._id)
        try{
            let request = await fetch('http://192.168.10.25:7000/cv/upload', {
                method: 'POST',
                body: form,
                credentials: "include"
            })
            if (request.ok){
                setCVSent(true)
            }
        }catch(e){
            console.log('Error upload failed', e)
        }
    }
    const experience = [
        {
            id: 1,
            desc: "Nice to have"
        },
        {
            id: 2,
            desc: "Junior"
        },
        {
            id: 3,
            desc: "Regular"
        },
        {
            id: 4,
            desc: "Advanced"
        },
        {
            id: 5,
            desc: "Master",
        }
    ];
    let desc;
    const checkboxData = [
        {label: 'Processing data in future recruitment', value: Boolean}]
    const required = (value: string) => (value ? undefined : `Field is required`);
    const mail = (value: string) => {
        const reMail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (reMail.test(String(value).toLowerCase())) {
            return undefined
        } else {
            return "Email is invalid"
        }
    }
    type DropzoneProps = {
        onChange: (acceptedFiles: File[]) => void,
        values: {file:File},
    }
    const Dropzone: React.FC<DropzoneProps> = ({onChange, values}) => {
        const onDrop = useCallback(acceptedFiles => {
            onChange(acceptedFiles[0])
        },[])
        const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
            onDrop, accept:"application/pdf"});

        acceptedFiles.forEach(file => (
            <li>
                {(file as any).path} - {file.size} bytes
            </li>
        ));

        return (
            <section className="container">
                <div className={styles.dropzone} {...getRootProps()}>
                    <input {...getInputProps()} />
                    <FontAwesomeIcon className={styles.pictureDrop} icon={faFileUpload} size="3x"/>
                    <h2 className={styles.uploadDrop}>Upload CV (.pdf)</h2>
                </div>
                <aside>
                    {values.file ? <h4 className={styles.detailsDrop}>{values.file.name} - {Math.round(((values.file.size/1000000) + Number.EPSILON) * 100) / 100} MB</h4> : ""}

                </aside>
            </section>
        );
    }

    useEffect(() => {
        if (setHideFilter !== undefined) {
            setHideFilter(true)
        }
    }, [])
    return (
        <div className={styles.offerDetailContainer}>
            {fetching === true ? <div className={styles.loadingContainer}><Loading className={styles.loadingDimensions}/></div> : ""}
            {offer !== undefined ? (
                <div className={`${styles.offer} ${styles.mobilePadding}`}>

                    <div className={styles.top}>

                        <div className={styles.banner}
                             style={{background: `url(${BackgroundOffer}) center center / cover no-repeat, linear-gradient(30deg, ${offer.technology[0].background})`}}>
                            <div className={styles.backButton} onClick={() =>
                                history.push(`/${filters.city}/${filters.language}/${filters.experience}/${filters.salarymin}/${filters.salarymax}`)
                            }>
                                <ArrowBackIcon style={{verticalAlign: "middle", color: "white"}}/>
                            </div>
                            <div className={styles.name}>

                                <div className={styles.logoCircle}>
                                    <div className={styles.circle}>
                                        <img src={offer.logo} className={styles.companyLogoDimensions} alt="logo"/>
                                    </div>
                                </div>
                                <div className={styles.titleSalary}>
                                    <span className={styles.salaryStreetDetail}><NumberFormat value={offer.minSalary} thousandSeparator={" "}
                                                        displayType={'text'}/> - <NumberFormat value={offer.maxSalary}
                                                                                               thousandSeparator={" "}
                                                                                               displayType={'text'}/> {offer.currency} net/month</span>
                                    <div className={styles.title}>
                                        <span className={styles.titleDetail}>{offer.title}</span>
                                    </div>
                                    <div>
                                        <span className={styles.salaryStreetDetail}>{offer.street}, {offer.city} </span>
                                    </div>

                                </div>
                                <div style={{display: "flex", flexDirection: "row", justifyContent: "flex-end"}}>
                                       <div className={styles.apply}>
                                           <a href="#apply" style={{textDecoration:"none"}}><ButtonBase><MailIcon/> Apply </ButtonBase></a>
                                        </div>
                                </div>


                            </div>
                        </div>
                        <div className={styles.itskills}>
                            <div className={styles.mobileColumn}>
                                <div className={styles.skill}>
                                    <div className={styles.skillcircle}><BusinessIcon style={{color: "#FF5252"}}/></div>
                                    <a  href={`https://${offer.website}`}  rel="noopener noreferrer" target="_blank" style={{textDecoration: "none"}}>{offer.company}</a>
                                    <div className={styles.companydetails}>Company Name</div>

                                </div>
                                <div className={styles.skill}>
                                    <div className={styles.skillcircle}><PeopleIcon style={{color: "#fb8c00"}}/></div>
                                    <span>{offer.companySize}</span>
                                    <div className={styles.companydetails}>Company Size</div>

                                </div>
                            </div>
                            <div className={styles.mobileColumn}>
                                <div className={styles.skill}>
                                    <div className={styles.skillcircle}><InsertDriveFileIcon
                                        style={{color: "#ab47bc"}}/></div>
                                    <span>{offer.employment}</span>
                                    <div className={styles.companydetails}>EMP. type</div>

                                </div>
                                <div className={styles.skill}>
                                    <div className={styles.skillcircle}><ShowChartIcon style={{color: "#66BB6A"}}/>
                                    </div>
                                    <div>{offer.experience}</div>
                                    <div className={styles.companydetails}>EXP. lvl</div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.offerDetails}>
                        <div className={styles.techStack}>
                            <div className={styles.titleTech}>Tech Stack</div>
                            <div className={styles.insideTech}>
                                <div className={styles.techSkills}>
                                    {offer.techStack.map((stack, i) => {
                                        desc = experience.filter(e => stack.lvl === e.id)[0].desc
                                        return (
                                            <div key={i} className={styles.techPadding}>
                                                <div style={{display: "flex"}}>
                                                    {experience.map((lvl, index) => <span key={index}
                                                                                          className={stack.lvl >= lvl.id ? styles.dotClicked : styles.dot}/>)}

                                                </div>
                                                <div className={styles.language}>
                                                    {stack.language}
                                                </div>
                                                <div className={styles.desc}>
                                                    {desc}
                                                </div>
                                            </div>)

                                    })}
                                </div>
                            </div>
                        </div>
                        <div className={styles.sectionCard}>
                            <div className={styles.titleTech}>Description</div>
                            <div className={styles.description}>
                                <div className={styles.additionaldesc}>
                                    {ReactHtmlParser(offer.description)}
                                </div>
                            </div>
                        </div>
                        <div  style={{display: CVSent ? 'none' :'block'}} className={styles.sectionCard}>
                            <div className={styles.titleTech}>Apply for this job</div>
                            <Form
                                onSubmit={onSubmit}
                                render={({handleSubmit, values}) => (
                                    <form onSubmit={handleSubmit} noValidate>
                                <div id="apply" className={styles.cvContainer}>

                                    <div className={styles.inputsDirection}>

                                        <div className={`${styles.inputs} ${styles.marginName}`}>

                                            <TextField
                                                fieldProps={{validate: required}}
                                                name="name"
                                                variant="outlined"
                                                label="First and last name" required={true}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonOutlineOutlinedIcon/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className={`${styles.inputs} ${styles.marginMail}`}>
                                            <TextField
                                                fieldProps={{validate: mail}}
                                                variant="outlined"
                                                name="email"
                                                label="Email" required={true}
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <MailIcon/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className={styles.introCV}>
                                        <div className={styles.about}>
                                        <TextField
                                            rows="4"
                                            multiline={true}
                                                variant="outlined"
                                                name="message"
                                                label="Introduce yourself (linkedin/github links)"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <CreateIcon/>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>

                                        <div className={styles.CV}>
                                            <Field name="file">
                                                {props => (
                                            <Dropzone values={values} onChange={props.input.onChange}/>
                                                )}</Field>
                                        </div>
                                    </div>
                                    <div className={styles.checkBox}>
                                        <FormGroup>

                                            <Checkboxes
                                                name="checkbox"
                                                data={checkboxData}
                                            />


                                        </FormGroup>
                                    </div>
                                    <div className={styles.bottomSection}>
                                        <p className={styles.captchaStyling}>This site is
                                            protected by reCAPTCHA and the Google Privacy Policy and Terms of Service
                                            apply.
                                        </p>

                                            <ButtonBase
                                                classes={{root: classes.root}}
                                                color="primary"
                                                type="submit"
                                                onClick={() => handleSubmit}
                                            >
                                                Apply


                                            </ButtonBase>

                                    </div>
                                    </div>
                                    </form>
                                    )}
                                />
                                </div>
                                <div className={styles.CVSent} style={{display: CVSent ? "flex" : "none"}}><img alt="cv-sent" src={CVSentIcon}/><span style={{color: "rgb(153, 161, 171)",
                                    margin: "20px 0px 5px 0px"}}>Great! Your application was successfully sent to: </span><span style={{color:"#47b300"}}>{offer.company}</span></div>

                        </div>

                </div>

            ) : ""}
        </div>
    )
};

export default withRouter(OfferDetail);
