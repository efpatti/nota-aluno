import React, { useState } from "react";
import { TiPencil, TiPlus, TiInputChecked } from "react-icons/ti";
import ImgMessi from "./img/messi.jpg";
import ImgCr7 from "./img/cr7.jpg";
import ImgFrederico from "./img/frederico.jpeg";
import ImgJoao from "./img/joao.jpeg";
import ImgMama from "./img/mama.jpeg";
import ImgGuilherme from "./img/guilherme.jpeg";

function App() {
  const initialStudents = [
    {
      name: "Messi",
      img: ImgMessi,
      id: 1,
      grades: { test1: "", test2: "", test3: "" },
      showInputs: true,
      editMode: false,
    },
    {
      name: "Frederico",
      img: ImgFrederico,
      id: 2,
      grades: { test1: "", test2: "", test3: "" },
      showInputs: true,
      editMode: false,
    },
    {
      name: "João",
      img: ImgJoao,
      id: 3,
      grades: { test1: "", test2: "", test3: "" },
      showInputs: true,
      editMode: false,
    },
    {
      name: "Cr7",
      img: ImgCr7,
      id: 4,
      grades: { test1: "", test2: "", test3: "" },
      showInputs: true,
      editMode: false,
    },
    {
      name: "Filinho de mama",
      img: ImgMama,
      id: 5,
      grades: { test1: "", test2: "", test3: "" },
      showInputs: true,
      editMode: false,
    },
    {
      name: "Guilherme",
      img: ImgGuilherme,
      id: 6,
      grades: { test1: "", test2: "", test3: "" },
      showInputs: true,
      editMode: false,
    },
  ];

  const [students, setStudents] = useState(initialStudents);
  const [showModal, setShowModal] = useState(false);
  const [newStudent, setNewStudent] = useState({
    name: "",
    img: "",
    id: students.length + 1,
    grades: { test1: "", test2: "", test3: "" },
    showInputs: true,
    editMode: false,
  });

  const handleToggleHover = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, hovered: !student.hovered } : student
    );
    setStudents(updatedStudents);
  };

  const calculateAverage = (grades) => {
    const values = Object.values(grades).map(Number).filter((value) => !isNaN(value));
    const sum = values.reduce((acc, value) => acc + value, 0);
    const average = sum / values.length || 0;
    return average.toFixed(2);
  };

  const isValidInput = (value) => {
    const isNumber = !isNaN(value);
    const isInRange = isNumber && parseFloat(value) >= 0 && parseFloat(value) <= 10;
    return isNumber && isInRange;
  };

  const handleCalculateAverage = (id) => {
    const updatedStudents = students.map((student) => {
      if (student.id === id) {
        const average = calculateAverage(student.grades);
        return { ...student, grades: { ...student.grades, average }, showInputs: false, editMode: true };
      }
      return student;
    });
    setStudents(updatedStudents);
  };

  const handleEdit = (id) => {
    const updatedStudents = students.map((student) =>
      student.id === id ? { ...student, showInputs: true, editMode: false } : student
    );
    setStudents(updatedStudents);
  };

  const handleInputChange = (id, test, value) => {
    if (isValidInput(value) || value === "") {
      const updatedStudents = students.map((student) =>
        student.id === id ? { ...student, grades: { ...student.grades, [test]: value } } : student
      );
      setStudents(updatedStudents);
    }
  };

  const handleShowModal = () => {
    setNewStudent({ ...newStudent, showInputs: true, editMode: false });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setNewStudent({ ...newStudent, img: reader.result });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleAddStudent = () => {
    setStudents([...students, newStudent]);
    setNewStudent({
      name: "",
      img: "",
      id: students.length + 1,
      grades: { test1: "", test2: "", test3: "" },
      showInputs: true,
      editMode: false,
    });
    handleCloseModal();
  };

  return (
    <div className="App bg-slate-100">
      <h1 className="text-center list-title">
        <button onClick={handleShowModal} className="ml-2 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
          <TiPlus className="inline-block mr-2" />
          Adicionar Novo Aluno
        </button>
      </h1>

      <ul>
        {students.map((item) => (
          <li key={item.id} className="border-b border-gray-200 py-4 flex items-center justify-between">
            <img src={item.img} alt={item.name} className="h-16 w-16 rounded-full object-cover" />
            <p className="text-lg">{item.name}</p>
            {item.showInputs ? (
              <div className="flex items-center">
                <input
                  type="text"
                  className="appearance-none border border-gray-200 rounded py-1 px-2 mr-2"
                  name={`test-1-${item.id}`}
                  value={item.grades.test1}
                  onChange={(e) => handleInputChange(item.id, "test1", e.target.value)}
                />
                <input
                  type="text"
                  className="appearance-none border border-gray-200 rounded py-1 px-2 mr-2"
                  name={`test-2-${item.id}`}
                  value={item.grades.test2}
                  onChange={(e) => handleInputChange(item.id, "test2", e.target.value)}
                />
                <input
                  type="text"
                  className="appearance-none border border-gray-200 rounded py-1 px-2 mr-2"
                  name={`test-3-${item.id}`}
                  value={item.grades.test3}
                  onChange={(e) => handleInputChange(item.id, "test3", e.target.value)}
                />
                <button
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                  onMouseEnter={() => handleToggleHover(item.id)}
                  onMouseLeave={() => handleToggleHover(item.id)}
                  onClick={() => handleCalculateAverage(item.id)}
                >
                  <TiInputChecked className="inline-block mr-2" />
                </button>
              </div>
            ) : (
              <div>
                <p>Média: {item.grades.average}</p>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                  onMouseEnter={() => handleToggleHover(item.id)}
                  onMouseLeave={() => handleToggleHover(item.id)}
                  onClick={() => handleEdit(item.id)}
                >
                  <TiPencil className="inline-block mr-2" />
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded w-1/3">
            <h2 className="text-lg font-semibold mb-4">Adicionar Novo Aluno</h2>
            <form>
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nome do Aluno
                </label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Digite o nome do aluno"
                  value={newStudent.name}
                  onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                  Imagem do Aluno
                </label>
                <input
                  type="file"
                  id="image"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  accept="image/*"
                  onChange={handleUploadImage}
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 hover:bg-gray-400 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Fechar
                </button>
                <button
                  type="button"
                  onClick={handleAddStudent}
                  className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 border border-transparent rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
                >
                  Adicionar Aluno
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
