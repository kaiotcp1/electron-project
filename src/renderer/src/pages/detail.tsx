import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Trash } from "phosphor-react";
import { Link, useNavigate, useParams } from "react-router-dom";


const Detail = () => {
  const { id } = useParams<{ id: string }>();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data, isFetching } = useQuery({
    queryKey: ['customer'], queryFn: async () => {
      const response = await window.api.fetchCustomerById(id!);
      return response;
    }
  });

  const { isPending, mutateAsync: handleDeleteCustomer } = useMutation({
    mutationFn: async (id: string) => {
      try {
        await window.api.deleteCustomer(id);
      } catch (error: any) {
        console.log(error);
      }
    }, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      navigate('/');
    }
  })

  return <main className="flex-1 flex flex-col py-12 text-white mx-10">
    <Link className="flex items-center gap-2 mb-2"
      to={'/'}>
      <ArrowLeft className="w-4 h-4 hover:w-5 hover:h-5 transition-all duration-200" />
      <span>Voltar</span>
    </Link>

    <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">Detalhes do cliente</h1>
    <section>
      {!isFetching && data && (
        <article className="w-full relative flex flex-col gap-1 bg-gray-900 shadow-lg px-4 py-4 rounded-md">
          <h2 className="text-lg font-semibold">{data.name}</h2>
          <p>Email: {data.email}</p>
          {data.address && <p>Endereço: {data.address}</p>}
          {data.phone && <p>Telefone: {data.phone}</p>}
          <div className="absolute -top-3 -right-3">
            <button
              onClick={async () => { handleDeleteCustomer(data._id) }}
              disabled={isPending}
              className="bg-red-500 hover:bg-red-600 p-2 rounded-full">
              <Trash className="w-4 h-4 text-white" />
            </button>
          </div>
        </article>
      )}
    </section >
    <section className="flex flex-col mt-4 bg-gray-900 p-4 rounded-md">
      <p >
        <span className="font-semibold text-white">Cargo: </span>{data?.role}</p>
      <p >
        <span className="font-semibold text-white">Status atual: </span>{data?.status ? 'Ativo' : 'Inativo'}</p>
    </section>
  </main >;
};

export default Detail;
