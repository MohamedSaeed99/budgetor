import { Box } from "@mui/material";
import TextInput from "../../../TextInput/TextInput";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import api from "../../../../api/api";
import { useState } from "react";
import { useUserLocation } from "../../../../context/UserLocation";
import type { Tab } from "../../../../models/Tab.model";

const Tabs = () => {
    const { section, updateTabLocation, tab: currentTab, deleteTab: deleteTabLocation } = useUserLocation();
    const [displayTabField, setDisplayTabField] = useState(false);
    const {data: tabs, refetch} = api.Tabs.GetTabs.useQuery()
    const {mutate: addTab} = api.Tabs.AddTab.useMutation()
    const {mutate: updateTab} = api.Tabs.UpdateTab.useMutation()
    const {mutate: deleteTab} = api.Tabs.DeleteTab.useMutation()


    const handleAdd = (value: string) => {
        addTab({
            tab_name: value,
            section_id: section
        } as Tab, {
            onSuccess: () => refetch()
        })
        setDisplayTabField(false);
    };

    const handleUpdate = (id: string | undefined, value: string) => {
        if(!id) return
        updateTab({
            id: id,
            tab_name: value,
            section_id: section
        } as Tab, {
            onSuccess: () => refetch()
        })
        setDisplayTabField(false);
    };

    const handleDelete = (id: string | undefined) => {
        if (id === undefined) return
        deleteTab(id, {
            onSuccess: () => {
                refetch()
                deleteTabLocation(id)
            }
        })
    }

    const handleCancel = () => {
        setDisplayTabField(false);
    };

    return (
        <Box sx={{ display: 'flex', alignItems: 'center', height: "100%" }}>
            {
                tabs?.map((tab, index) => {
                    return <TextInput
                                selected={tab.id === currentTab}
                                editing={false}
                                key={index}
                                object={{value: tab.tab_name, id: tab.id}}
                                handleSave={(value: string) => handleUpdate(tab.id, value)} 
                                handleCancel={handleCancel}
                                handleOnClick={() => updateTabLocation(tab.id)}
                                handleDelete={handleDelete}
                                sx={{
                                    width: "150px",
                                    height: "25px",
                                }} 
                            />
                })
            }
            { displayTabField &&
                <TextInput
                    editing={true}
                    handleSave={handleAdd}
                    handleCancel={handleCancel}
                    sx={{
                        width: "150px",
                        height: "25px",
                    }} 
                    handleDelete={(_: string | undefined) => {} }                
                />
            }
            <AddRoundedIcon onClick={() => setDisplayTabField(true)} />
        </Box>
    );
};

export default Tabs;