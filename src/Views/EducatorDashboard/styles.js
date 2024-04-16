import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const MainBox = styled(Box)(({ theme }) => ({
    width: "100%",
    minHeight: "100vh",
    height: "auto"
}));
export const RightBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    width: "80%",
    paddingBottom: "20px",
    [theme.breakpoints.down('sm')]: {
        justifyContent: "center",
        alignItems: "center"
    },
    [theme.breakpoints.down('md')]: {
        width: "100%",
    },
}));
export const LeftBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    minheight: "auto",
    gap: "14px",
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
    borderLeft: "3px solid grey",
    marginTop: "100px",
    [theme.breakpoints.down('md')]: {
        marginTop: '0',
        display: 'flex',
        flexDirection: 'row',
        border: '0px',
        paddingLeft: 0,
        flexWrap: "wrap",
    },
}));
export const CoursesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: 20,
    flexWrap: 'wrap',
    [theme.breakpoints.down('md')]: {
        justifyContent: 'center'
    }
}));
export const CourseCard = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "30px",
    border: "2px solid grey",
    minWidth: "200px",
    height: "160px",
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        width: "100%",
    }
}));
export const ClassCard = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: "30px",
    border: "2px solid grey",
    minWidth: "200px",
    width: '330px',
    minHeight: "160px",
    height: 'auto',
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
        width: "100%",
    }
}));