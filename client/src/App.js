import "./App.css";
import Paper from "@mui/material/Paper";
import Customer from "./components/Customer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import CustomerAdd from "./components/CustomerAdd";

const StylePaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing.unit * 3,
  overflowX: "auto",
}));
const StyleTable = styled(Table)({
  minWidth: 1080,
});
const StyleCircularProgress = styled(CircularProgress)(({ theme }) => ({
  margin: theme.spacing.unit * 2,
}));

function App() {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState("");
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
    getCustomers();
  };

  return (
    <>
      {error && <div>에러가 발생했습니다: {error}</div>}
      <StylePaper>
        <StyleTable>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
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
              customers.map((customer) => {
                return (
                  <Customer
                    key={customer.id}
                    id={customer.id}
                    image={customer.image}
                    name={customer.name}
                    birthday={customer.birthday}
                    gender={customer.gender}
                    job={customer.job}
                  />
                );
              })
            )}
          </TableBody>
        </StyleTable>
      </StylePaper>
      <CustomerAdd stateRefresh={stateRefresh} />
    </>
  );
}

export default App;
