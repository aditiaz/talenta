import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

export function PDFTable({ users }) {
  const styles = StyleSheet.create({
    page: {
      flexDirection: "row",
      backgroundColor: "#3a7ba1",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
    headerText: {
      marginBottom: 10,
      fontSize: 16,
      fontWeight: "bold",
      color: "#ffffff",
    },
    table: {
      display: "table",
      width: "auto",
      marginBottom: 10,
    },
    tableRow: {
      flexDirection: "row",
      borderBottomWidth: 1,
      borderBottomColor: "#000000",
      borderBottomStyle: "solid",
      alignItems: "center",
      height: 24,
      color: "#f0eee6",
    },
    tableHeaderCell: {
      backgroundColor: "#007bff",
      color: "#000000",
      width: 100,
      padding: 5,
      textAlign: "center",
    },
    tableCell: {
      width: 100,
      padding: 5,
      textAlign: "center",
      color: "#f0eee6",
    },
  });

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.headerText}>Daftar Teman</Text>
          <table className="h-5 table-auto">
            <thead className="text-white text-lg">
              <tr>
                <th className="border-2 border-white w-64">
                  {" "}
                  <Text style={styles.tableHeaderCell}>Nama Teman</Text>
                </th>
                <th className="border-2 border-white w-36">
                  {" "}
                  <Text style={styles.tableHeaderCell}>Jenis Kelamin</Text>
                </th>
                <th className="border-2 border-white w-28">
                  {" "}
                  <Text style={styles.tableHeaderCell}>Usia</Text>
                </th>
              </tr>
            </thead>
            <tbody className="max-h-10 overflow-y-scroll">
              {users ? (
                users.map((user) => {
                  return (
                    <tr key={user.name} className="text-white text-lg text-center">
                      <td className="border-2 border-white">
                        {" "}
                        <Text style={styles.tableCell}>{user.name}</Text>
                      </td>
                      <td className="border-2 border-white">
                        <Text style={styles.tableCell}>{user.gender}</Text>
                      </td>
                      <td className="border-2 border-white">
                        {" "}
                        <Text style={styles.tableCell}>{user.age}</Text>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="3" className="text-white text-lg text-center">
                    Loading
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </View>
      </Page>
    </Document>
  );
}
