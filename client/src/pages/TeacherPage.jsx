import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { appContext } from "../Context";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function TeacherPage() {
  const [newGroup, setNewGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const { user } = useContext(appContext);

  const onHandleSubmit = async () => {
    try {
      await axios.post("/api/teacher/addGroup", { group: newGroup });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function fetchGroups() {
      try {
        const response = await axios.get("/api/teacher/groups");
        setGroups(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchGroups();
  }, []);

  return (
    <>
      {user?.role === "admin" ? (
        <>
          <div className="mainContainer">
          <div>
            <p className="mb-5">Добавить группу</p>
            <Form className="mb-5" onSubmit={onHandleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Группа</Form.Label>
                <Form.Control
                  className="no-arrows"
                  type="number"
                  name="newGroup"
                  placeholder="Введите номер группы"
                  min={0}
                  required
                  value={newGroup}
                  onChange={(e) => setNewGroup(e.target.value)}
                />
              </Form.Group>
              <Button variant="secondary" type="submit">
                Добавить
              </Button>
            </Form>
          </div>
          <div>
            <p>Ваши Группы</p>
            <div>
              {groups.length > 0 ? (
                groups.map((group) => (
        
                  <div key={group.id}>
                    <a href={`/groups/${group.number}`}>{group.number}</a>
                  </div>
                ))
              ) : (
                <p>Список пуст</p>
              )}
            </div>
          </div>
          </div>
        </>
      ) : (
        <h1>404</h1>
      )}
    </>
  );
}
export default TeacherPage;
