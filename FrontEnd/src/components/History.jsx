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
// import "boxicons";

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
  //table Data
  const [csvData, setCsvData] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  //Chart Data
  const [chartData, setchartData] = useState([]);
  const [backupChart, setBackupChart] = useState([]); //for reset button
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [sameday, setsameday] = useState(false);
  const handleStartDateChange = (event) => {
    console.log("setStartDate: ", event.target.value);
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    console.log("setEndDate: ", event.target.value);
    setEndDate(event.target.value);
  };

  const handleFilter = () => {
    const startDateObj = dayjs(startDate);
    const endDateObj = dayjs(endDate);
    console.log(startDate, endDate);
    const filteredChartData = csvData.filter((row) => {
      const rowDate = dayjs(row.DATETIME, "D/M/YYYY");
      return dayjs(rowDate).isBetween(startDateObj, endDateObj, "day", "[]");
    });
    console.log(filteredChartData);
    setchartData(filteredChartData.reverse());
    setsameday(startDate==endDate)//เช็คว่าเป็นวันเดียวกัน
    console.log(sameday);
  };

  const resetFilter = () => {
    setchartData(backupChart);
    setsameday(false)
    setStartDate("");
    setEndDate("");
  };
  useEffect(() => {
    console.log("OpenHistory");
    // เรียกใช้ API เพื่อดึงข้อมูล CSV
    axios.get("http://103.114.203.159:3001/get-data").then((response) => {
      // ตัวอย่างข้อมูล CSV
      const Data = response.data;
      // แปลง CSV เป็นอาร์เรย์
      const lines = Data.trim().split("\n");
      const headers = lines[0].split(",").map((header) => header.trim()); // แก้ไขนี้
      const csvArray = lines.slice(1).map((line) => {
        const values = line.split(",").map((value) => value.trim()); // แก้ไขนี้
        const row = {};
        headers.forEach((header, index) => {
          row[header] = values[index];
        });
        return row;
      });
      const clonedCsvArray = [...csvArray].reverse(); // Clone csvArray ก่อนที่จะ reverse เพราะหาก reverse แล้วข้างบนจะโดนผลกระทบไปด้วย
      setCsvData(clonedCsvArray); // .reverse() คือเรียงข้อมูลจากล่างขึ้นบน
      setBackupChart(csvArray)
      setchartData(csvArray);
      // const dailyAverages = {}; // สร้างออบเจ็กต์เพื่อเก็บค่าเฉลี่ยรายวัน
      
      // // วนลูปข้อมูล CSV เพื่อคำนวณค่าเฉลี่ยรายวัน
      // csvArray.forEach((row) => {
      //   const date = dayjs(row.DATETIME, "D/M/YYYY").format("D/M/YYYY");
      //   if (!dailyAverages[date]) {
      //     dailyAverages[date] = { count: 0, total: 0 };
      //   }
        
      //   // ดำเนินการรวมค่าที่ต้องการนับค่าเฉลี่ย
      //   const valueToAverage = parseFloat(row.FISH); // แทน YOUR_VALUE ด้วยชื่อคอลัมน์ที่คุณต้องการนับค่าเฉลี่ย
      //   if (!isNaN(valueToAverage)) {
      //     dailyAverages[date].count++;
      //     dailyAverages[date].total += valueToAverage;
      //   }
      // });

      // // สร้างข้อมูลสำหรับกราฟ
      // const thisAvgchartData = Object.keys(dailyAverages).map((date) => {
      //   const average = dailyAverages[date].total / dailyAverages[date].count;
      //   console.log(average);
      //   return { DATETIME: date, FISH: average };
      // });
      // setAvgchartData(thisAvgchartData) //reset button
      // setchartData(thisAvgchartData);
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
    if (document.getElementById("Chart").style.display == "none") {
      document.getElementById("Chart").style.display = "flex";
      document.getElementById("Table").style.display = "none";
    } else {
      document.getElementById("Chart").style.display = "none";
      document.getElementById("Table").style.display = "flex";
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <div>
        <div className="navbar-container">
          <Navbar />
        </div>
        {/* <Button variant="outlined" id="Change" style={{position: "absolute", top: "15px", right: "1%"}}><box-icon name='trip-advisor' type='logo' flip='horizontal' color='#ffffff' ></box-icon>คู่มือการใช้งาน</Button> */}
        <Button
          variant="outlined"
          id="Change"
          onClick={showDiv}
          style={{ position: "absolute", top: "80px", right: "2%" }}
        >
          เปลี่ยนหน้า
        </Button>
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
                value={startDate}
                onChange={handleStartDateChange}
                style={{ marginRight: "8px" }}
              />
              <Input
                type="date"
                id="enddate"
                value={endDate}
                onChange={handleEndDateChange}
                style={{ marginRight: "8px" }}
              />
              <Button onClick={handleFilter} color="success">
                Filter Chart
              </Button>
              <Button onClick={resetFilter}>Reset</Button>
            </div>

            <HistoryChart data={chartData} sameday = {sameday}/>
          </Paper>
        </div>
        <div className="PaperWrapper" id="Table" style={{ display: "none" }}>
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
                    <TableCell style={{ textAlign: "center" }}>Fish</TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      Date/Time
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {slicedData.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.FISH}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        {row.DATETIME}
                      </TableCell>
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
        </div>
      </div>
    </ThemeProvider>
  );
}

export default History;
