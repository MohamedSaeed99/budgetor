import { Box, Button } from "@mui/material";
import TextInput from "../../../TextInput/TextInput";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import api from "../../../../api/api";
import { useState } from "react";
import { useUserLocation } from "../../../../context/UserLocation";
import type { Tab } from "../../../../models/Tab.model";

const Tabs = () => {
    const { section, updateTabLocation } = useUserLocation();
    const [displayTabField, setDisplayTabField] = useState(false);
    const [editingTab, setEditingTab] = useState<string | undefined>();
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
                    return editingTab === tab.id ? 
                        <TextInput
                            key={index}
                            value={tab.tab_name}
                            handleSave={handleSave} 
                            handleCancel={handleCancel}
                            sx={{
                                width: "150px",
                                height: "25px",
                            }} />
                        :
                        <Button
                            variant={"outlined"}
                            size={"small"}
                            sx={{
                                textTransform: 'none',
                                justifyContent: 'flex-start',
                                minWidth: '80px',
                                height: '32px',
                                fontSize: '12px'
                            }}
                            onClick={() => updateTabLocation(tab.id)}
                            onDoubleClick={() => setEditingTab(tab.id)}
                        >
                            {tab.tab_name}
                        </Button>
                })
            }
            { displayTabField &&
                <TextInput
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