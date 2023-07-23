import BlankLayout from "src/@core/layouts/BlankLayout";
import {
  Document,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
  Font,
  Image,
} from "@react-pdf/renderer";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "src/configs/AxiosSetting";
import { configureStore } from "@reduxjs/toolkit";

Font.register({
  family: "Calibri",
  fonts: [{ src: "/font/calibri.ttf" }],
});

Font.register({
  family: "Calibri Bold",
  fonts: [{ src: "/font/calibribold.ttf" }],
});

Font.register({
  family: "Times New Roman",
  fonts: [{ src: "/font/tnr.ttf" }],
});

Font.register({
  family: "Times New Roman Bold",
  fonts: [{ src: "/font/tnrBold.ttf" }],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    paddingVertical: 50,
    paddingHorizontal: 40,
    fontFamily: "Times New Roman",
    letterSpacing: "0px",
    fontWeight: 50,
    display: "flex",
    flexDirection: "column",
    fontSize: 10,
    width: "2000px",
    height: "1056px",
  },
  // From Me
  section: {
    textAlign: "center",
    textTransform: "uppercase",
  },
  dataDiri: {
    textTransform: "uppercase",
  },
  cell: {
    border: "1px solid black",
    padding: 5,
    borderLeft: "none",
    textTransform: "uppercase",
  },
  row: {
    border: "1px solid black",
    padding: 5,
    borderTop: "none",
    borderLeft: "none",
    fontSize: "10px",
    textAlign: "justify",
  },
  wrapping: {
    display: "flex",
    gap: 3,
    flexDirection: "row",
    alignItems: "start",
    marginBottom: "-7px",
  },
  wrappingLeftSideLeft: {
    width: "35%",
    padding: 5,
    borderTop: "none",
  },
  wrappingCenterSideLeft: {
    width: "1%",
    padding: 5,
    borderTop: "none",
  },
  wrappingRightSideLeft: {
    width: "79%",
    padding: 5,
    borderTop: "none",
  },
});

const RaportMahasiswa = ({ id }) => {
  const router = useRouter();
  const { selected } = router.query;

  const [data, setData] = useState([]);
  const [cpl, setCpl] = useState([]);
  const [raport, setRaport] = useState([]);

  const [loading, setLoading] = useState(true);

  const getMahasiswa = async () => {
    let pks = [];
    if (!selected) pks = sessionStorage.getItem("pks");

    let rpts = [];
    const response = await axios.post(`mahasiswa/raport`, {
      id: id,
      pks: pks,
    });

    if (response.data.code !== 200)
      return {
        notFound: true,
      };

    const today = new Date();
    var months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ]; // Store month names in array

    setData({
      nim: response.data.data.nim,
      full_name: response.data.data.full_name,
      prodi: response.data.data.prodi.prodi,
      angkatan: `20${response.data.data.nim.slice(6, 8)}`,
      date:
        today.getDate() +
        " " +
        months[today.getMonth()] +
        " " +
        today.getFullYear(),
    });

    for (const rpt of response.data.data.raportCpl) {
      const nilai = parseFloat(rpt[0] / 25).toFixed(2);
      let keterangan = "";

      if (nilai >= 3.2) {
        keterangan = "Teladan";
      } else if (nilai >= 2.8) {
        keterangan = "Mahir";
      } else if (nilai >= 2.4) {
        keterangan = "Berkembang";
      } else {
        keterangan = "Tidak Kompeten";
      }

      rpts.push({
        nilai: nilai,
        presentase: parseFloat(rpt[0]).toFixed(2),
        keterangan: keterangan,
      });
    }

    setRaport(rpts);
    sessionStorage.removeItem("pks");
  };

  const getCpl = async () => {
    const cpl = await axios.get(`cpls`);
    if (cpl.data.code !== 200)
      return {
        notFound: true,
      };

    setCpl(cpl.data.data);
  };

  useEffect(() => {
    getMahasiswa();
    getCpl();
    setLoading(false);
  }, []);

  return (
    !loading && (
      <PDFViewer style={{ width: "100vw", height: "100vh" }}>
        <Document
          title="TTB_PMIIDPRT10094"
          subject="aw.pdf"
          style={{ width: "2000px" }}
        >
          <Page size="C4" style={styles.page}>
            <View style={styles.section}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "10%", padding: 5, borderTop: "none" }}>
                  <Image
                    src="/images/logo_undip.jpeg"
                    style={{ width: "70px" }}
                  />
                </View>
                <View style={{ width: "80%", padding: 5, borderTop: "none" }}>
                  <Text style={{ fontSize: "12px" }}>
                    Kementerian Riset, Teknologi dan Pendidikan Tinggi
                  </Text>
                  <Text style={{ fontSize: "12px" }}>
                    Universitas Diponegoro
                  </Text>
                  <Text
                    style={{
                      fontSize: "14px",
                      fontFamily: "Times New Roman Bold",
                    }}
                  >
                    Fakultas Teknik
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      fontFamily: "Times New Roman Bold",
                      marginTop: "10px",
                      marginBottom: "20px",
                    }}
                  >
                    Transkrip Capaian Pembelajaran Lulusan
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ display: "flex", flexDirection: "row" }}>
              <View style={{ width: "50%", padding: 5, borderTop: "none" }}>
                <View style={styles.wrapping}>
                  <View style={styles.wrappingLeftSideLeft}>
                    <Text>Nama</Text>
                  </View>
                  <View style={styles.wrappingCenterSideLeft}>
                    <Text style={{ textAlign: "left" }}>:</Text>
                  </View>
                  <View style={styles.wrappingRightSideLeft}>
                    <Text>{data.full_name}</Text>
                  </View>
                </View>
                <View style={styles.wrapping}>
                  <View style={styles.wrappingLeftSideLeft}>
                    <Text>NIM</Text>
                  </View>
                  <View style={styles.wrappingCenterSideLeft}>
                    <Text style={{ textAlign: "left" }}>:</Text>
                  </View>
                  <View style={styles.wrappingRightSideLeft}>
                    <Text>{data.nim}</Text>
                  </View>
                </View>
              </View>

              <View style={{ width: "50%", padding: 5, borderTop: "none" }}>
                <View style={styles.wrapping}>
                  <View style={styles.wrappingLeftSideLeft}>
                    <Text>Program Studi</Text>
                  </View>
                  <View style={styles.wrappingCenterSideLeft}>
                    <Text style={{ textAlign: "left" }}>:</Text>
                  </View>
                  <View style={styles.wrappingRightSideLeft}>
                    <Text>{data.prodi}</Text>
                  </View>
                </View>
                <View style={styles.wrapping}>
                  <View style={styles.wrappingLeftSideLeft}>
                    <Text>Tahun Masuk</Text>
                  </View>
                  <View style={styles.wrappingCenterSideLeft}>
                    <Text style={{ textAlign: "left" }}>:</Text>
                  </View>
                  <View style={styles.wrappingRightSideLeft}>
                    <Text>{data.angkatan}</Text>
                  </View>
                </View>
              </View>
            </View>

            <View style={{ paddingTop: 20 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  fontFamily: "Times New Roman Bold",
                }}
              >
                <View
                  style={{
                    width: "12%",
                    border: "1px solid black",
                    padding: 5,
                  }}
                >
                  <Text style={{ margin: "auto", textTransform: "uppercase" }}>
                    Kode
                  </Text>
                </View>
                <View style={[styles.cell, { width: "60%" }]}>
                  <Text style={{ margin: "auto" }}>Capaian Pembelajaran</Text>
                </View>

                <View style={[styles.cell, { width: "10%" }]}>
                  <Text style={{ margin: "auto" }}>Skor</Text>
                </View>

                <View style={[styles.cell, { width: "18%" }]}>
                  <Text style={{ margin: "auto" }}>Keterangan</Text>
                </View>
              </View>

              {cpl.map((item, idx) => (
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <View
                    style={{
                      width: "12%",
                      border: "1px solid black",
                      padding: 5,
                      borderTop: "none",
                      display: "flex",
                    }}
                  >
                    <Text
                      style={{
                        textAlign: "center",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {`PK${idx + 1}.`}
                    </Text>
                  </View>
                  <View style={[styles.row, { width: "60%" }]}>
                    <Text>{item.statement}</Text>
                  </View>
                  <View style={[styles.row, { width: "10%" }]}>
                    <Text
                      style={{ textAlign: "center" }}
                    >{`${raport[idx]["nilai"]}`}</Text>
                    <Text
                      style={{ textAlign: "center" }}
                    >{`(${raport[idx]["presentase"]})`}</Text>
                  </View>

                  <View style={[styles.row, { width: "18%" }]}>
                    <Text
                      style={{
                        textAlign: "center",
                        textTransform: "uppercase",
                      }}
                    >{`${raport[idx]["keterangan"]}`}</Text>
                  </View>
                </View>
              ))}
            </View>

            <Text style={{ marginTop: "5px" }}>
              {`Keterangan: 81-100% : Teladan, 71-80% : Mahir, 60-70% : Berkembang, <60% : Tidak Kompeten `}
            </Text>

            <Text style={{ marginTop: "15px" }}>
              {`Catatan : `.toUpperCase()}
            </Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <View
                style={{
                  width: "60%",
                  borderTop: "none",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    height: "100px",
                    border: "1px solid black",
                    marginTop: "10px",
                  }}
                ></View>
              </View>

              <View
                style={{
                  width: "60%",
                  borderTop: "none",
                  marginTop: "15px",
                  textAlign: "center",
                }}
              >
                <Text>Semarang, {`${data.date}`}</Text>
                <Text
                  style={{
                    marginTop: "5px",
                    marginBottom: "50px",
                    fontFamily: "Times New Roman Bold",
                  }}
                >
                  Dekan,
                </Text>
                <Text
                  style={{
                    fontFamily: "Times New Roman Bold",
                  }}
                >
                  Prof. Ir. M. Agung Wibowo, MM, MSc, PhD.
                </Text>
                <Text>NIP. 196702081994031005</Text>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    )
  );
};

RaportMahasiswa.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

export const getServerSideProps = async ({ params, req, res }) => {
  try {
    return {
      props: {
        id: params?.id,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default RaportMahasiswa;
