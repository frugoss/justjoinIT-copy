import React from 'react';
import styles from '../../views/SignIn/sign.module.scss';
import logo from '../../assets/images/signUp.svg';
import Button from '@material-ui/core/Button';
import facebook from '../../assets/images/facebookLogo.png';
import github from '../../assets/images/gitLogo.png';
import google from '../../assets/images/googleLogo.png';
import linked from '../../assets/images/linkedinLogo.png';
import SocialButton from './SocialButton';
import Inputs from './Input'


const Sign = () => (

        <div className={styles.row}>
            <div className={styles.column}>
                <h1>Get started for free</h1>
                <div className={styles.socials}>
                    <SocialButton icon={google}>Sign in with Google </SocialButton>
                    <SocialButton icon={github}>Sign in with Github </SocialButton>
                </div>
                <div className={styles.socials}>
                    <SocialButton icon={linked}>Sign in with LinkedIn </SocialButton>
                    <SocialButton icon={facebook}>Sign in with Facebook </SocialButton>
                </div>
                    <div className={styles.row}>
                   <hr className={styles.double}/><span style={{fontWeight: 300}}>Or</span>  <hr className={styles.double}/>
                    </div>
                <form>
                    <Inputs/>
                    <div className={styles.column} style={{textAlign: "center", fontSize: 14, justifyContent:"flex-start"}}>
                        <Button className={styles.btn}  variant="contained" color="secondary">Sign in</Button>
                        <span>New Account? <a className={styles.register} href="www.google.com">Register</a></span>
                        <hr className={styles.one}/>
                        <span><a className={styles.register} href="www.google.com">Forgot Password?</a></span>
                    </div>
                </form>
            </div>
            <img alt="sign up" className={styles.img} src={logo} />
        </div>
    );


export default Sign;
