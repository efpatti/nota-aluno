import React, { useState } from "react";
import "./InsertScore.css";

function InsertScore() {
  const [scores, setScores] = useState({
    português: "",
    matemática: "",
    biologia: "",
  });
  const [errors, setErrors] = useState({
    português: "",
    matemática: "",
    biologia: "",
  });
  const [average, setAverage] = useState(null);

  const handleScoreChange = (subject, event) => {
    const value = event.target.value.replace(/\D/g, "").slice(0, 2);
    setScores((prevScores) => ({ ...prevScores, [subject]: value }));

    if (parseInt(value, 10) > 10) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [subject]: "A nota não pode ser maior que 10",
      }));
    } else {
      setErrors((prevErrors) => ({ ...prevErrors, [subject]: "" }));
    }
  };

  const calculateAverage = () => {
    const totalScores = Object.values(scores)
      .filter((score) => score !== "")
      .map((score) => parseInt(score, 10));

    if (totalScores.length === 0) {
      setAverage(null);
    } else {
      const sum = totalScores.reduce((acc, score) => acc + score, 0);
      const avg = sum / totalScores.length;
      setAverage(avg.toFixed(2));
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1 className="score-title">Insira as notas</h1>
        </div>
      </div>
      <div className="row">
        {["Português", "Matemática", "Biologia"].map((subject) => (
          <div className="col-3" key={subject}>
            <div className="gaps">
              <label htmlFor={`score-${subject}`} className="label-score">
                {subject.charAt(0).toUpperCase() + subject.slice(1)}
              </label>
              <input
                pattern="2"
                type="number"
                className="score"
                id={`score-${subject}`}
                value={scores[subject]}
                onChange={(event) => handleScoreChange(subject, event)}
              />
              {errors[subject] && (
                <p className="error-message">{errors[subject]}</p>
              )}
            </div>
          </div>
        ))}
        <div className="col-3">
          <div className="gaps">
            <input
              type="button"
              onClick={calculateAverage}
              className="calculate-button"
              value="Calcular Média"
            />
            {average !== null && (
              <p className="average-message">Média: {average}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsertScore;
