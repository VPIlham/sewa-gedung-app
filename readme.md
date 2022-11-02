npx sequelize-cli model:generate --name gedung --attributes name:string,harga:integer,img:string,fasilitas:string,alamat:string,kota:string,status:string,jam_siang:string,jam_malam:string

npx sequelize-cli model:generate --name pemesanan --attributes gedungId:integer,usersId:integer,kode_transaksi:string,typeBayar:string,harga:integer

npx sequelize-cli model:generate --name pemesanan_gedung --attributes gedungId:integer,kode_transaksi:string,nama_pemesan:string,nama_gedung:string,nomor_hp:string,sewaTgl:date,sewaJam:string,sewaWaktu:string,no_ktp:string,total_harga:integer,status:string
