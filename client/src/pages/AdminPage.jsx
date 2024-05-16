import axios from "axios";
import React, { useEffect, useState } from "react";

function AdminPage() {
  const [login, setLogin] = useState("");
  const [pass, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");

  const [teachers, SetTeachers] = useState([]);
  const onHandleSubmit = async (e) => {
    const teacher = {
      login,
      pass,
      firstName,
      lastName,
      middleName,
      role: "teacher",
    };
    try {
      const res = await axios.post("/api/auth/addUser", teacher);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await axios.get("/api/teacher/teachers");
        SetTeachers(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchTeachers();
  }, []);

  return (
    <>
      <div>
        <p>Добавить преподавателя</p>
        <form onSubmit={onHandleSubmit}>
          <input
            type="text"
            name="login"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
          <input
            type="password"
            name="pass"
            placeholder="Пароль"
            value={pass}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="text"
            name="firstName"
            placeholder="Имя"
            value={firstName}
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            name="lastName"
            placeholder="Фамилия"
            value={lastName}
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <input
            type="text"
            name="middleName"
            placeholder="Отчество"
            value={middleName}
            required
            onChange={(e) => setMiddleName(e.target.value)}
          />

          <button type="sumbit">Добавить</button>
        </form>
      </div>
      <div>
        <p>Список преподавателей</p>
        <div>
          {teachers.length > 0 ? (
            teachers.map((teacher) => <div key={teacher.id}>{teacher.firstName} {teacher.lastName} {teacher.middleName}</div>)
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
export default AdminPage;
