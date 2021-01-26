import React from "react";
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles(() => ({
  container: {
    height: "100vh",
  },
  box: {
    textAlign: "center",
    width: "100%",
    margin: "auto 0",
    display: "block",
    marginTop: "250px",
  },
}));
export default function Info(props) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classes.box}>
        <h1>Waiting Position</h1>
        <h4>{props.count}</h4>
      </div>
    </div>
  );
}
