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

interface Tabs {
  [key: string]: string;
}


const fetchTab = () => {
  const tabs = localStorage.getItem("tab")
  const section = localStorage.getItem("section")
  const parsedObject: Tabs = tabs ? JSON.parse(tabs) : {}
  return section ? parsedObject[section] : ""
}

export const UserLocationProvider: React.FC<UserLocationProviderProps> = ({ children }) => {
  const [section, setSection] = useState<string>(localStorage.getItem("section") ?? "");
  const [tab, setTab] = useState<string>(fetchTab());

  const updateSectionLocation = (id: string | undefined) => {
    if (id === undefined) return

    const tabObject = JSON.parse(localStorage.getItem("tab") ?? "")

    localStorage.setItem("section", id ?? "")
    setSection(id)
    setTab(tabObject[id])
  }

  const updateTabLocation = (id: string | undefined) => {
    if (id === undefined) return

    const tabs = localStorage.getItem("tab")
    const parsedObject: Tabs = tabs ? JSON.parse(tabs) : {}
    parsedObject[section] = id

    localStorage.setItem("tab", JSON.stringify(parsedObject))
    setTab(id)
  }

  return (
    <UserLocationContext.Provider value={{ section, tab, updateSectionLocation, updateTabLocation }}>
      {children}
    </UserLocationContext.Provider>
  )
} 