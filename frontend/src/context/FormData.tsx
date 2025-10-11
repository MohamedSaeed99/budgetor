import { createContext, useContext, useState, type ReactNode } from "react"
import { useUserLocation } from './UserLocation';
import type { Category } from "../models/Categories.model";

interface FormDataContextType {
    getCategories: () => Category[],
    updateCategories: (categories: Category[]) => void,
    getBudgetAmount: () => number,
    updateBudgetAmount: (amount: number) => void,
    deleteFormData: () => void
}

const FormDataContext = createContext<FormDataContextType | undefined>(undefined)
export const useFormData = () => {
    const context = useContext(FormDataContext)
    if (context === undefined) {
        throw new Error('useFormData must be used within an FormDataProvider')
    }
    return context
}

interface FormDataProviderProps {
  children: ReactNode
}

const parseFormData = (sectionId: string | undefined) => {
    if(sectionId === undefined) return {}
    const data = localStorage.getItem(sectionId);
    return data ? JSON.parse(data) : {};
}

const updateFormData = (sectionId: string | undefined, budgetAmount: number, categories: object[]) => {
    if(!sectionId) return
    localStorage.setItem(sectionId, JSON.stringify({"budgetAmount": budgetAmount, "categories": categories}))
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({ children }) => {
    const {section} = useUserLocation();
    const formData = parseFormData(section)
    const [budgetAmount, setBudgetAmount] = useState<number>(formData['budgetAmount'] ?? 0)

    const getCategories = () => {
        return formData['categories'] ?? []
    }

    const updateCategories = (categories: Category[]) => {
        updateFormData(section, getBudgetAmount(), categories)
    }

    const deleteFormData = () => {
        if(!section) return
        localStorage.removeItem(section)
    }
    
    const getBudgetAmount = () => {
        return budgetAmount
    }

    const updateBudgetAmount = (amount: number) => {
        setBudgetAmount(amount)
        updateFormData(section, budgetAmount, getCategories())
    }
    
    return (
        <FormDataContext.Provider value={{
            getCategories,
            updateCategories,
            getBudgetAmount,
            updateBudgetAmount,
            deleteFormData
        }}>
            {children}
        </FormDataContext.Provider>
    )
}