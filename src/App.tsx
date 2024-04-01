import { useState } from "react";

import "./App.css";
import "./CSS/Scroll.css";

import Welcome from "./components/Welcome";
import RSVP from "./components/RSVP";
import Finalize from "./components/Finalize";
import Thanks from "./components/Thanks";

function App() {
  // Read parameters, type-check for null
  const params = new URLSearchParams(document.location.search);
  const guests = String(params.get("guest"));

  console.log(guests);

  // States
  const [step, setStep] = useState<number>(0);
  const [guestList, setGuestList] = useState<{
    guestsArr: string[];
    notes: string;
  }>();

  // Put together guest list and advance state
  const listParser = (guestsArr: string[], notes: string, step: number) => {
    setGuestList({ guestsArr, notes });
    setStep(step);
  };

  const submitApi = () => {
    console.log(guestList);
    setStep(2);
  };

  return (
    <>
      <Welcome />
      {step == 0 && guests != "null" ? (
        <RSVP handleSubmit={listParser} guests={guests} />
      ) : null}
      {step == 1 && guestList ? (
        <Finalize
          list={guestList}
          handleBack={listParser}
          handleSend={submitApi}
        />
      ) : null}
      {step == 2 && guestList ? <Thanks list={guestList} /> : null}
    </>
  );
}

export default App;
