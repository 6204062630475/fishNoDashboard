import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {
  IconButton,
  Button,
  Input,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
  TablePagination,
  TextField,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HistoryChart from "./HistoryChart";
import "./History.css";
import moment from "moment";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import "boxicons";

dayjs.extend(isBetween);
function History() {
  const darkTheme = createTheme({
    palette: {
      type: "dark", // ตั้งค่าให้เป็นธีม dark
      background: {
        default: "#121212", // สีพื้นหลังเริ่มต้นสำหรับธีม dark
        paper: "#1E1E1E", // สีพื้นหลังของกระดาษ (เช่น Paper component)
      },
      text: {
        primary: "#FFFFFF", // สีตัวอักษรหลัก
      },
    },
  });

  const [csvData, setCsvData] = useState([]);
  const [chartData, setchartData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [clonedCsv, setclonedCsv] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const handleStartDateChange = (event) => {
    console.log("setStartDate: ", event.target.value);
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    console.log("setEndDate: ", event.target.value);
    setEndDate(event.target.value);
  };

  // const handleFilter = () => {
  //   const startDateObj = dayjs(startDate, "YYYY-MM-DD")
  //     .add(543, "year")
  //     .format("D/M/YYYY");
  //   const endDateObj = dayjs(endDate, "YYYY-MM-DD")
  //     .add(543, "year")
  //     .format("D/M/YYYY");

  //   const filteredChartData = csvData.filter((row) => {
  //     const rowDate = dayjs(row.DATETIME, "D/M/YYYY").format("D/M/YYYY");
  //     // console.log(row.DATETIME);
  //     // if(rowDate.isBetween(dayjs(startDateObj),dayjs(endDateObj),"hour","[]")){
  //     //   console.log(rowDate);
  //     //   console.log(startDateObj, "|", endDateObj);
  //     // }
  //     return rowDate >= startDateObj && rowDate <= endDateObj;
  //     // return rowDate.isBetween(dayjs(startDateObj),dayjs(endDateObj),"day","[]");
  //   });
  //   console.log(filteredChartData);
  //   const reversedate = [...filteredChartData].reverse()
  //   setchartData(reversedate);
  // };
  // const handleFilter = () => {
  //   const startDateObj = dayjs(startDate, "YYYY-M-D")
  //     .add(543, "year")
  //     .format("D/M/YYYY");
  //   const endDateObj = dayjs(endDate, "YYYY-M-D")
  //     .add(543, "year")
  //     .format("D/M/YYYY");

  //   const filteredChartData = csvData.filter((row) => {
  //     const rowDate = dayjs(row.DATETIME, "D/M/YYYY").format("M/D/YYYY");
  //     console.log(rowDate);
  //     console.log(startDateObj, "|", endDateObj);
  //     return rowDate >= startDateObj && rowDate <= endDateObj;
  //   });
  //   // const filteredChartData = csvData
  //   console.log(filteredChartData);
  //   // console.log("09/02/2566" >= "31/08/2023");
  //   setchartData(filteredChartData.reverse());
  // };
  const handleFilter = () => {
    const startDateObj = dayjs(startDate);
    const endDateObj = dayjs(endDate);
    console.log(startDate, endDate);
    const filteredChartData = csvData.filter((row) => {
      const rowDate = dayjs(row.DATETIME, "D/M/YYYY");
      // console.log(rowDate);
      // console.log(startDateObj, "|", endDateObj);
      return dayjs(rowDate).isBetween(startDateObj, endDateObj, "day", "[]");
    });
    // const filteredChartData = csvData
    console.log(filteredChartData);
    // console.log("09/02/2566" >= "31/08/2023");
    setchartData(filteredChartData.reverse());
  };
  // const handleFilter = () => {
  //   const startDateObj = dayjs(startDate, "YYYY-M-D").add(543, "year")

  //   const endDateObj = dayjs(endDate, "YYYY-M-D").add(543, "year")

  //   const filteredChartData = csvData.filter((row) => {
  //     const rowDate = dayjs(row.DATETIME, "D/M/YYYY").format("YYYY-M-D");
  //     console.log(row.DATETIME);
  //     console.log(startDateObj, "|", endDateObj);
  //     // console.log(startDate, "|", endDate);
  //     return dayjs(rowDate).isBetween(startDateObj,endDateObj,"day","[]");
  //   });
  //   // const filteredChartData = csvData
  //   console.log(filteredChartData);
  //   // console.log("09/02/2566" >= "31/08/2023");
  //   const reversedate = [...filteredChartData].reverse()
  //   setchartData(reversedate);
  // };
  // const handleFilter = () => {
  //   const startDateObj = moment(startDate, "YYYY-MM-D")
  //     .add(543, "year")
  //     .format("D/M/YYYY");
  //     const endDateObj = moment(endDate, "YYYY-MM-D")
  //     .add(543, "year")
  //     .format("D/M/YYYY");

  //     const filteredChartData = csvData.filter((row) => {
  //       const rowDate = moment(row.DATETIME, "D/M/YYYY").format("D/M/YYYY");
  //       console.log(startDateObj, "|", endDateObj);
  //       console.log(rowDate);
  //       return rowDate >= startDateObj && rowDate <= endDateObj;
  //     });

  //   console.log(filteredChartData);
  //   setchartData(filteredChartData.reverse());
  // };
  const resetFilter = () => {
    setchartData(clonedCsv);
  };
  useEffect(() => {
    console.log("OpenHistory");
    // เรียกใช้ API เพื่อดึงข้อมูล CSV
    axios.get("http://103.114.203.159:3001/get-data").then((response) => {
      // ตัวอย่างข้อมูล CSV
      const Data = response.data;
      //   console.log(Data);
      // แปลง CSV เป็นอาร์เรย์
      const lines = Data.trim().split("\n");
      //   console.log(lines);
      const headers = lines[0].split(",").map((header) => header.trim()); // แก้ไขนี้
      //   console.log(headers);
      const csvArray = lines.slice(1).map((line) => {
        const values = line.split(",").map((value) => value.trim()); // แก้ไขนี้
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        return row;
      });
      const clonedCsvArray = [...csvArray]; // Clone csvArray ก่อนที่จะ reverse เพราะหาก reverse แล้วข้างบนจะโดนผลกระทบไปด้วย
      setclonedCsv(clonedCsvArray);
      setchartData(clonedCsvArray);
      setCsvData(csvArray.reverse()); // .reverse() คือเรียงข้อมูลจากล่างขึ้นบน
      //   console.log(csvData);
      // console.log(clonedCsvArray);
    });
  }, []);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const slicedData = csvData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
    
  const showDiv = () => {
    if(document.getElementById("Chart").style.display=="none") {
        document.getElementById("Chart").style.display = "flex";
        document.getElementById("Table").style.display = "none";
    } else {
        document.getElementById("Chart").style.display = "none";
        document.getElementById("Table").style.display = "flex";
    }
}

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <div className="navbar-container">
          <Navbar />
        </div>
        {/* <Button variant="outlined" id="Change" style={{position: "absolute", top: "15px", right: "1%"}}><box-icon name='trip-advisor' type='logo' flip='horizontal' color='#ffffff' ></box-icon>คู่มือการใช้งาน</Button> */}
        <Button variant="outlined" id="Change" onClick={showDiv} style={{position: "absolute", top: "80px", right: "2%"}}><box-icon name='show' color='#ffffff' ></box-icon></Button>
        {/* <div onClick={showDiv}>
<svg width="5em" height="5em" viewBox="0 0 24 24">
<path fill="currentColor" d="M22 22H2v-2h20v2zM10 2H7v16h3V2zm7 6h-3v10h3V8z"></path>
</svg>
</div> */}
        <div className="PaperWrapper" id="Chart">
          
          <Paper
            sx={{ overflow: "hidden", borderRadius: "20px" }}
            className="CenterPaper2"
          >
            <h2>Report</h2>
            <div className="input-container">
              <Input
                type="date"
                id="startdate"
                onChange={handleStartDateChange}
                style={{ marginRight: "8px" }}
              />
              <Input
                type="date"
                id="enddate"
                onChange={handleEndDateChange}
                style={{ marginRight: "8px" }}
              />
              <Button onClick={handleFilter} color="success">
                Filter Chart
              </Button>
              <Button onClick={resetFilter}>Reset</Button>
            </div>

            <HistoryChart data={chartData} />
          </Paper>
        </div>
        <div className="PaperWrapper" id="Table" style={{display:"none"}}>
          <Paper
            sx={{ overflow: "hidden", borderRadius: "20px" }}
            className="CenterPaper"
          >
            <h2>History</h2>
            <TableContainer sx={{ maxHeight: 440 }}>
              <Table
                stickyHeader
                aria-label="sticky table"
                className="TableContainer"
              >
                <TableHead>
                  <TableRow>
                    <TableCell style={{textAlign:"center"}}>Fish</TableCell>
                    <TableCell style={{textAlign:"center"}}>Date/Time</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell style={{textAlign:"center"}}>{row.FISH}</TableCell>
                      <TableCell style={{textAlign:"center"}}>{row.DATETIME}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={csvData.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
          {/* <Paper
            sx={{ overflow: "hidden", borderRadius: "20px" }}
            className="CenterPaper2"
          >
            <h2>Report</h2>
            <div className="input-container">
              <Input
                type="date"
                id="startdate"
                onChange={handleStartDateChange}
                style={{ marginRight: "8px" }}
              />
              <Input
                type="date"
                id="enddate"
                onChange={handleEndDateChange}
                style={{ marginRight: "8px" }}
              />
              <Button onClick={handleFilter} color="success">
                Filter Chart
              </Button>
              <Button onClick={resetFilter}>Reset</Button>
            </div>

            <HistoryChart data={chartData} />
          </Paper> */}
        </div>
        
      </div>
    </ThemeProvider>
  );
}

export default History;
