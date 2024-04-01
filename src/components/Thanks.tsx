import "../CSS/Thanks.css";

interface IThanks {
  list: { guestsArr: string[]; notes: string };
}

const Thanks: React.FC<IThanks> = ({ list }) => {
  const willAttend: boolean = list.guestsArr.length > 0;

  return (
    <div className="thanks-container">
      {willAttend ? (
        <h2>Thank you, see you soon!</h2>
      ) : (
        <h2>Sorry you can't make it!</h2>
      )}
    </div>
  );
};

export default Thanks;
