import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function GroupPage() {
  const { group } = useParams();

  const [login, setLogin] = useState("");
  const [pass, setPassword] = useState("");
  const [firstName, setName] = useState("");
  const [lastName, setLastname] = useState("");

  const [students, setStudents] = useState("");
  const onHandleSubmit = async (e) => {
    const student = {
      login,
      pass,
      firstName,
      lastName,
      group,
      role: "student",
    };
    try {
      const res = await axios.post("/api/auth/addUser", student);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get(`/api/teacher/${group}/students`);
        setStudents(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchStudents();
  }, []);

  return (
    <>
      <form onSubmit={onHandleSubmit}>
        <input
          type="text"
          name="login"
          placeholder="Логин"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />

        <input
          type="password"
          name="pass"
          placeholder="Пароль"
          value={pass}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={firstName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          name="lastname"
          placeholder="Фамилия"
          value={lastName}
          onChange={(e) => setLastname(e.target.value)}
        />
        <button type="submit">Создать</button>
      </form>
      <p>Студенты группы N{group}</p>
      <div>
        {students.length > 0 ? (
          students.map((student) => (
            <div key={student.id}>
              {student.firstName} {student.lastName}
            </div>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default GroupPage;
