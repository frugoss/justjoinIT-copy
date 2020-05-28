import clsx from "clsx";
import {IconButton} from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import FormControl from "@material-ui/core/FormControl";
import React, {useState}  from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import HttpsOutlinedIcon from "@material-ui/icons/HttpsOutlined";
import PersonOutlinedIcon from "@material-ui/icons/PersonOutlined";
import TextField from "@material-ui/core/TextField";
import styles from './auth.module.scss';


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
    pinkText:{
        color: theme.palette.secondary.main
    }

}));


const Inputs = ({values,setValues,error}) => {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = prop => event => {
        setValues({...values, [prop]: event.target.value});
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };



    return (
        <div className={styles.inputWidth}>
            <div className={styles.rowIcon}>
            <PersonOutlinedIcon/>
            <TextField className={clsx(classes.margin, classes.textField)}
            error={Boolean(error)}
            id="outlined-required"
            label="Email"
            variant="outlined"
            value={values.email}
            onChange={handleChange('email')}
            />
            </div>
            <div className={styles.rowIcon}>
            <HttpsOutlinedIcon/>
                <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                <InputLabel htmlFor="adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    error={Boolean(error)}
                    type={showPassword ? 'text' : 'password'}
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
                                {showPassword ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    labelWidth={70}
                />
            </FormControl>
            </div>
            </div>
    )
}
export default Inputs;