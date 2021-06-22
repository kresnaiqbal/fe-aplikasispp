import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './container/LandingPage';
import Dashboard from './container/Dashboard';
import RiwayatTransaksi from './container/RiwayatTransaksi';
import LaporanTunggakan from './container/Laporan/LaporanTunggakan';
import LaporanKeuangan from './container/Laporan/LaporanKeuangan';
import DaftarSantri from './container/DaftarSantri';
import AkunSantri from './container/Santri/AkunSantri';
import InputSPP from './container/InputSPP';
import AkunOperator from './container/Operator/AkunOperator';
import TambahAkunOperator from './container/Operator/TambahAkunOperator'; 

function Routing() {
    return (
        <Switch>
            <Route exact path='/' component={LandingPage}/>
            <Route exact path='/dashboard' component={Dashboard}/>
            <Route exact path='/DaftarSantri' component={DaftarSantri}/>
            <Route exact path='/AkunSantri' component={AkunSantri}/>
            <Route exact path='/AkunOperator' component={AkunOperator}/>
            <Route exact path='/AkunOperator/Tambah' component={TambahAkunOperator}/>
            <Route exact path='/LaporanKeuangan' component={LaporanKeuangan}/>
            <Route exact path='/LaporanTunggakan' component={LaporanTunggakan}/>
            <Route exact path='/RiwayatTransaksi' component={RiwayatTransaksi}/>
            <Route exact path='/InputSPP' component={InputSPP}/>
        </Switch>
    );
}

export default Routing;