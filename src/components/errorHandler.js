import React from "react";
import {
  Button,
  Link,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// import Alert from '@material-ui/lab/Alert';
// import AlertTitle from '@material-ui/lab/AlertTitle';

const UseStyles = makeStyles((theme) => ({
  paperSize: {
    width: "550px",
    height: "400px",
    marginTop: "20px",
    marginLeft: "80px",
    boxShadow: "0 .15rem 1.75rem 0 rgba(58,59,69,.15)!important",
  },
  Head: {
    color: "#368756",
    fontSize: "18px",
    fontFamily: "Roboto",
    fontWeight: 700,
    paddingTop: "20px",
    paddingLeft: "20px",
  },
}));

export default function errorHandler() {
  const classes = UseStyles();

  return (
    // <Alert
    //   severity="error"
    //   action={
    //     <Link to={`${process.env.PUBLIC_URL}/Dashboard`}>
    //       <Button color="inherit" size="small">
    //         Kembali ke Dashboard
    //       </Button>
    //     </Link>
    //   }
    // >
      // {/* <AlertTitle>Error</AlertTitle> */}
      // <strong>Terdapat kesalahan pada sistem</strong>
    {/* </Alert> */}
  // );
  )}
