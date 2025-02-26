import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Home = () => {
  const handleFetchUsers = async () => {
    const response = await window.api.fetchUsers();
    console.log(response);
  }

  return <div>
    home
    <Link to={"/detail"}>aquii</Link>
    <br></br>
    <br></br>

    <button onClick={handleFetchUsers}>TEST</button>
  </div>
};

export default Home;
