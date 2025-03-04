import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Customer } from "~/src/shared/types/ipc";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Home = () => {
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ['customers'], queryFn: async () => {
      const response = await window.api.fetchAllCustomers();
      return response
    }
  })
  // const handleFetchUsers = async () => {
  //   const response = await window.api.fetchAllCustomers();
  //   console.log('RESPONSE FROM CLIENT', response);
  // }

  // const handleUseById = async () => {
  //   const response = await window.api.fetchCustomerById("88898cbc-5203-4cd1-84ff-2aa318433a73");
  //   console.log('RESPONSE FROM CLIENT', response);
  // }

  // const handleDeleteCustomer = async () => {
  //   const response = await window.api.deleteCustomer("88898cbc-5203-4cd1-84ff-2aa318433a73");
  //   console.log('RESPONSE FROM CLIENT', response);
  // }

  return <div className="flex-1 flex flex-col py-12 text-white mx-10">
    <div>
      <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">Todos Clientes</h1>
    </div>

    <section className="flex flex-col gap-6 w-full h-full pb-10 ">
      {data?.map((customer: Customer) => (
        <Link key={customer?._id}
          to={'/'}
          className="bg-gray-900 shadow-lg px-4 py-4 rounded-md"
        >
          <p className="mb-2 font-semibold text-lg text-white">{customer.name}</p>
          <p className="font-normal">Email: {customer.email}</p>
          {customer?.phone && (
            <p className="font-normal">Telefone: {customer.phone}</p>
          )}
        </Link>
      ))}
    </section>

  </div>
};

export default Home;
