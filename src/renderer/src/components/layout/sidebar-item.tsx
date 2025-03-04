import { NavLink } from "react-router-dom"

export function SidebarItem({
  to,
  icon,
  label,
  isSidebarOpen
}: {
  to: string,
  icon: React.ReactNode,
  label: string,
  isSidebarOpen: boolean
}) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => `
          flex 
          p-2 
          rounded 
          transition-colors 
          duration-200 
          ${isActive ? 'bg-gray-700' : 'hover:bg-gray-800'}
          ${isSidebarOpen ? 'justify-start' : 'justify-center'}
        `}
      >
        <span className={`inline-block ${isSidebarOpen ? 'mr-3' : 'mr-0'}`}>{icon}</span>
        {isSidebarOpen && <span>{label}</span>}
      </NavLink>
    </li>
  )
}