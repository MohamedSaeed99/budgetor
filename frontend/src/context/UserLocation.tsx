import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface UserLocationContextType {
  section: string | undefined
  tab: string | undefined
  updateSectionLocation: (id: string | undefined) => void
  updateTabLocation: (id: string | undefined) => void
}

const UserLocationContext = createContext<UserLocationContextType | undefined>(undefined)

export const useUserLocation = () => {
  const context = useContext(UserLocationContext)
  if (context === undefined) {
    throw new Error('useUserLocation must be used within an UserLocationProvider')
  }
  return context
}

interface UserLocationProviderProps {
  children: ReactNode
}

export const UserLocationProvider: React.FC<UserLocationProviderProps> = ({ children }) => {
  const [section, setSection] = useState<string | undefined>(localStorage.getItem("section") ?? undefined);
  const [tab, setTab] = useState<string | undefined>(localStorage.getItem("tab") ?? undefined);

  const updateSectionLocation = (id: string | undefined) => {
    localStorage.setItem("section", id ?? "")
    setSection(id)
  }

  const updateTabLocation = (id: string | undefined) => {
    localStorage.setItem("tab", id ?? "")
    setTab(id)
  }

  return (
    <UserLocationContext.Provider value={{ section, tab, updateSectionLocation, updateTabLocation }}>
      {children}
    </UserLocationContext.Provider>
  )
} 