import { useQueryClient, useMutation } from "@tanstack/react-query";
import React, { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface DataMutation {
  name: string;
  email: string;
  address: string;
  role: string;
  phone: string;
};


const Create = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const roleRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const { isPending, mutateAsync: createCustomer } = useMutation({
    mutationFn: async (data: DataMutation) => {
      const response = await window.api.addCustomer({ ...data, status: true });
      navigate('/');
      return response
    }, onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers'] });
    }
  });


  const handleCustomer = async (e: FormEvent) => {
    e.preventDefault();

    const name = nameRef.current?.value;
    const email = emailRef.current?.value;
    const address = addressRef.current?.value;
    const role = roleRef.current?.value;
    const phone = phoneRef.current?.value;

    if (!name || !email || !address || !role || !phone) {
      return;
    };

    await createCustomer({ name, email, address, role, phone });
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center h-full ">
      <section>
        <h1 className="text-2xl font-bold mb-4">Cadastrar novo cliente</h1>
      </section>

      <form onSubmit={handleCustomer} className="w-full max-w-96 mt-4">
        <div className="mb-2">
          <label htmlFor="name" className="text-lg block mb-1">Nome:</label>
          <input
            id="name"
            type="text"
            placeholder="Digite o nome do cliente..."
            className="
              w-full 
              h-9 
              rounded 
              text-black 
              px-2 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              transition-all 
              duration-300
            "
            ref={nameRef}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="address" className="text-lg block mb-1">Endereço:</label>
          <input
            id="address"
            type="text"
            placeholder="Digite o endereço completo..."
            className="
              w-full 
              h-9 
              rounded 
              text-black 
              px-2 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              transition-all 
              duration-300
            "
            ref={addressRef}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="text-lg block mb-1">Email:</label>
          <input
            id="email"
            type="text"
            placeholder="Digite o Email..."
            className="
              w-full 
              h-9 
              rounded 
              text-black 
              px-2 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              transition-all 
              duration-300
            "
            ref={emailRef}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="role" className="text-lg block mb-1">Cargo:</label>
          <input
            id="role"
            type="text"
            placeholder="Digite o Cargo..."
            className="
              w-full 
              h-9 
              rounded 
              text-black 
              px-2 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              transition-all 
              duration-300
            "
            ref={roleRef}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="phone" className="text-lg block mb-1">Telefone:</label>
          <input
            id="phone"
            type="text"
            placeholder="Digite o Telefone..."
            className="
              w-full 
              h-9 
              rounded 
              text-black 
              px-2 
              border 
              border-gray-300 
              focus:outline-none 
              focus:ring-2 
              focus:ring-blue-500 
              focus:border-transparent 
              transition-all 
              duration-300
            "
            ref={phoneRef}
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="
            bg-blue-800 
            rounded 
            flex 
            items-center 
            justify-center 
            w-full 
            h-9 
            my-4 
            text-white 
            shadow-md 
            hover:bg-blue-600 
            transition-all 
            duration-200
            disabled:bg-gray-500
          "
        >
          Cadastrar
        </button>
      </form>
    </div>
  )
};

export default Create;