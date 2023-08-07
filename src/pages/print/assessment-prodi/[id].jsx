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

import { configureStore } from "@reduxjs/toolkit";
import { useAuth } from "src/hooks/useAuth";
import { Table } from "@medicaboo/react-pdf-table";
import axios from "src/configs/AxiosSetting";

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
    border: "1px solid grey",
    padding: 5,
    borderLeft: "none",
    textTransform: "uppercase",
  },
  row: {
    border: "1px solid grey",
    padding: 5,
    borderTop: "none",
    borderLeft: "none",
    borderLeft: "none",
    fontSize: "10px",
    textAlign: "justify",
  },
  tableLeft: {
    width: "20%",
    padding: "5px",
  },
  tableRight: {
    width: "80%",
  },
  flexRow: {
    display: "flex",
    flexDirection: "row",
  },
  flexCol: {
    display: "flex",
    flexDirection: "column",
  },
  headerSiklus: {
    height: "40px",
    borderRight: "1px solid grey",
    borderBottom: "1px solid grey",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: "12px",
    fontFamily: "Times New Roman Bold",
  },
  rowDivider: {
    borderRight: "1px solid grey",
  },
  itemLeft: {
    border: "1px solid grey",
    borderTop: "0",
    height: "25px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: "12px",
  },
  itemRight: {
    border: "1px solid grey",
    borderTop: "0",
    borderLeft: "0",
    height: "25px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "stretch",
    fontSize: "12px",
  },
  oddRow: {
    backgroundColor: "#FCE4D6",
  },
});

const AssessmentProdi = ({ id }) => {
  const router = useRouter();
  const auth = useAuth();

  const [loading, setLoading] = useState(true);
  const [pks, setPks] = useState([]);
  const [siklus, setSiklus] = useState([]);
  const [width, setWidth] = useState();

  const getPerkuliahan = async () => {
    const assessment = await axios.get(`get-pdf-assessment-prodi/${id}`);
    if (assessment.data.code !== 200)
      return {
        notFound: true,
      };

    setPks(assessment.data.data.pks);
    setSiklus(assessment.data.data.siklus);
    setWidth(`${100 / assessment.data.data.siklus.length}%`);
  };

  useEffect(() => {
    getPerkuliahan();
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
                    Assessment Program Studi {auth.user.prodi}
                  </Text>
                </View>
              </View>
            </View>

            <View style={{ paddingTop: 20 }}>
              <View style={[styles.flexRow]}>
                <View style={[styles.tableLeft, { border: "1px solid grey" }]}>
                  <Text
                    style={{
                      margin: "auto",
                      textTransform: "uppercase",
                      textAlign: "center",
                      lineHeight: 1.5,
                      fontFamily: "Times New Roman Bold",
                    }}
                  >
                    Capaian {"\n"} Pembelajaran {"\n"} Program {"\n"} (CPP)
                  </Text>
                </View>

                <View style={[styles.tableRight, styles.flexCol]}>
                  <View
                    style={{
                      height: "40px",
                      border: "1px solid grey",
                      borderLeft: 0,
                      fontSize: "12px",
                      fontFamily: "Times New Roman Bold",
                    }}
                  >
                    <Text style={{ margin: "auto", fontSize: "13px" }}>
                      Perbandingan Rerata Pemenuhan CPP
                    </Text>
                  </View>

                  <View style={[styles.headerSiklus]}>
                    {siklus.map((item, i) => (
                      <View
                        style={
                          ([styles.rowDivider],
                          {
                            width: width,
                            borderRight:
                              siklus.length != i + 1 ? "1px solid grey" : "",
                          })
                        }
                      >
                        <Text style={{ margin: "auto" }}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {pks.map((item, i) => (
                <View style={[styles.flexRow]}>
                  <View style={[styles.tableLeft, styles.itemLeft]}>
                    <Text style={{ textAlign: "center" }}>{item.cpl}</Text>
                  </View>

                  <View style={[styles.tableRight]}>
                    <View
                      style={[
                        styles.itemRight,
                        i % 2 == 0 ? styles.oddRow : "",
                      ]}
                    >
                      {siklus.map((sik, i) => (
                        <View
                          style={[
                            styles.rowDivider,
                            {
                              width: width,
                              borderRight:
                                siklus.length != i + 1 ? "1px solid grey" : "",
                            },
                          ]}
                        >
                          <Text style={{ margin: "auto" }}>{item[sik]}</Text>
                        </View>
                      ))}
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </Page>
        </Document>
      </PDFViewer>
    )
  );
};

AssessmentProdi.getLayout = (page) => <BlankLayout>{page}</BlankLayout>;

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

export default AssessmentProdi;
