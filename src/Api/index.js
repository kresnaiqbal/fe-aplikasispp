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
import ApiShowRiwayatTransfer from "./Transaksi/ShowRiwayatTransfer";
import ApiHitungJumlahSantri from "./Transaksi/HitungJumlahSantri";
import ApiHitungJumlahUang from "./Transaksi/HitungJumlahUang";
import ApiHitungJumlahUangDaily from "./Transaksi/HitungJumlahUangDaily";
import ApiPembayaranSPPTunai from "./Transaksi/PembayaranSPPTunai";
import requestData from "./Santri/ShowSantri";
import ApiShowLaporanUangMasuk from "./Laporan/LaporanUangMasuk";
import ApiShowLaporanTunggakan from "./Laporan/LaporanTunggakan";
import ApiHitungJumlahTransaksi from "./Transaksi/HitungJumlahTransaksi";
import ApiHitungJumlahSantriMenunggak from "./Transaksi/HitungJumlahSantriMenunggak";
import ApiDownloadLaporanUangMasuk from "./Laporan/CetakLaporanKeuangan";
import ApiExportLaporanTunggakan from "./Laporan/CetakLaporanTunggakan";
import ApiApprovalTransaksi from "./Transaksi/ApprovalTransaksiTunai";
import ApiCetakSuratTagihan from "./Laporan/SuratTagihan";
import ApiShowRiwayatPembayaran from "./Santri/ShowRiwayatPembayaran";

export {
  // Login,
  ApiLogin,
  ApiCreateSantri,
  ApiDeleteSantri,
  ApiEditSantri,
  ApiDetailSantri,
  ApiShowSantri,
  ApiShowRiwayatPembayaran,
  ApiShowAdmin,
  ApiDetailAdmin,
  ApiEditAdmin,
  ApiDeleteAdmin,
  ApiCreateAdmin,
  ApiHitungJumlahSantri,
  ApiHitungJumlahUang,
  ApiHitungJumlahUangDaily,
  ApiHitungJumlahSantriMenunggak,
  ApiHitungJumlahTransaksi,
  ApiShowRiwayatTransaksi,
  ApiShowRiwayatTransfer,
  ApiPembayaranSPPTunai,
  ApiShowLaporanUangMasuk,
  ApiDownloadLaporanUangMasuk,
  ApiShowLaporanTunggakan,
  ApiExportLaporanTunggakan,
  ApiApprovalTransaksi,
  ApiCetakSuratTagihan,
  requestData,
};
