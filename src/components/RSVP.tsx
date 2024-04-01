import "../CSS/RSVP.css";
import "../CSS/Checkmark.css"; // Courtesy of W3Schools

// Guest list
import guestList from "../assets/guest-list";
import { useState } from "react";

interface IRSVP {
  handleSubmit: (guestsArr: string[], notes: string, step: number) => void;
  guests: string;
}

const RSVP: React.FC<IRSVP> = ({ handleSubmit, guests }) => {
  // States
  const [notes, setNotes] = useState("");
  const [rsvpArr, setRsvpArr] = useState<string[]>([]);

  // Return values from the guest list
  const getGuests = (name: string) => {
    if (guestList[name]) {
      return guestList[name];
    } else {
      return [];
    }
  };

  // Confirmation handling
  const handleCheck = (name: React.FormEvent<HTMLInputElement>) => {
    const id = name.currentTarget.id;

    // If ID exists in the array
    if (rsvpArr.find((content) => id == content)) {
      // remove it
      deleteByValue(id);
    }
    // otherwise add it
    else {
      rsvpArr.push(id);
    }
  };

  // Text field handling
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };

  // Delete value from state array
  const deleteByValue = (value: string) => {
    setRsvpArr((oldValues) => {
      return oldValues.filter((name) => name !== value);
    });
  };

  return (
    <div className="rsvp-container">
      {getGuests(guests).map((name, index) => {
        return (
          <div key={index} className="rsvp-item">
            <b key={index + 10}>{name}</b>
            <label key={index + 100} className="check-container">
              <input
                key={index + 1000}
                id={name}
                type="checkbox"
                onChange={(e) => handleCheck(e)}
              />
              <span key={index + 10000} className="checkmark" />
            </label>
          </div>
        );
      })}
      {guests ? (
        <div className="submit">
          <textarea
            value={notes}
            onChange={(e) => handleChange(e)}
            placeholder="Let us know if you have any thoughts!"
          />
          <button onClick={() => handleSubmit(rsvpArr, notes, 1)}>CONFIRM</button>
        </div>
      ) : null}
    </div>
  );
};

export default RSVP;
