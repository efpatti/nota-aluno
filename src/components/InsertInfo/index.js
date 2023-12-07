import "./InsertInfo.css";
import { useState } from "react";

export default function InsertInfo() {
  const [message, setMessage] = useState("");

  const handleChange = (infos, event) => {
    setMessage(event.target.value);
  };

  return (
    <div className="container">
        <div className="row">
            <div className="col-12">
                Informações do Aluno
            </div>
        </div>
        <div className="row">
        {["Nome", "Turma", "Foto"].map((infos) => (
            <div className="col-3" key={infos>
                <div className="gaps">
                    <label htmlFor={`message-${infos}` className="label-info"}>
                    {infos.charAt(0).toUpperCase() + subject.slice(1)}
              </label>
              <input maxLength={10}
              type="text"
              className="info"
              id={`info-${infos}`}
              value={message[infos]}
              onChange={(event) => handleChange(infos, event)}
              />
              </div>
              </div>
        ))}
        <div className="col-3">
        <div className="gaps">
          <input
            type="button"
            className="calculate-button"
            value="Calcular Média"
          />
          {message !== null && (
            <p className="average-message">Teste: {message}</p>
          )}
        </div>
      </div>
    </div>
  </div>
  );
}
