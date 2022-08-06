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

const StylePaper = styled(Paper)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing.uni * 3,
  overflowX: "auto",
}));
const StyleTable = styled(Table)({
  minWidth: 1080,
});

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
  return (
    <>
      {error && <div>에러가 발생했습니다: {error}</div>}
      {loading ? (
        <div style={{ textAlign: "center" }}>Loading...</div>
      ) : (
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
              {customers.map((customer) => {
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
              })}
            </TableBody>
          </StyleTable>
        </StylePaper>
      )}
    </>
  );
}

export default App;
