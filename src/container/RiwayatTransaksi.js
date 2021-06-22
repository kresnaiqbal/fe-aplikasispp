import React from 'react';
import Navbar from '../components/Navbar';
import {Paper} from '@material-ui/core';
import { makeStyles, useTheme } from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    ukuranpaper: {
      width: '600px',
      height: '240px',
      borderRadius: '20px',
      marginLeft: '80px',
    },
    Head: {
        color: 'black',
        fontSize: '18px',
        fontFamily: 'Roboto',
        fontWeight: 700,
        marginTop: '20px',
        marginLeft: '30px'
      },
}));

function RiwayatTransaksi() {
    const classes = useStyles();
    return (
        <div>
            <Paper className={classes.ukuranpaper}>
                <div className={classes.Head}>
                    Riwayat Transaksi
                </div>
            </Paper>
        </div>

    );
}

export default RiwayatTransaksi;