import React, {useState} from 'react';
import styles from './auth.module.scss';
import logo from '../../assets/images/signUp.svg';
import Button from '@material-ui/core/Button';
import facebook from '../../assets/images/facebookLogo.png';
import github from '../../assets/images/gitLogo.png';
import google from '../../assets/images/googleLogo.png';
import linked from '../../assets/images/linkedinLogo.png';
import SocialButton from './/SocialButton';
import Inputs from './Inputs'
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Hidden from "@material-ui/core/Hidden";
import {userInterface} from "../../utils/const";


interface SignUpProps extends RouteComponentProps {
    user: userInterface,
    setUser: React.Dispatch<React.SetStateAction<userInterface>>,
}

const SignUp: React.FC<SignUpProps> = ({history, user, setUser}) => {
    const [values, setValues] = useState({
        email: "",
        password: ''
    });
    const [formError, setFormError] = useState("");

    const register = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const response = await fetch("http://192.168.10.25:7000/devs/signup", {
                method: "POST",
                body: JSON.stringify(values),
                headers: {"Content-Type": "application/json"},
                credentials: "include"
            })
            if (response.ok) {
                setUser({...user, createPopup: true})
                history.push("/devs");
            } else {
                response.text()
                    .then(text => setFormError(text));
            }
        } catch (err) {
        }
    };
    return (
        <>
        <div className={styles.row}>
            <div className={styles.column}>
                <h1>Get started for free</h1>
                <div className={styles.center}>
                <div className={styles.socials}>
                    <SocialButton icon={google}>Register with Google </SocialButton>
                    <SocialButton icon={github}>Register with Github </SocialButton>
                </div>
                <div className={styles.socials}>
                    <SocialButton icon={linked}>Register with LinkedIn </SocialButton>
                    <SocialButton icon={facebook}>Register with Facebook </SocialButton>
                </div>
                </div>
                <div className={styles.row}>
                    <hr className={styles.double}/>
                    <span style={{fontWeight: 300}}>Or</span>
                    <hr className={styles.double}/>
                </div>
                <form onSubmit={register}>
                    <Inputs error={formError} values={values} setValues={setValues}/>
                    {formError ? <Alert style={{width:396, marginBottom: 15}} variant="filled" severity="error">
                            {formError} </Alert> : ""}
                    <div className={styles.bottomSign}>
                        <Button type="submit" className={styles.btn} variant="contained" color="secondary">Register</Button>
                        <span>Already have an account?<Link to="/devs"
                                                            className={styles.register}> Sign In</Link></span>
                        <hr className={styles.one}/>
                        <span><a className={styles.register} href="www.google.com">Forgot Password?</a></span>
                    </div>
                </form>
            </div>
            <Hidden smDown>
                <div className={styles.imgContainer}>
                <img alt="sign up" className={styles.img} src={logo}/>
                </div>
            </Hidden>
        </div>
            </>
    );
}


export default withRouter(SignUp);
