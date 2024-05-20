import axios from "axios";

function DeleteIcon({ result, onClose }) {
  const handleDelete = async () => {
    const confirm = window.confirm("Вы уверены, что хотите удалить?");
    if (confirm) {
      try {
        console.log(123);
        await axios.delete(`/api/tests/${result.id}`);
      } catch (error) {
        console.error(error);
      }
      if (result) {
        window.location.reload();
      }
    }
  };
  return (
    <img
      className="icon"
      src="/delete.svg"
      alt="Delete"
      onClick={handleDelete}
    />
  );
}

export default DeleteIcon;
