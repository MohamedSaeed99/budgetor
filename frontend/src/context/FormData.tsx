import { createContext, useContext, useState, type ReactNode } from "react"
import { useUserLocation } from './UserLocation';

interface FormDataContextType {
    addCategory: (category: object) => void,
    getCategories: () => object[],
    updateCategory: (index: number, category: object) => void,
    deleteCategory: (index: number) => void,
    getBudgetAmount: (amount: number) => number,
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
    const [categories, setCategories] = useState<object[]>(formData['categories'] ?? [])

    const addCategory = (category: object) => {
        setCategories([...categories, category])
    }

    const getCategories = () => {
        return categories
    }

    const updateCategory = (index: number, category: object) => {
        const updatedCategories = categories
        updatedCategories[index] = category
        setCategories(updatedCategories)
        updateFormData(section, budgetAmount, categories)
    }

    const deleteCategory = (index: number) => {
        const updatedCategories = categories.filter((_, i) => i !== index)
        setCategories(updatedCategories)
        updateFormData(section, budgetAmount, categories)
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
        updateFormData(section, budgetAmount, categories)
    }
    
    return (
        <FormDataContext.Provider value={{
            getCategories,
            addCategory,
            updateCategory,
            deleteCategory,
            getBudgetAmount,
            updateBudgetAmount,
            deleteFormData
        }}>
            {children}
        </FormDataContext.Provider>
    )
}