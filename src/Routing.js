import React from 'react';
import {Route, Switch} from 'react-router-dom';
import LandingPage from './container/LandingPage';
import Dashboard from './container/Dashboard';
import RiwayatTransaksi from './container/RiwayatTransaksi';
import LaporanTunggakan from './container/Laporan/LaporanTunggakan';
import LaporanKeuangan from './container/Laporan/LaporanKeuangan';
import DaftarSantri from './container/Santri/DaftarSantri';
import DetailDataSantri from './container/Santri/DetailDataSantri';
import TambahDataSantri from './container/Santri/TambahDataSantri';
import SuntingDataSantri from './container/Santri/SuntingDataSantri';
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
            <Route exact path='/DaftarSantri/Detail' component={DetailDataSantri}/>
            <Route exact path='/DaftarSantri/Tambah' component={TambahDataSantri}/>
            <Route exact path='/DaftarSantri/Sunting' component={SuntingDataSantri}/>
            <Route exact path='/AkunSantri' component={AkunSantri}/>
            <Route exact path='/AkunAdmin' component={AkunOperator}/>
            <Route exact path='/AkunAdmin/Tambah' component={TambahAkunOperator}/>
            <Route exact path='/LaporanKeuangan' component={LaporanKeuangan}/>
            <Route exact path='/LaporanTunggakan' component={LaporanTunggakan}/>
            <Route exact path='/RiwayatTransaksi' component={RiwayatTransaksi}/>
            <Route exact path='/InputSPP' component={InputSPP}/>
        </Switch>
    );
}

export default Routing;