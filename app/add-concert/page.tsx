import ConcertForm from "../components/ConcertForm";

function addconcert() {
  return (
    <div>
      <h1>Add Concert</h1>
      <ConcertForm isEdit={false} />
    </div>
  );
}
export default addconcert;
