function addconcert() {
  return (
    <div>
      <h1>Add Concert</h1>
      <form>
        <label>
          Concert Name:
          <input type="text" name="name" />
        </label>
        <label>
          Date:
          <input type="date" name="date" />
        </label>
        <label>
          Time:
          <input type="time" name="time" />
        </label>
        <label>
          Location:
          <input type="text" name="location" />
        </label>
        <label>
          Description:
          <input type="text" name="description" />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
export default addconcert;
