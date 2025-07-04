import { useMutation, useQuery } from "@tanstack/react-query";
import { getTabs, addTab, updateTab, deleteTab } from "./TabsAPI";
import type { Tab } from "../../models/Tab.model";

const TabsAPI = {
    GetTabs: {
        useQuery: () => 
            useQuery({
                queryKey: ['tabs'],
                queryFn: getTabs,
            })
    },
    AddTab: {
        useMutation: () =>
            useMutation({
                mutationFn: (tab: Tab) => addTab(tab),
            })
    },
    UpdateTab: {
        useMutation: () =>
            useMutation({
                mutationFn: (tab: Tab) => updateTab(tab),
            })
    },
    DeleteTab: {
        useMutation: () =>
            useMutation({
                mutationFn: (tabId: string) => deleteTab(tabId),
            })
    }
}

export default TabsAPI;
