import "./App.css";
import Paper from "@mui/material/Paper";
import Customer from "./components/Customer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomerAdd from "./components/CustomerAdd";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

const StylePaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  minWidth: 1080,
  // marginTop: theme.spacing.unit * 3,
  // overflowX: "auto",
}));
const StyleTable = styled(Table)({
  minWidth: 1080,
});
const StyleCircularProgress = styled(CircularProgress)(({ theme }) => ({
  margin: theme.spacing.unit * 2,
}));
const StyleDiv = styled("div")(() => ({
  marginTop: 15,
  marginBottom: 15,
  display: "flex",
  justifyContent: "center",
}));

function App() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
  const [keyword, setKeyword] = useState(""); // ??? ?????????("")??? ??? ???????????? ???. ?????? ???????????? ??? ?????????("")??? ???????????? ????????????, ???????????? ?????? ??? ?????? ?????? ???????????? ??? ??????.
  useEffect(() => {
    getCustomers();
  }, []);
  const getCustomers = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/customers");
      const body = await response.json();
      setCustomers(body);
      setLoading(false);
    } catch (error) {
      setError(error);
    }
  };
  // ?????? ?????? stateRefresh ????????? ?????????, ????????? ????????? ?????? ??? => ?????? ???????????? ??????????????? ???.
  // ????????? ????????? ????????? ???????????? ????????? ??? ?????? ???. (?????? ????????? ???????????? ??????)
  // ?????? ???????????? ?????? ?????? 10?????? ??????????????? ??? ??????, ???????????? ???????????? ?????? ????????? ??????????????? ?????? ???!!
  const stateRefresh = () => {
    setCustomers([]);
    setKeyword("");
    getCustomers();
  };
  const cellList = [
    "??????",
    "?????????",
    "??????",
    "????????????",
    "??????",
    "??????",
    "??????",
  ];
  const handleValueChange = (e) => {
    setKeyword(e.target.value);
  };
  const filteredComponents = (data) => {
    data = data.filter((customer) => {
      return customer.name.indexOf(keyword) > -1;
    });
    return data.map((customer) => {
      return (
        <Customer
          key={customer.id}
          id={customer.id}
          image={customer.image}
          name={customer.name}
          birthday={customer.birthday}
          gender={customer.gender}
          job={customer.job}
          stateRefresh={stateRefresh}
        />
      );
    });
  };

  return (
    <>
      <AppBar position="static" style={{ width: "100%", minWidth: 1080 }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            ?????? ?????? ?????????
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="????????????"
              inputProps={{ "aria-label": "search" }}
              name="keyword"
              value={keyword}
              onChange={handleValueChange}
            />
          </Search>
        </Toolbar>
      </AppBar>
      <StyleDiv>
        <CustomerAdd stateRefresh={stateRefresh} />
      </StyleDiv>
      {error && <div>????????? ??????????????????: {error}</div>}
      <StylePaper>
        <StyleTable>
          <TableHead>
            <TableRow>
              {cellList.map((item) => {
                return (
                  <TableCell style={{ fontSize: "1.0rem" }}>{item}</TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan="6" align="center">
                  <StyleCircularProgress />
                </TableCell>
              </TableRow>
            ) : (
              filteredComponents(customers)
            )}
          </TableBody>
        </StyleTable>
      </StylePaper>
    </>
  );
}

export default App;
