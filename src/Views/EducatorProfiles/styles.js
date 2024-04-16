import { Box, styled } from "@mui/material";

export const BioData = styled('div')(({ theme }) => ({
    marginTop: theme.spacing(5),
    textAlign: "justify"
}))
export const SocialMediaContainer = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
}))
export const SocialMedia = styled('div')(({ theme }) => ({
    height: "50px",
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    border: "1px solid black",
    cursor: "pointer"
}))
export const LinkTag = styled('a')(({ theme }) => ({
    height: "50px",
    width: "100%",
    display: "flex",
    textDecoration: "none",
    alignItems: "center",
    justifyContent: "center",
    color: "black",
    cursor: "pointer"
}))
export const SocialMediaText = styled('h6')(({ theme }) => ({
    textAlign: "center",
    fontWeight: "bold",
    paddingLeft: theme.spacing(1),
    margin: theme.spacing(0)
}))
