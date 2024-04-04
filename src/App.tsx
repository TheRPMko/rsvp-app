import { useState } from "react";

import { collection, setDoc, doc } from "firebase/firestore";
import { db } from "./assets/firebase";

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

  // States
  const [step, setStep] = useState<number>(0);
  const [guestList, setGuestList] = useState<{
    guestsArr: string[];
    notes: string;
  }>();

  // Firebase guests collection
  const guestsRef = collection(db, "guests");

  // Put together guest list and advance state
  const listParser = (guestsArr: string[], notes: string, step: number) => {
    setGuestList({ guestsArr, notes });
    setStep(step);
  };

  const submitApi = async () => {
    //console.log(guestList);
    for (let index = 0; index < guestList!.guestsArr.length; index++) {
      console.log(guestList?.guestsArr[index]);
      try {
        await setDoc(doc(guestsRef, `${guestList?.guestsArr[index]}`), {
          attending: true,
          note: `${guestList?.notes}`,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
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
