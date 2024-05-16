import axios from "axios";
import React, { useEffect, useState } from "react";

function TeacherPage() {
  const [newGroup, setNewGroup] = useState("");
  const [groups, setGroups] = useState([]);
  const onHandleSubmit = async (e) => {
    try {
      const res = await axios.post("/api/teacher", { group: newGroup });
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
      <div>
        <p>Добавить группу</p>
        <form onSubmit={onHandleSubmit}>
          <input
            className="no-arrows"
            type="number"
            name="newGroup"
            placeholder="Введите номер группы"
            min={0}
            required
            value={newGroup}
            onChange={(e) => setNewGroup(e.target.value)}
          />
          <button type="sumbit">Добавить</button>
        </form>
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
            <p>Loading...</p>
          )}
        </div>
      </div>
    </>
  );
}
export default TeacherPage;
