import { useQuery } from "@tanstack/react-query";
import React from "react";

const About = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['version-app'], queryFn: async () => {
      const response = await window.api.getVersionApp();
      return response;
    }
  });
  return <div className="flex-1 flex flex-col py-12 text-white mx-10">
    <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">Sobre</h1>
    <p>Aplicação desenvolvida para Estudo</p>
    {/* <p>Versão do Electron: {process.versions.electron}</p> */}
    {/* <p>Versão do Node: {process.versions.node}</p> */}
    {/* <p>Versão do Chrome: {process.versions.chrome}</p> */}
    {/* <p>Versão do V8: {process.versions.v8}</p> */}

    <p>Versão atual do projeto: {!isFetching && data && data}</p>
  </div>;
};

export default About;
