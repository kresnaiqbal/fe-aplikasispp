import ApiLogin from "./Login/Login";
import ApiCreateSantri from "./Santri/CreateSantri";
import ApiShowSantri from "./Santri/ShowSantri";
import ApiEditSantri from "./Santri/EditSantri";
import ApiDetailSantri from "./Santri/DetailSantri";
import ApiDeleteSantri from "./Santri/DeleteSantri";
import ApiShowAdmin from "./Admin/ShowAdmin";
import ApiCreateAdmin from "./Admin/CreateAdmin";
import ApiDeleteAdmin from "./Admin/DeleteAdmin";
import ApiDetailAdmin from "./Admin/DetailAdmin";
import ApiEditAdmin from "./Admin/EditAdmin";
import ApiShowRiwayatTransaksi from "./Transaksi/ShowRiwayatTransaksi";
import ApiHitungJumlahSantri from "./Transaksi/HitungJumlahSantri";
import ApiHitungJumlahUang from "./Transaksi/HitungJumlahUang";
import ApiPembayaranSPPTunai from "./Transaksi/PembayaranSPPTunai";
import requestData from "./Santri/ShowSantri";
import ApiShowLaporanUangMasuk from "./Laporan/LaporanUangMasuk";
import ApiShowLaporanTunggakan from "./Laporan/LaporanTunggakan";

export {
  // Login,
  ApiLogin,
  ApiCreateSantri,
  ApiDeleteSantri,
  ApiEditSantri,
  ApiDetailSantri,
  ApiShowSantri,
  ApiShowAdmin,
  ApiDetailAdmin,
  ApiEditAdmin,
  ApiDeleteAdmin,
  ApiCreateAdmin,
  ApiHitungJumlahSantri,
  ApiHitungJumlahUang,
  ApiShowRiwayatTransaksi,
  ApiPembayaranSPPTunai,
  ApiShowLaporanUangMasuk,
  ApiShowLaporanTunggakan,
  requestData,
};
