import React, { useState } from "react";
import { post } from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

function CustomerAdd({ stateRefresh }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setFile(null);
    setFileName("");
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setOpen(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    addCustomer().then((response) => {
      console.log(response.data);
      stateRefresh(); // ⭐️
    });
    setFile(null);
    setFileName("");
    setUserName("");
    setBirthday("");
    setGender("");
    setJob("");
    setOpen(false);
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.value);
  };
  const handleValueChange = (e) => {
    if (e.target.name === "userName") setUserName(e.target.value);
    if (e.target.name === "birthday") setBirthday(e.target.value);
    if (e.target.name === "gender") setGender(e.target.value);
    if (e.target.name === "job") setJob(e.target.value);
  };
  const addCustomer = () => {
    const url = "/api/customers";
    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", userName);
    formData.append("birthday", birthday);
    formData.append("gender", gender);
    formData.append("job", job);
    const config = {
      headers: {
        "content-type": "multipart/form-data", // 전달하고자 하는 데이터에 파일이 포함되어 있을 때 표시하는 것
      },
    };
    return post(url, formData, config);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        고객 추가하기
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>고객 추가</DialogTitle>
        <DialogContent>
          <input
            style={{ display: "none" }}
            accept="image/*"
            type="file"
            id="raised-button-file"
            file={file}
            value={fileName}
            onChange={handleFileChange}
          />
          <label htmlFor="raised-button-file">
            <Button
              variant="contained"
              color="primary"
              component="span"
              name="file"
            >
              {fileName === "" ? "프로필 이미지 선택" : fileName}
            </Button>
          </label>
          <br />
          <TextField
            label="이름"
            type="text"
            name="userName"
            value={userName}
            onChange={handleValueChange}
          />
          <br />
          <TextField
            label="생년월일"
            type="text"
            name="birthday"
            value={birthday}
            onChange={handleValueChange}
          />
          <br />
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">성별</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="gender"
              value={gender}
              onChange={handleValueChange}
            >
              <FormControlLabel value="남자" control={<Radio />} label="남자" />
              <FormControlLabel value="여자" control={<Radio />} label="여자" />
            </RadioGroup>
          </FormControl>
          <br />
          <TextField
            label="직업"
            type="text"
            name="job"
            value={job}
            onChange={handleValueChange}
          />
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleFormSubmit}
          >
            추가
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClose}>
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    /*
    <form onSubmit={handleFormSubmit}>
      <h1>고객 추가</h1>
      프로필 이미지:{" "}
      <input
        type="file"
        name="file"
        file={file}
        value={fileName}
        onChange={handleFileChange}
      />
      <br />
      이름:{" "}
      <input
        type="text"
        name="userName"
        value={userName}
        onChange={handleValueChange}
      />
      <br />
      생년월일:{" "}
      <input
        type="text"
        name="birthday"
        value={birthday}
        onChange={handleValueChange}
      />
      <br />
      성별:{" "}
      <ul style={{ listStyle: "none" }}>
        <li>
          <label>
            <input
              type="radio"
              name="gender"
              value="남자"
              checked={gender === "남자"}
              onChange={handleValueChange}
            />
            남자
          </label>
        </li>
        <li>
          <label>
            <input
              type="radio"
              name="gender"
              value="여자"
              checked={gender === "여자"}
              onChange={handleValueChange}
            />
            여자
          </label>
        </li>
      </ul>
      <br />
      직업:{" "}
      <input type="text" name="job" value={job} onChange={handleValueChange} />
      <button type="submit">추가하기</button>
    </form>
    */
  );
}

export default CustomerAdd;
