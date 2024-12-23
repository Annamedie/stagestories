import ConcertForm from "../components/ConcertForm";

function addconcert() {
  return (
    <div>
      <h2>Add Concert</h2>
      <ConcertForm isEdit={false} />
    </div>
  );
}
export default addconcert;
