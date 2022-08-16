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
  const [keyword, setKeyword] = useState(""); // 빈 문자열("")을 꼭 넣어줘야 함. 모든 데이터는 빈 문자열("")을 포함하고 있으므로, 검색하지 않을 때 모든 값을 불러들일 수 있음.
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
  // ⭐️ 아래 stateRefresh 함수를 통해서, 새로운 데이터 생성 후 => 다시 데이터를 받아오도록 함.
  // 그래서 추가된 부분만 추가해서 보여줄 수 있게 됨. (전체 페이지 새로고침 없이)
  // 실제 상용화할 때는 최근 10개만 불러오도록 한 후에, 나머지는 스크롤을 통해 새롭게 불러오도록 해야 함!!
  const stateRefresh = () => {
    setCustomers([]);
    setKeyword("");
    getCustomers();
  };
  const cellList = [
    "번호",
    "이미지",
    "이름",
    "생년월일",
    "성별",
    "직업",
    "설정",
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
            고객 관리 시스템
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="검색하기"
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
      {error && <div>에러가 발생했습니다: {error}</div>}
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
