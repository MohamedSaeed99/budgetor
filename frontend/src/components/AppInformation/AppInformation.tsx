import { Box, styled, Typography } from "@mui/material"
import AnalyticsOutlinedIcon from '@mui/icons-material/AnalyticsOutlined';
import SavingsOutlinedIcon from '@mui/icons-material/SavingsOutlined';
import TrackChangesOutlinedIcon from '@mui/icons-material/TrackChangesOutlined';

const KeyPointContainer = styled(Box)({
    display: 'flex', 
    alignItems: 'center', 
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: 280
})

const AppInformation = () => {
    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            maxWidth: 400,
            gap: 2, 
        }}>
              <Typography 
                variant="h3" 
                component="h1" 
                sx={{ 
                  fontWeight: 700, 
                }}
              >
                Welcome to Budgetor
              </Typography>
              
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 0,
                  fontWeight: 400,
                }}
              >
                Your personal finance companion that helps you track spending, 
                visualize your budget, and make smarter financial decisions.
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                gap: 1
              }}>
                <KeyPointContainer sx={{p: 2, borderRadius: 2, gap: 1.5}}>
                    <AnalyticsOutlinedIcon />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Smart Spending Analytics
                    </Typography>
                </KeyPointContainer>
                
                <KeyPointContainer sx={{p: 2, borderRadius: 2, gap: 1.5}}>
                    <SavingsOutlinedIcon />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Budget Planning & Tracking
                    </Typography>
                </KeyPointContainer>
                
                <KeyPointContainer sx={{p: 2, borderRadius: 2, gap: 1.5}}>
                    <TrackChangesOutlinedIcon />
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        Financial Goal Setting
                    </Typography>
                </KeyPointContainer>
              </Box>
            </Box>
          
    )
}

export default AppInformation;