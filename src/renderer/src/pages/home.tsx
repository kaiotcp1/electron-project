import { Link } from "react-router-dom";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Home = () => {
  const handleFetchUsers = async () => {
    const response = await window.api.fetchAllCustomers();
    console.log('RESPONSE FROM CLIENT', response);
  }

  const handleUseById = async () => {
    const response = await window.api.fetchCustomerById("88898cbc-5203-4cd1-84ff-2aa318433a73");
    console.log('RESPONSE FROM CLIENT', response);
  }

  const handleDeleteCustomer = async () => {
    const response = await window.api.deleteCustomer("88898cbc-5203-4cd1-84ff-2aa318433a73");
    console.log('RESPONSE FROM CLIENT', response);
  }

  return <div>
    home
    <Link to={"/detail"}>aquii</Link>
    <br></br>
    <br></br>

    <button onClick={handleFetchUsers}>Buscar ALL</button>
    <br></br>
    <button onClick={handleUseById}>Buscar por ID</button>
    <br></br>
    <button onClick={handleDeleteCustomer}>Deletar Cliente</button>
  </div>
};

export default Home;
