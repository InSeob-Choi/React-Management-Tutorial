import React, { useState } from "react";
import { post } from "axios";

function CustomerAdd({ stateRefresh }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [userName, setUserName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");

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
      <ul>
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
      {/* <input
        type="text"
        name="gender"
        value={gender}
        onChange={handleValueChange}
      /> */}
      <br />
      직업:{" "}
      <input type="text" name="job" value={job} onChange={handleValueChange} />
      <button type="submit">추가하기</button>
    </form>
  );
}

export default CustomerAdd;
