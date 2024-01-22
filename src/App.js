import React, { useState } from "react";
import { ListGroup, ListGroupItem, Row, Col, Button, Modal, Form } from "react-bootstrap";
import { Check, Pencil, Plus } from "react-bootstrap-icons";
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
    <div className="App">
      <h1 className="text-center list-title">
        Alunos
        <Button variant="outline-success" className="ml-2" onClick={handleShowModal}>
          <Plus />
          Adicionar Novo Aluno
        </Button>
      </h1>

      <ListGroup className="bg-item">
        {students.map((item) => (
          <ListGroupItem key={item.id}>
            <img src={item.img} alt={item.name} className="list-item-img" />
            <p className="list-item">{item.name}</p>
            {item.showInputs ? (
              <>
                <Form.Group>
                  <Form.Label>Prova 1</Form.Label>
                  <Form.Control
                    type="text"
                    className="input-test"
                    name={`test-1-${item.id}`}
                    value={item.grades.test1}
                    onChange={(e) => handleInputChange(item.id, "test1", e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Prova 2</Form.Label>
                  <Form.Control
                    type="text"
                    className="input-test"
                    name={`test-2-${item.id}`}
                    value={item.grades.test2}
                    onChange={(e) => handleInputChange(item.id, "test2", e.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Prova 3</Form.Label>
                  <Form.Control
                    type="text"
                    className="input-test"
                    name={`test-3-${item.id}`}
                    value={item.grades.test3}
                    onChange={(e) => handleInputChange(item.id, "test3", e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="success"
                  className="button-check"
                  onMouseEnter={() => handleToggleHover(item.id)}
                  onMouseLeave={() => handleToggleHover(item.id)}
                  onClick={() => handleCalculateAverage(item.id)}
                >
                  {item.editMode ? <Pencil /> : <Check color={item.hovered ? "green" : "whitesmoke"} />}
                </Button>
              </>
            ) : (
              <div>
                <p>Média: {item.grades.average}</p>
                <Button
                  variant="primary"
                  className="button-edit"
                  onMouseEnter={() => handleToggleHover(item.id)}
                  onMouseLeave={() => handleToggleHover(item.id)}
                  onClick={() => handleEdit(item.id)}
                >
                  <Pencil color={item.hovered ? "whitesmoke" : "blue"} />
                </Button>
              </div>
            )}
          </ListGroupItem>
        ))}
      </ListGroup>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Novo Aluno</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nome do Aluno</Form.Label>
              <Form.Control
                type="text"
                placeholder="Digite o nome do aluno"
                value={newStudent.name}
                onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              />
            </Form.Group>
            <Form.Group controlId="formImage">
              <Form.Label>Imagem do Aluno</Form.Label>
              <Form.Control type="file" accept="image/*" onChange={handleUploadImage} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
          <Button variant="primary" onClick={handleAddStudent}>
            Adicionar Aluno
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
