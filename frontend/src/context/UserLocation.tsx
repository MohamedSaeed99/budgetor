import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface UserLocationContextType {
  section: string | undefined
  tab: string | undefined
  updateSectionLocation: (id: string | undefined) => void
  updateTabLocation: (id: string | undefined) => void
  deleteSection: (id: string | undefined) => void
  deleteTab: (id: string | undefined) => void
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

const getSectionHistory = (): string[] => {
  const history = localStorage.getItem("sectionHistory")
  return history ? JSON.parse(history) : []
}

const setSectionHistory = (history: string[]) => {
  localStorage.setItem("sectionHistory", JSON.stringify(history))
}

const getTabHistory = (): { [sectionId: string]: string[] } => {
  const history = localStorage.getItem("tabHistory");
  return history ? JSON.parse(history) : {};
};

const setTabHistory = (history: { [sectionId: string]: string[] }) => {
  localStorage.setItem("tabHistory", JSON.stringify(history));
};

const getCurrentSection = (): string => {
  const history = getSectionHistory();
  return history.length > 0 ? history[history.length - 1] : "";
}

const getCurrentTab = (section: string): string => {
  const tabHistory = getTabHistory();
  const arr = tabHistory[section] || [];
  return arr.length > 0 ? arr[arr.length - 1] : "";
}

export const UserLocationProvider: React.FC<UserLocationProviderProps> = ({ children }) => {
  const [section, setSection] = useState<string>(getCurrentSection());
  const [tab, setTab] = useState<string>(getCurrentTab(getCurrentSection()));

  const updateSectionLocation = (id: string | undefined) => {
    if (!id) return;

    let history = getSectionHistory().filter(s => s !== id);
    history.push(id);
    setSectionHistory(history);

    setSection(id);

    setTab(getCurrentTab(id));
  };

  const deleteSection = (id: string | undefined) => {
    if(!id) return
    const history = getSectionHistory().filter(s => s !== id);
    setSectionHistory(history);

    const tabHistory = getTabHistory();
    delete tabHistory[section];
    setTabHistory(tabHistory);

    const prevSection = history.length > 0 ? history[history.length - 1] : "";
    setSection(prevSection);
    setTab(getCurrentTab(prevSection));
  };


  const updateTabLocation = (id: string | undefined) => {
    if (!id || !section) return;

    const tabHistory = getTabHistory();
    const arr = (tabHistory[section] ?? []).filter(t => t !== id);
    arr.push(id);
    tabHistory[section] = arr;
    
    setTabHistory(tabHistory);
    setTab(id);
  };

  const deleteTab = (id: string | undefined) => {
    if (!section || !tab || !id) return;

    const tabHistory = getTabHistory();
    const arr = (tabHistory[section] ?? []).filter(t => t !== id);
    tabHistory[section] = arr;
    setTabHistory(tabHistory);

    const prevTab = arr.length > 0 ? arr[arr.length - 1] : "";
    setTab(prevTab);
  };

  return (
    <UserLocationContext.Provider value={{
      section,
      tab,
      updateSectionLocation,
      updateTabLocation,
      deleteSection,
      deleteTab
    }}>
      {children}
    </UserLocationContext.Provider>
  )
} 