import { Outlet, useNavigate, NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  House,
  UserPlus,
  Info,
  List,
  CaretRight,
  CaretLeft
} from 'phosphor-react'
import { SidebarItem } from './sidebar-item'

export function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    function handleNavigateToRegisterClient() {
      navigate('/create')
    }
    const unsub = window.api.onNewClient(handleNavigateToRegisterClient)

    return () => {
      unsub()
    }
  }, [])

  return (
    <div className="flex h-screen w-screen bg-gray-950 text-slate-100">
      <aside
        className={`
          ${isSidebarOpen ? 'w-64' : 'w-20'} 
          bg-gray-900 
          border-r 
          border-slate-700 
          transition-all 
          duration-300 
          ease-in-out 
          relative
        `}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="
            absolute 
            top-4 
            right-4 
            z-10 
            text-white 
            hover:bg-gray-700 
            p-2
            rounded
          "
        >
          {isSidebarOpen ? <CaretLeft size={24} /> : <CaretRight size={24} />}
        </button>

        <nav className="mt-16 px-4">
          <ul className="space-y-2">
            <SidebarItem
              to="/"
              icon={<House size={24} />}
              label="Home"
              isSidebarOpen={isSidebarOpen}
            />
            <SidebarItem
              to="/create"
              icon={<UserPlus size={24} />}
              label="Cadastrar"
              isSidebarOpen={isSidebarOpen}
            />
            <SidebarItem
              to="/detail"
              icon={<List size={24} />}
              label="Detalhes"
              isSidebarOpen={isSidebarOpen}
            />
            <SidebarItem
              to="/about"
              icon={<Info size={24} />}
              label="Sobre"
              isSidebarOpen={isSidebarOpen}
            />
          </ul>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col max-h-screen overflow-hidden">
        <header className="
          flex 
          items-center 
          p-4 
          border-b 
          border-slate-700 
          bg-gray-900
        ">
          <h1 className="text-xl font-bold">Dev Clientes</h1>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

