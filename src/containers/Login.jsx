import { useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, IconButton } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { makeStyles } from '@mui/styles';

import Button from '@mui/material/Button';
import Logo from '../assets/images/loginLogo.svg';
import ForgetPasswordPopup from '../components/ForgetPasswordPopup';
import api from '../api';
import { UpdateStore } from '../StoreContext';

const useOutlinedInputStyles = makeStyles({
  root: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '2px solid #CDEEFC ',
        borderRadius: '20px',
        fontSize: 16,
        width: 'auto',
      },
      '&:hover fieldset': {
        borderColor: '#28CDFF',
      },
      '&::placeholder fieldset': {
        fontWeight: 800,
      },
      '&.Mui-focused fieldset': {
        borderColor: '#28CDFF',
      },
    },
  },
});

export default function Login() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const updateStore = UpdateStore();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    api('get', '/admins/auth', '', false)
      .then(({ data }) => {
        if (data.admin?.role) {
          navigate(`/${data.admin?.role}`);
          updateStore({ admin: data.admin, loggedIn: true });
        }
      })
      .catch(console.log);

    //  eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async () => {
    const { data } = await api('post', '/admins/login', user);

    updateStore({ admin: data.admin, loggedIn: true });
    localStorage.setItem('token', data.token);

    window.location = `/${data.admin?.role}`;
  };

  const outlinedInputStyles = useOutlinedInputStyles();
  return (
    <div className="loginPg">
      <Grid item xs={0} className="loginFirstSection">
        <img src={Logo} className="logoLogin" alt="" />
      </Grid>

      <Grid container className="loginFormSection" xs={12}>
        <Grid xs={0} xl={4.5} lg={4.2} />
        <Grid className="lgForm" xs={10} xl={3} lg={4}>
          <h1 className="signInTxt">Sign in to Aquarium!</h1>
          <Grid item xs={12}>
            <FormControl
              sx={{ mb: 2.5, mt: 4, width: '100%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                className="emailField"
                id="outlined-email"
                classes={outlinedInputStyles}
                label="Email&nbsp;"
                size="normal"
                name="email"
                value={user.email}
                onChange={handleChange}
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
              />
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl
              sx={{ mb: 5, width: '100%' }}
              variant="outlined"
            >
              <TextField
                sx={{
                  backgroundColor: 'white',
                  borderRadius: '25px',
                }}
                className="passwordField"
                id="outlined-password"
                classes={outlinedInputStyles}
                label="Password&nbsp;&nbsp;"
                size="normal"
                InputLabelProps={{
                  style: {
                    color: '#8C8C8C',
                    fontSize: '19px',
                    fontWeight: '700',
                  },
                }}
                name="password"
                value={user.password}
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    // eslint-disable-next-line react/jsx-wrap-multilines
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={() => setShowPassword(true)}
                        edge="end"
                        sx={{ color: '#28CDFF' }}
                      >
                        {showPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <div
                className="forgetPassword"
                style={{
                  width: 'fit-content',
                  marginLeft: 'auto',
                }}
              >
                <p
                  className="forgetPasswordTxt"
                  onClick={() => setOpen(true)}
                  onKeyDown={() => setOpen(true)}
                  role="presentation"
                  aria-hidden
                >
                  Forgot password
                </p>
              </div>
            </FormControl>
          </Grid>
          <Grid>
            <Button
              sx={{
                marginBottom: '80px',
              }}
              className="signInBtn"
              variant="contained"
              onClick={handleSubmit}
            >
              Sign in
            </Button>
          </Grid>
        </Grid>
        {/* <CssTextField /> */}
      </Grid>

      {open && <ForgetPasswordPopup open={open} setOpen={setOpen} />}
    </div>
  );
}
