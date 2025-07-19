import { Box } from "@mui/material";
import TextInput from "../../../TextInput/TextInput";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import api from "../../../../api/api";
import { useState } from "react";
import { useUserLocation } from "../../../../context/UserLocation";
import type { Tab } from "../../../../models/Tab.model";

const Tabs = () => {
    const { section, updateTabLocation, tab: currentTab } = useUserLocation();
    const [displayTabField, setDisplayTabField] = useState(false);
    const {data: tabs} = api.Tabs.GetTabs.useQuery()
    const {mutate: addTab} = api.Tabs.AddTab.useMutation()
    const {mutate: updateTab} = api.Tabs.UpdateTab.useMutation()
    const {mutate: deleteTab} = api.Tabs.DeleteTab.useMutation()


    const handleSave = (value: string) => {
        addTab({
            tab_name: value,
            section_id: section
        } as Tab)
        setDisplayTabField(false);
    };

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
                                value={tab.tab_name}
                                handleSave={handleSave} 
                                handleCancel={handleCancel}
                                handleOnClick={() => updateTabLocation(tab.id)}
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
                    handleSave={handleSave} 
                    handleCancel={handleCancel}
                    sx={{
                        width: "150px",
                        height: "25px",
                    }}  
                />
            }
            <AddRoundedIcon onClick={() => setDisplayTabField(true)} />
        </Box>
    );
};

export default Tabs;