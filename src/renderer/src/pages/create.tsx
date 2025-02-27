import React from "react";

const Create = () => {
  const handleCustomer = async () => {
    const response = await window.api.addCustomer({
      name: "Fulano",
      phone: "999999999",
      address: "Rua 1",
      email: "fulano@com",
      role: "admin",
      status: true
    })
    console.log('RESPONSE FROM CLIENT', response);
  };

  return <div>
    <h1>Pagina Novo Cliente !!!</h1>
    <button onClick={handleCustomer}>Cadastrar</button>
  </div>;
};

export default Create;
