import { Box } from "@mui/material";
import TextInput from "../../../TextInput/TextInput";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import api from "../../../../api/api";
import { useState } from "react";

const Tabs = () => {
    const {data: tabs} = api.Tabs.GetTabs.useQuery()
    const {mutate: addTab} = api.Tabs.AddTab.useMutation()
    const {mutate: updateTab} = api.Tabs.UpdateTab.useMutation()
    const {mutate: deleteTab} = api.Tabs.DeleteTab.useMutation()

    const [displayTabField, setDisplayTabField] = useState(false);

    const handleSave = (value: string) => {
        addTab({
            name: value,
            sectionId: "123"
        })
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
                        key={index}
                        value={tab.name}
                        handleSave={handleSave} 
                        handleCancel={handleCancel}
                        sx={{
                            width: "150px",
                            height: "25px",
                        }}  
                    />
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