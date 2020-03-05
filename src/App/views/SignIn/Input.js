import clsx from "clsx";
import {IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import TextField from "@material-ui/core/TextField";
import styles from '../../views/SignIn/sign.module.scss';


const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(2),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: 340,
    },
}));


const Inputs = () => {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        email: "",
        password: '',
        showPassword: false,
    });


    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setValues({...values, showPassword: !values.showPassword});
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };


    return (
        <div>
            <div className={styles.row}>
            <PersonOutlinedIcon/>
            <TextField className={clsx(classes.margin, classes.textField)}
            required
            id="outlined-required"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange('email')}
            />
            </div>
            <div className={styles.row}>
            <HttpsOutlinedIcon/>
            <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {values.showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            </div>
            </div>
    );
};
export default Inputs;
