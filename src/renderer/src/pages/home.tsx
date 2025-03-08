import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { Customer } from "~/src/shared/types/ipc";

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const Home = () => {
  const queryClient = useQueryClient();

  const { data, isFetching } = useQuery({
    queryKey: ['customers'], queryFn: async () => {
      const response = await window.api.fetchAllCustomers();
      return response
    }
  })

  return <div className="flex-1 flex flex-col py-12 text-white mx-10">
    <div>
      <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">Todos Clientes</h1>
    </div>

    <section className="flex flex-col gap-6 w-full h-full pb-10 ">
      {!isFetching && data?.length === 0 && (
        <p className="text-white">Nenhum cliente cadastrado!</p>
      )}
      {data?.map((customer: Customer) => (
        <Link key={customer?._id}
          to={`/customer/${customer?._id}`}
          className="bg-gray-900 shadow-lg px-4 py-4 rounded-md hover:bg-gray-800 transition duration-300"
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
