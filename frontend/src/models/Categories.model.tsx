export type Category = {
    name: string,
    amount: number
}

export type Goal = {
    sectionId: string,
    budgetAmount: number,
    budgetPeriod: string,
    categories: Category[]
}