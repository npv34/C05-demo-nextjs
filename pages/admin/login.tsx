import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {NextPage} from "next";
import {useState} from "react";
import axios from "axios";
import Alert from '@mui/material/Alert';
import {useRouter} from "next/router";
import LinearProgress from '@mui/material/LinearProgress';
import {useDispatch, useSelector} from "react-redux";
import {setUserLogin} from "../../redux/features/loginsSlice";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                LuanPV
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

interface IAccount {
    email: string,
    password: string
}

const Login: NextPage = () => {
    const router = useRouter();
    const [formLogin, setFormLogin] = useState({
        email: '',
        password: ''
    });
    const [errMessage, setErrMessage] = useState("")
    const [isSubmit, setIsSubmit] = useState(false)

    const userLogin = useSelector((state: any) => state.login.user)
    const dispatch = useDispatch()

    const handlerChange = (e: any) => {
        setFormLogin({...formLogin, [e.target.name]: e.target.value})
    }

    const loginAPI = async (data: IAccount) => {
        return await axios.post('https://eshop-ecommert.herokuapp.com/api/login', data)
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let account: IAccount = {
            email: formLogin.email,
            password: formLogin.password
        }
        setIsSubmit(true)
        loginAPI(account)
            .then((res) => {
                setProgress(100)
                let token = res.data.authorisation.token
                window.localStorage.setItem('token', JSON.stringify(token))
                dispatch(setUserLogin({email: account.email}))
                router.push('/admin')
            })
            .catch(err => {
                let messageErr: string = err.response.data.message;
                setErrMessage(messageErr)
                setProgress(100)
                setIsSubmit(false)
            })
    };

    const [progress, setProgress] = React.useState(0);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setProgress((oldProgress) => {
                if (oldProgress === 100) {
                    return 0;
                }
                const diff = Math.random() * 10;
                return Math.min(oldProgress + diff, 100);
            });
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, [isSubmit]);

    return (
        <ThemeProvider theme={theme}>
            {isSubmit ?
                <Box sx={{width: '100%'}}>
                    <LinearProgress variant="determinate" value={progress}/>
                </Box>
                : null}
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{mt: 1}}>
                        {errMessage ?
                            <Alert severity="error">{errMessage}</Alert>
                            : ""}
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handlerChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handlerChange}
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary"/>}
                            label="Remember me"
                        />
                        <Button

                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Sign In
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright sx={{mt: 8, mb: 4}}/>
            </Container>
        </ThemeProvider>
    );
}

export default Login;
