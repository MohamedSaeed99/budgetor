import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button, IconButton, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import api from '../../api/api';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import TextInput from '../TextInput/TextInput';
import type { Section } from '../../models/Section.model';
import { useUserLocation } from '../../context/UserLocation';

const drawerWidth = 200;
const miniDrawerWidth = 40;

const StyledDrawer = styled(MuiDrawer)(() => ({
  transition: 'width 0.2s ease',
  '& .MuiDrawer-paper': {
    position: 'unset',
    width: "inherit",
    boxSizing: 'border-box',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: '#fafafa',
    overflow: 'hidden',
  },
}));

const Drawer = () => {
    const {updateSectionLocation} = useUserLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAddingSection, setIsAddingSection] = useState(false);
    const {data: sections} = api.Section.GetSections.useQuery()
    const {mutate: addSection} = api.Section.AddSection.useMutation()
    const {mutate: updateSection} = api.Section.UpdateSection.useMutation()
    const {mutate: deleteSection} = api.Section.DeleteSection.useMutation()
    
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAddSection = (name: string) => {
        addSection({ section_name: name } as Section)
        setIsAddingSection(false);
    };

    return (
        <StyledDrawer
            sx={{
                width: drawerOpen ? `${drawerWidth}px` : `${miniDrawerWidth}px`,
            }}
            variant="persistent"
            anchor="left"
            open={true}
        >
            <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                height: '100%',
                minWidth: drawerOpen ? drawerWidth : miniDrawerWidth
            }}>
                {/* Header with toggle button */}
                <Box sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "flex-end"
                }}>
                    <IconButton
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Box>

                {/* Sections List */}
                <Box sx={{ flex: 1 }}>
                    <List sx={{ pt: 1 }}>
                        {sections?.map((section) => (
                            <ListItemButton sx={{ 
                                minHeight: '48px',
                                px: drawerOpen ? 2 : 1,
                                justifyContent: drawerOpen ? 'flex-start' : 'center'
                            }}
                            onClick={() => updateSectionLocation(section.id)}
                            >
                                {!drawerOpen && (
                                    <ListItemIcon sx={{ minWidth: 'auto' }}>
                                        <Box sx={{ 
                                            width: '8px', 
                                            height: '8px', 
                                            borderRadius: '50%', 
                                            bgcolor: 'primary.main' 
                                        }} />
                                    </ListItemIcon>
                                )}
                                {drawerOpen && <ListItemText primary={section.section_name} />}
                            </ListItemButton>
                        ))}
                        
                        {/* Add Section Input */}
                        {isAddingSection && drawerOpen && (
                            <ListItem disablePadding>
                                <Box sx={{ p: 1, width: '100%' }}>
                                    <TextInput 
                                        placeholder='Section name' 
                                        handleSave={handleAddSection} 
                                        sx={{
                                            height: "30px",
                                            padding: "4px"
                                        }} 
                                        handleCancel={function (): void {
                                            throw new Error('Function not implemented.');
                                        } } 
                                    />
                                </Box>
                            </ListItem>
                        )}
                    </List>
                </Box>

                {/* Footer with Add Button */}
                <Box sx={{ 
                    display: 'flex',
                    justifyContent: drawerOpen ? 'stretch' : 'center'
                }}>
                    {drawerOpen ? (
                        <Button 
                            onClick={() => setIsAddingSection(true)}
                            startIcon={<AddIcon />}
                            fullWidth
                            variant="outlined"
                            sx={{ m: 0.5, p: 0.5 }}
                        >
                            Add Section
                        </Button>
                    ) : (
                        <IconButton
                            onClick={() => setIsAddingSection(true)}
                            sx={{ 
                                width: '100%',
                                display: 'flex',
                                justifyContent: 'center'
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    )}
                </Box>
            </Box>
        </StyledDrawer>
    );
};

export default Drawer; 