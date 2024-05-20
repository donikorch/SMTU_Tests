import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";

function ResultCard({ students, isOpen, onClose, item }) {
  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Body>
        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Имя</th>
                <th>Фамилия</th>
                <th>Часть 1</th>
                <th>Результат</th>
                <th>Часть 2</th>
                <th>Результат</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.firstName} </td>
                  <td> {student.lastName}</td>

                  {student.Results.filter(
                    (results) => results.module === item
                  ).map((result) => (
                    <>
                      <td> {result.score}</td>
                      <td>
                        {result.passed ? <span> + </span> : <span> - </span>}
                      </td>
                    </>
                  ))}
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ResultCard;

// {student.Results.filter(
//   (results) => results.module === item
// ).map((result) => (
//   <div key={result.id}>
//     <p>
//       Часть {result.type} пройдена на {result.score}%.
//     </p>
//     {result.passed ? <p>Сдано.</p> : <p>Не сдано.</p>}
//   </div>

// ))}
