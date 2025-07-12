import { useMutation, useQuery } from "@tanstack/react-query";
import { getTabs, addTab, updateTab, deleteTab } from "./TabsAPI";
import type { Tab } from "../../models/Tab.model";
import { useUserLocation } from "../../context/UserLocation";

const TabsAPI = {
    GetTabs: {
        useQuery: () => {
            const { section } = useUserLocation();

            return useQuery({
                queryKey: ['tabs', section],
                queryFn: () => getTabs(section ?? ""),
                enabled: !!section,
            })
        }
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
