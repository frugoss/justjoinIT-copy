import React, {useCallback} from 'react';
import styles from "./addoffer.module.scss"
import {useDropzone} from "react-dropzone";
import AddAPhotoOutlinedIcon from '@material-ui/icons/AddAPhotoOutlined';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from '@material-ui/core/Tooltip';
import {makeStyles} from '@material-ui/core/styles';
import TextArea from '@material-ui/core/TextareaAutosize'
import MenuItem from "@material-ui/core/MenuItem";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import {Link} from 'react-router-dom';
import {withStyles} from "@material-ui/styles";
import "trix/dist/trix";
import 'trix/dist/trix.css';
import {TrixEditor} from "react-trix";
import TechStack from "./TechStack";
import FormGroup from "@material-ui/core/FormGroup";
import {language} from "../Home/constData";
import Icons from './Icons'
import Button from "@material-ui/core/Button";
import {Form, Field} from "react-final-form";
import {TextField, Select, Checkboxes} from "mui-rff";
import MapPreview from './MapPreview'
import Address from './Address'
import {agreements} from "./const";
import QuestionMark from '../../assets/images/QuestionMark.png'
import InputAdornment from '@material-ui/core/InputAdornment';



const NewTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: "black",
        color: 'white',
        fontSize: 13,
    },
}))(Tooltip);

const useStyles = makeStyles({
    button: {
        "&:hover": {
            backgroundColor: "transparent"
        },
        padding: 0,

    }
});

const useStylesField = makeStyles({
    textField: {
        backgroundColor: "transparent",
        border: "none",
        borderBottom: "0px solid #9e9e9e",
        borderRadius: 0,
        outline: "none",
        height: "3rem",
        width: "100%",
        margin: "0 0 20px 0",
        padding: 0,
        boxShadow: "none",
        boxSizing: "content-box",
        transition: "all 0.3s",
        color: "inherit",
        font: "inherit",
        fontSize: "inherit",
    },
    selectField: {
        backgroundColor: "transparent",
        border: "none",
        borderBottom: "0px solid #9e9e9e",
        borderRadius: 0,
        outline: "none",
        height: "3rem",
        width: "100%",
        margin: "0 0 0px 0",
        padding: 0,
        boxShadow: "none",
        boxSizing: "content-box",
        transition: "all 0.3s",
        color: "inherit",
        font: "inherit",
        fontSize: "inherit",

    }
});

const useStylesFieldError = makeStyles({
    root: {
        backgroundColor: "transparent",
        borderBottom: "1px solid#d50000",
        outline: "none",
        height: "3rem",
        width: "100%",
        margin: "0 0 20px 0",
        padding: 0,
        boxShadow: "none",
        boxSizing: "content-box",
        transition: "all 0.3s",
        color: "inherit",
        font: "inherit",
        fontSize: "inherit",
    },
});

const useStylesStep = makeStyles({
    button: {
        "&:hover": {
            backgroundColor: "#ff5a92;",
        },
        backgroundColor: " #ff4081",
        background: "#f8f8f8",
        letterSpacing: ".5px",
        transition: ".2s ease-out",
        borderRadius: 20,
        width: 130,
        marginTop: 20


    }
})

const useStyleDesc = makeStyles({
    textField: {
        width: "98%",
        height: 200,
        border: "1px solid rgba(0,0,0,0.12)",
        padding: "10px 10px",
        overflow: "hidden",
        fontSize: 12,
        borderRadius: 4
    },
})

const useStyleDescErr = makeStyles({
    textField: {
        width: "98%",
        height: 200,
        border: "1px solid#d50000",
        padding: "10px 10px",
        overflow: "hidden",
        fontSize: 12,
        borderRadius: 4
    },
})


function Dropzone({setFormValues, formValues, onChange, values, error}) {
    const onDrop = useCallback(files => {
        let file = files[0]
        const reader = new FileReader();
        reader.onload = (event) => {
            onChange(event.target.result)
        };
        reader.readAsDataURL(file);
    }, [])

    const {getRootProps, getInputProps} = useDropzone({onDrop, accept:'image/jpeg, image/png'});

    return (
        <div className={styles.dropzoneContainer}>
            {values.logo === undefined ?
                <div className={styles.dropzoneFlex}{...getRootProps()}>

                    <input {...getInputProps()} />
                    <AddAPhotoOutlinedIcon style={error ? {fontSize: 60, color:"#f44336"} : {fontSize: 60} }/>
                    <div>
                        <h3 className={error ? styles.red: ""} >Upload/Drop Logo * <NewTooltip
                            title="Upload company logo .png/.jpg/.jpeg in any resolution.">
                                <HelpOutlineIcon style={error ? {fontSize: 14, color: "#f44336"}  : {fontSize: 14} }/>
                        </NewTooltip></h3>
                        {error ? (<h3 className={styles.dropzoneError}>Company logo is required</h3>) : ""}

                    </div>
                </div>
                : <img onClick={() => {
                    onChange(undefined)
                    setFormValues({...formValues, logo: undefined})
                }} src={values.logo ? values.logo : formValues.logo}
                       className={styles.dropzoneUploaded} alt="logo"/>
            }

        </div>
    );
}

const AddOffer = ({formValues, setFormValues, handleNext}) => {

    const changeFormValue = (key, value) => {
        setFormValues({
            ...formValues,
            [key]: value
        })
    }
    const classesField = useStylesField();
    const classesFieldError = useStylesFieldError();
    const classStep = useStylesStep();
    const classDesc = useStyleDesc()
    const classDescErr = useStyleDescErr()

    const onSubmit = values => {
        setFormValues({...formValues, ...values})
        handleNext();
    }
    const required = value => (value ? undefined : `Field is required`);
    const agreementRequired = value => (value !== agreements ? undefined : `Field is required`);
    const technologyRequired = value => (value ? value.img === QuestionMark : '');

    const arrayNotEmpty =  value => {
        return value ? value.length === 0 : `Field is required`;
    }
    const emailWeb = value => {
        const re = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/
        const re2 = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(String(value).toLowerCase()) || re2.test(String(value).toLowerCase())) {
            return undefined
        } else {
            return "Email or link is invalid"
        }
    }
    const website = value => {
        const re = /^(https?:\/\/)?(www\.)?([a-zA-Z0-9]+(-?[a-zA-Z0-9])*\.)+[\w]{2,}(\/\S*)?$/;
        if (re.test(String(value).toLowerCase())) {
            return undefined
        } else {
            return "Invalid format ex. www.web.com"
        }
    }
    const checkboxData = [
        {label: 'Fully Remote', value: Boolean}]
    return (
        <div className={styles.addOfferContainer}>

            <div className={styles.card}>
                <Link to={"/add"} styles={{textDecoration: "none"}}>
                    <div className={styles.backButton}>
                        <ArrowBackIcon style={{verticalAlign: "middle"}}/> Back
                    </div>
                </Link>
                <Form
                    initialValues={formValues}
                    onSubmit={onSubmit}
                    render={({handleSubmit, form, values}) => (
                        <form className={styles.form} onSubmit={handleSubmit} noValidate>
                            <div className={styles.row}>
                                <Field name="logo" validate={required}>
                                    {props => (

                                        <Dropzone setFormValues={setFormValues} error={props.meta.touched && props.meta.error} formValues={formValues} values={values} onChange={props.input.onChange}/>
                                        )}
                                </Field>
                                <div className={styles.topContainer}>
                                    <TextField fieldProps={{validate: required}}  className={classesField.textField}
                                               name="company" label="Short company name" required={true}/>
                                    <TextField fieldProps={{validate: website}} className={classesField.textField}
                                               name="website" label="Company website" required={true}/>
                                    <TextField fieldProps={{validate: required}}  className={classesField.textField}
                                               InputLabelProps={{shrink: true}} name="companySize" placeholder="10 - 23"
                                               label="Company size" required={true}  InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                                <NewTooltip title={<>How many people work in a company? <br/><br/>
                                                    <center>examples:<br/>* 10 - 23<br/> * 300+<br/> * >20</center>
                                                </>}>
                                                    <HelpOutlineIcon style={{fontSize:14}} />
                                                </NewTooltip>
                                            </InputAdornment>
                                        ),
                                    }}/>


                                </div>


                                <div className={styles.topContainer} style={{marginTop: 68}}>

                                    <Select
                                        name="companyType"
                                        fieldProps={{validate: required}}
                                        required={true}
                                        displayEmpty
                                        className={classesField.selectField}
                                    >
                                        <MenuItem disabled value="">
                                            Choose company type
                                        </MenuItem>
                                        <MenuItem value="Startup">Startup</MenuItem>
                                        <MenuItem value="Software House">Software House</MenuItem>
                                        <MenuItem value="E-commerce">E-commerce</MenuItem>
                                        <MenuItem value="Corporation">Corporation</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                    <Select style={{marginTop:20}}
                                        name="companyIndustry"
                                        fieldProps={{validate: required}}
                                        required={true}
                                        displayEmpty
                                        className={classesField.selectField}
                                    >
                                        <MenuItem disabled value="">
                                            Choose company industry
                                        </MenuItem>
                                        <MenuItem value="Fintech">Fintech</MenuItem>
                                        <MenuItem value="Blockchain">Blockchain</MenuItem>
                                        <MenuItem value="E-commerce">E-commerce</MenuItem>
                                        <MenuItem value="Medicine">Medicine</MenuItem>
                                        <MenuItem value="Military">Military</MenuItem>
                                        <MenuItem value="Martech">Martech</MenuItem>
                                        <MenuItem value="IoT">IoT</MenuItem>
                                        <MenuItem value="Logistic">Logistic</MenuItem>
                                        <MenuItem value="Beauty">Beauty</MenuItem>
                                        <MenuItem value="Travel">Travel</MenuItem>
                                        <MenuItem value="Other">Other</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className={styles.middleContainer}>
                                <div className={styles.widthPadding}>
                                    <TextField className={classesField.textField}
                                               fieldProps={{validate: required}}
                                               required={true}
                                               name="title" label="Title"/>
                                </div>
                                <div className={styles.widthPadding}>
                                    <Select
                                        name="experience"
                                        fieldProps={{validate: required}}
                                        required={true}
                                        displayEmpty
                                        className={classesField.selectField}
                                    >
                                        <MenuItem disabled value="">
                                            Choose an experience level
                                        </MenuItem>
                                        <MenuItem value="Junior">Junior</MenuItem>
                                        <MenuItem value="Mid">Mid</MenuItem>
                                        <MenuItem value="Senior">Senior</MenuItem>
                                    </Select>
                                </div>
                                <div className={styles.widthPadding}>
                                    <Select
                                        name="employment"
                                        fieldProps={{validate: required}}
                                        required={true}
                                        displayEmpty
                                        className={classesField.selectField}
                                    >
                                        <MenuItem disabled value="">
                                            Choose an employment type
                                        </MenuItem>
                                        <MenuItem value="B2B">B2B</MenuItem>
                                        <MenuItem value="Permanent">Permanent</MenuItem>
                                        <MenuItem value="Mandate Contract">Mandate Contract</MenuItem>
                                    </Select>
                                </div>
                            </div>

                            <div className={styles.middleContainer}>
                                <div className={styles.widthPadding}>

                                    <TextField fieldProps={{parse: (value) => Number(value)}}
                                               className={classesField.textField}
                                               name="minSalary"
                                               label="Monthly salary from (invoice net)" type="number"InputProps={{
                                        endAdornment: (
                                            <InputAdornment>
                                        <NewTooltip style={{position:"absolute", right: 5, top: 30}}
                                                    title={<><center>How much the candidate will earn monthly.<br/>  <br/> <b>With B2B</b> <br/> It is the net amount without VAT. <br/>  <br/> <b>With Permanent or Mandate contract</b> <br/>It is the gross amount.</center>
                                                    </>}>

                                                <HelpOutlineIcon style={{fontSize: 14}}/>

                                        </NewTooltip>
                                            </InputAdornment>
                                                ),
                                                }}/>

                                </div>
                                <div className={styles.widthPadding}>
                                    <TextField fieldProps={{parse: (value) => Number(value)}} className={classesField.textField}
                                               name="maxSalary"
                                               label="Monthly salary to (invoice net)" type="number"/>
                                </div>
                                <div className={styles.widthPadding}>
                                    <Select
                                        name="currency"
                                        displayEmpty
                                        className={classesField.selectField}
                                    >
                                        <MenuItem disabled value="">
                                            Choose currency
                                        </MenuItem>
                                        <MenuItem value="PLN">PLN</MenuItem>
                                        <MenuItem value="EUR">EUR</MenuItem>
                                        <MenuItem value="USD">USD</MenuItem>
                                        <MenuItem value="GBP">GBP</MenuItem>
                                        <MenuItem value="CHF">CHF</MenuItem>
                                    </Select>
                                </div>

                            </div>

                                    <div style={{width:"100%"}}>
                                        <h3 className={styles.titleMargin}>Tech Stack <NewTooltip
                                            title={<><center>Tech StackIn this section you should put in tech stack and skill
                                                level required from the candidate.<br/><br/> You can do it by selecting
                                                existing technology or writing a new one <b>(25 characters
                                                    limit)</b><br/><br/>
                                                examples:<br/>* Java<br/> * Git<br/> * React</center>
                                            </>}>
                                                <HelpOutlineIcon style={{fontSize: 14}}/>
                                        </NewTooltip></h3>
                                        <Field name="techStack" validate={arrayNotEmpty}>
                                            {props => (
                                        <div style={{padding: "0 0.75rem", marginLeft: 10}}>

                                                <TechStack onChange={props.input.onChange} fieldRenderProps={props} formValues={values}
                                                           className={props.meta.error && props.meta.touched ? classesFieldError.root : classesField.textField}/>
                                        </div>
                                            )}
                                        </Field>
                                    </div>
                            <Field name="description" validate={required}>
                                {props => (
                                    <div style={{width:"100%"}}>
                                        <h3 className={styles.titleMargin}>Job description <NewTooltip
                                            title={<><center>This section should contain: "about us", "your responsibilities", "our requirements", "nice to have", "we offer". </center></>}>
                                                <HelpOutlineIcon style={{fontSize: 14}}/>
                                        </NewTooltip></h3>

                                         <TrixEditor value={props.input.value} className={props.meta.error && props.meta.touched ? styles.trixError: styles.trix}
                                                        onChange={html => props.input.onChange(html)}/>
                                    </div>
                                )}
                            </Field>
                            <div className={styles.flexWidth}>

                                <h3 className={styles.titleMargin}>Choose your location</h3>
                            </div>

                            <div className={styles.flexWidth}>
                                    <Address changeFormValue={changeFormValue} formValues={formValues} values={values} required={required}/>


                                <div className={styles.checkboxContainer}>
                                    <FormGroup>

                                            <Checkboxes
                                                name="remote"
                                                data={checkboxData}
                                            />


                                    </FormGroup>
                                </div>

                            </div>
                            <div style={{height: 300, width: "100%"}}>

                            <MapPreview img={values && values.technology && values.technology.img} coordinates={values.coordinates}/>

                            </div>
                            <Field name="technology" validate={technologyRequired}>
                                {props => (
                                    <div className={props.meta.error && props.meta.touched ? styles.technologyMarginError : styles.technologyMargin}>

                                        <div className={styles.technologyTitle}>
                                            Choose main technology
                                        </div>

                                        <div className={styles.technologies}>
                                            {language.map(({name, to, img, color, background}) => (
                                                    <Icons onChange={props.input.onChange} background={background}
                                                           color={color} name={name} img={img} to={to} key={to}>
                                                    </Icons>
                                                )
                                            )
                                            }
                                        </div>
                                    </div>
                                )}
                            </Field>
                            <div className={styles.bottomSection}>

                                <h3 className={styles.titleMargin}>How to apply</h3>
                                <div className={styles.widthPadding}>
                                    <TextField fieldProps={{validate: emailWeb}} className={classesField.textField}
                                              name="email"
                                               label="Enter apply email or paste link" required={true}/>
                                </div>
                                <h3 className={styles.titleMargin}>Agreements</h3>
                                <h4 className={styles.titleMargin} style={{color: "lightGrey"}}>Information clause</h4>
                                <Field name="agreements" validate={agreementRequired}>
                                    {props =>(
                                <div className={styles.agreements}>

                                    <TextArea className={props.meta.error && props.meta.touched ? classDescErr.textField :classDesc.textField}
                                              value={props.input.value ? props.input.value : ""}
                                              onChange={e => props.input.onChange(e.target.value)}/>
                                    {props.meta.error && props.meta.touched && <span className={styles.agreemErr}>Please fill company name and address</span>}
                                </div>
                                )}
                                </Field>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={
                                        handleSubmit

                                    }
                                    className={classStep.button}
                                >
                                    Next Step
                                </Button>
                            </div>


                        </form>
                    )}
                />
            </div>

        </div>
    )
};


export default AddOffer;
