import { Box, keyframes, styled } from "@mui/material";

const bounce = keyframes`
  to {
    opacity: 0.1;
    transform: translateY(-16px);
  }
`

const LoaderContainer = styled(Box)({
    display: "flex",
    "> div": {
    width: "8px",
    height: "8px",
    margin: "1px 2px",
    borderRadius: "50%",
    backgroundColor: "#a3a1a1",
    opacity: 1,
    animation: `${bounce} 0.6s infinite alternate`,
    ":nth-child(2)": {
        animationDelay: "0.2s"
    },
    ":nth-child(3)": {
        animationDelay: "0.4s"
    }
    }
});

const Loader = () => {
    return (
        <LoaderContainer>
            <div></div>
            <div></div>
            <div></div>
        </LoaderContainer>
    )
}

export default Loader;