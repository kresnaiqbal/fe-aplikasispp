import React from 'react';
import Navbar from '../components/Navbar';
import RiwayatTransaksi from './RiwayatTransaksi';

function DashboardView() {
    return (
        <div>
            <Navbar>
                <RiwayatTransaksi/>
            </Navbar>
            
        </div>

    );
}

export default DashboardView;
