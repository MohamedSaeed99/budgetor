import { createContext, useContext, type ReactNode } from "react"
import { useUserLocation } from './UserLocation';
import type { Category } from "../models/Categories.model";

interface FormDataContextType {
    getCategories: () => Category[],
    updateCategories: (categories: Category[]) => void,
    getBudgetPeriod: () => string,
    updateBudgetPeriod: (period: string) => void,
    getBudgetAmount: () => number,
    updateBudgetAmount: (amount: number) => void,
    deleteFormData: () => void,
    updateFormDataByAI: (amount: number, categories: Category[], period: string) => void
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

const updateFormData = (sectionId: string | undefined, budgetAmount: number, categories: Category[], period: string) => {
    if(!sectionId) return
    console.log(`update form data ${sectionId} ${budgetAmount} ${categories}, ${period}`)
    localStorage.setItem(sectionId, JSON.stringify({"budgetAmount": budgetAmount, "categories": categories, "period": period}))
}

export const FormDataProvider: React.FC<FormDataProviderProps> = ({ children }) => {
    const {section} = useUserLocation();
    const formData = parseFormData(section)

    const getCategories = () => {
        return formData['categories'] ?? []
    }

    const updateFormDataByAI = (budgetAmount: number, categories: Category[], period: string) => {
        updateFormData(section, budgetAmount, categories, period)
    }

    const updateCategories = (categories: Category[]) => {
        updateFormData(section, getBudgetAmount(), categories, getBudgetPeriod())
    }

    const getBudgetPeriod = () => {
        return formData['period'] ?? ""
    }

    const updateBudgetPeriod = (period: string) => {
        updateFormData(section, getBudgetAmount(), getCategories(), period)
    }

    const deleteFormData = () => {
        if(!section) return
        localStorage.removeItem(section)
    }
    
    const getBudgetAmount = () => {
        return formData['budgetAmount'] ?? 0
    }

    const updateBudgetAmount = (amount: number) => {
        updateFormData(section, amount, getCategories(), getBudgetPeriod())
    }
    
    return (
        <FormDataContext.Provider value={{
            getCategories,
            updateCategories,
            getBudgetPeriod,
            updateBudgetPeriod,
            getBudgetAmount,
            updateBudgetAmount,
            deleteFormData,
            updateFormDataByAI
        }}>
            {children}
        </FormDataContext.Provider>
    )
}