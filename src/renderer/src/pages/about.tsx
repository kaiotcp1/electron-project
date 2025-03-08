import { useQuery } from "@tanstack/react-query";
import React from "react";

const About = () => {
  const { data, isFetching } = useQuery({
    queryKey: ['version-app'],
    queryFn: async () => {
      const projectVersion = await window.api.getVersionApp();
      const infoVersion = await window.api.getVersionsInfo();

      return {
        projectVersion,
        infoVersion
      };
    }
  });

  return (
    <div className="flex-1 flex flex-col py-12 text-white mx-10">
      <h1 className="text-white text-xl lg:text-2xl font-semibold mb-4">Sobre</h1>
      <p className="mb-6">Aplicação desenvolvida para Estudo</p>

      {!isFetching && data?.infoVersion && (
        <div className="space-y-2">
          <p>Versão do Electron: {data.infoVersion.electron}</p>
          <p>Versão do Node: {data.infoVersion.node}</p>
          <p>Versão do Chrome: {data.infoVersion.chrome}</p>
          <p>Versão do V8: {data.infoVersion.v8}</p>
        </div>
      )}

      <p className="mt-6">Versão atual do projeto: {!isFetching && data?.projectVersion}</p>
    </div>
  );
};

export default About;