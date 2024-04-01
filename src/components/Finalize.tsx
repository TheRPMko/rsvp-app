import "../CSS/Finalize.css";
import "../CSS/Checkmark.css";

interface IFinalize {
  list: { guestsArr: string[]; notes: string };
  handleBack: (guestsArr: string[], notes: string, step: number) => void;
  handleSend: () => void;
}

const Finalize: React.FC<IFinalize> = ({ list, handleBack, handleSend }) => {
  return (
    <div className="finalize-container">
      <h2>Is everything correct?</h2>
      {list.guestsArr.map((name, index) => {
        return (
          <div key={index} className="finalize-item">
            <b key={index + 10}>{name}</b>
            <label key={index + 100} className="check-container">
              <input
                key={index + 1000}
                type="checkbox"
                checked={true}
                readOnly
              />
              <span key={index + 10000} className="checkmark" />
            </label>
          </div>
        );
      })}
      {list.notes != "" ? (
        <div className="submit">
          <h3>Notes:</h3>
          <p>{list.notes}</p>
        </div>
      ) : null}
      <div className="finalize-buttons">
        <button onClick={() => handleSend()}>✔ Submit</button>
        <button onClick={() => handleBack(list.guestsArr, list.notes, 0)}>
          ✘ Back
        </button>
      </div>
    </div>
  );
};

export default Finalize;
