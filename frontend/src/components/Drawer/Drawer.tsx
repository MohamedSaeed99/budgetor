import { Drawer as MuiDrawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Button, TextField, IconButton, Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import api from '../../api/api';
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 200;
const miniDrawerWidth = 40;

const StyledDrawer = styled(MuiDrawer)(() => ({
  transition: 'width 0.2s ease',
  '& .MuiDrawer-paper': {
    width: "inherit",
    boxSizing: 'border-box',
    borderRight: '1px solid rgba(0, 0, 0, 0.12)',
    backgroundColor: '#fafafa',
    top: '41px',
    height: 'calc(100% - 41px)',
    overflow: 'hidden',
  },
}));

const Drawer = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const {data: sections} = api.Section.GetSections.useQuery()
    const [addSection, setAddSection] = useState(false);
    const [sectionName, setSectionName] = useState('');
    
    const handleDrawerToggle = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleAddSection = () => {
        if (sectionName.trim()) {
            // TODO: Add section API call
            setSectionName('');
            setAddSection(false);
        }
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
                        {sections?.map((section, index) => (
                            <ListItem key={index} disablePadding>
                                <ListItemButton sx={{ 
                                    minHeight: '48px',
                                    px: drawerOpen ? 2 : 1,
                                    justifyContent: drawerOpen ? 'flex-start' : 'center'
                                }}>
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
                                    {drawerOpen && <ListItemText primary={section.name} />}
                                </ListItemButton>
                            </ListItem>
                        ))}
                        
                        {/* Add Section Input */}
                        {addSection && drawerOpen && (
                            <ListItem disablePadding>
                                <Box sx={{ p: 1, width: '100%' }}>
                                    <TextField 
                                        value={sectionName} 
                                        onChange={(e) => setSectionName(e.target.value)}
                                        placeholder="Section name"
                                        size="small"
                                        fullWidth
                                        onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
                                        autoFocus
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
                            onClick={() => setAddSection(true)}
                            startIcon={<AddIcon />}
                            fullWidth
                            variant="outlined"
                            sx={{ m: 0.5, p: 0.5 }}
                        >
                            Add Section
                        </Button>
                    ) : (
                        <IconButton
                            onClick={() => setAddSection(true)}
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