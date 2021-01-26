import React, { useState } from "react";
import { TextField } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Info from "./Info";
import axios from "axios";

const backgroundImage =
  "https://cdn.kickoffpages.com/assets/157843/45505760-8b2f-46a2-bf35-c554dc34e287/ah9id2ck6rr5bz6rdd74/Reveal_Hd.jpg";
const useStyles = makeStyles(() => ({
  container: {
    backgroundImage: `url(${backgroundImage})`,
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    width: "100vw",
    height: "100vh",
  },
  login: {
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    width: "40%",
  },

  textField: {
    backgroundColor: "white",
    margin: "1%",
  },
}));
function Login() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneError] = useState({});
  const [emailValid, setEmailError] = useState({});
  const [count, setCount] = useState(0);

  const handlePhoneNumber = (e) => {
    if (isNaN(e.target.value) || e.target.value.length > 10) {
      return false;
    } else {
      setPhone(e.target.value);
      setPhoneError({ error: false, message: "" });
    }
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError({ error: false, message: "" });
  };
  const handleSubmit = async () => {
    const isemailValid = validateEmail();
    const isphoneValid = validatePhone();
    if (isemailValid && isphoneValid) {
      console.log("valid");
      let response = await axios.post("http://localhost:5000/user", {
        email,
        phone,
      });
      if (response && response.data.response) {
        setCount(response.data.response.count);
      }
      //console.log(response.data);
    } else {
      console.log("invalid");
    }
  };
  const validateEmail = () => {
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(email)) {
      setEmailError({ error: true, message: "Enter a valid email address" });
      return false;
    } else {
      setEmailError({ error: false, message: "" });
      return true;
    }
  };
  const validatePhone = () => {
    var pattern = new RegExp(/^[^4]\d{9}$/g);
    if (!pattern.test(phone)) {
      setPhoneError({ error: true, message: "Enter a valid phone number" });
      return false;
    } else {
      setPhoneError({ error: false, message: "" });
      return true;
    }
  };
  const classes = useStyles();
  return (
    <>
      {!!count ? (
        <Info count={count} />
      ) : (
        <div className={classes.container}>
          <form className={classes.login}>
            <TextField
              label="Email"
              name="email"
              color="primary"
              onChange={handleEmail}
              className={classes.textField}
              variant="filled"
              value={email}
              required
              fullWidth
              margin="dense"
              error={!!emailValid.error}
              helperText={
                !!emailValid.error
                  ? email.length
                    ? emailValid.message
                    : "Required"
                  : ""
              }
            />
            <TextField
              label="Phone Number"
              name="phone"
              color="primary"
              onChange={handlePhoneNumber}
              value={phone}
              className={classes.textField}
              variant="filled"
              required
              fullWidth
              margin="dense"
              error={!!phoneValid.error}
              helperText={
                !!phoneValid.error
                  ? phone.length
                    ? phoneValid.message
                    : "Required"
                  : ""
              }
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </form>
        </div>
      )}
    </>
  );
}

export default Login;
