import { StepsHeader } from '../../Common/StepsHeader/stepsHeader'
import {
    Details,
    CharacterCount,
    CountText,
    ErrorBlockSmall,
} from '../styles'
import { ShowErrorToast } from '../../Common/Toast/toast'
import { Box, TextField } from "@mui/material";
import "react-quill/dist/quill.snow.css";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import { useFormik } from "formik";
import { httpsCallable } from "firebase/functions";
import * as Yup from "yup";
import { functions } from '../../../Infrastructure/config';
import { Loader } from '../../Common/loader';
import { incrementCoursesSteps, decrementCoursesSteps, resetCoursesSteps } from '../../../Infrastructure/States/coursesStepsSlice';
import { StepsFooter } from '../../Common/StepsFooter/stepsFooter';
import '../styles'
import { ImageCropComponent } from '../../Common/ImageCropComponent/ImageCropComponent';
import { cleanCourseState } from '../../../Infrastructure/States/courseDetailsSlice';
import { setCourseDetails } from '../../../Infrastructure/States/courseDetailsSlice';

export const CourseDetails = () => {
    const minCharacters = 200;
    const maxCharacters = 10000;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loaderValue, setLoaderValue] = useState(false);
    const userData = useSelector((state) => state.userData.data)
    const loading = useSelector((state) => state.userData.loading);
    const course = useSelector((state) => state.course.courseDetails)
    const courseDetails = course?.course?.courseDetails?.details
    const courseId = course?.courseId || null
    const courseImageUrl = courseDetails?.course_image;
    const description = courseDetails?.description
    const promoLink = courseDetails?.promo_link;
    const [croppedImage, setCroppedImage] = useState("");
    const [characterCount, setCharacterCount] = useState(0);
    const [htmlData, setHtmlData] = useState(description || "");
    // eslint-disable-next-line no-unused-vars
    const [plainText, setPlainText] = useState("");
    // eslint-disable-next-line no-unused-vars
    const [displayMessage, setDisplayMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const courseSteps = useSelector((state) => state.courseSteps.courseSteps)
    // Define the isUrlValid function
    function isUrlValid(userInput) {
        if (userInput) {
            const res = userInput.match(
                /(https?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)/g
            );
            return res !== null;
        }
        return true;
    }
    function ensureHttpsProtocol(url) {
        if (url && !url.startsWith("https://")) {
            return "https://" + url;
        }
        return url;
    }
    const formik = useFormik({
        initialValues: {
            description: "",
            courseImage: courseImageUrl ? '' : croppedImage,
            promoLink: ensureHttpsProtocol(promoLink) || "",
            courseId: courseId || ''
        },
        validationSchema: Yup.object().shape({
            promoLink: Yup.string().test("promoLink", "Invalid promoLink URL", (value) =>
                isUrlValid(value)
            ),
        }),
        onSubmit: async (values) => {
            setErrorMessage('')
            let newDisplayMessage = "";
            if (!courseImageUrl && (!values.courseImage && !croppedImage)) {
                newDisplayMessage = "Must upload profile picture";
                setErrorMessage(newDisplayMessage);
            } 
            else if (
                characterCount < minCharacters ||
                characterCount > maxCharacters
            ) {
                newDisplayMessage = `Course details must be ${minCharacters}-${maxCharacters} characters`;
                setErrorMessage(newDisplayMessage);
            }
            else {
                newDisplayMessage = "";
                if (newDisplayMessage) {
                    setLoaderValue(false);
                    return;
                }
                try {
                    setLoaderValue(true);
                    const updateCourseDetailsStep = httpsCallable(
                        functions,
                        "updatecoursedetailsstep"
                    );
                    await updateCourseDetailsStep(values);
                    dispatch(incrementCoursesSteps());
                } catch (error) {
                    ShowErrorToast(error);
                } finally {
                    setLoaderValue(false);
                }
            }
        },
    });
    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ size: [] }],
            [{ font: [] }],
            [{ align: ["right", "center", "justify"] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            [{ color: ["red", "#785412"] }],
            [{ background: ["red", "#785412"] }],
        ],
    };
    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "link",
        "color",
        "image",
        "background",
        "align",
        "size",
        "font",
    ];
    const handleDec = async () => {
        try {
            setLoaderValue(true);
            const updateCourseDetailsStep = httpsCallable(
                functions,
                "updatecoursedetailsstep"
            );
            await updateCourseDetailsStep(formik.values);
            const course = userData?.educator?.courses[courseId ? courseId : ''];
            if (course) {
                dispatch(setCourseDetails({ course, courseId }));
            }
            dispatch(decrementCoursesSteps());
        } catch (error) {
            ShowErrorToast(error);
        }finally{
            setLoaderValue(false)
        }
    };
    const handleContinueClick = async () => {
        formik.handleSubmit()
    };
    function countCharactersWithoutTags(html) {
        const textWithoutTags = html.replace(/(<([^>]+)>)/gi, "");
        return textWithoutTags.length;
    }
    const handleCourseDetailsChange = (value) => {
        const currentCharacterCount = countCharactersWithoutTags(value);
        setCharacterCount(currentCharacterCount);
        formik.setFieldValue("description", value);
        setHtmlData(value);
        if (
            currentCharacterCount >= minCharacters &&
            currentCharacterCount <= maxCharacters
        ) {
            setDisplayMessage("");
        }
    };
    const handleExit = async () => {
        try {
            setLoaderValue(true)
            const updateCourseDetailsStep = httpsCallable(
                functions,
                "updatecoursedetailsstep"
            );
            await updateCourseDetailsStep(formik.values);
            dispatch(resetCoursesSteps());
            navigate("/dashboard");
        } catch (err) {
            // console.log(err)
        }finally{
            dispatch(cleanCourseState())
            setLoaderValue(false)
        }
    };
    useEffect(() => {
        setCharacterCount(formik.values.description.length);
    }, [formik.values.description]);
    useEffect(() => {
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlData;
        const text = tempDiv.textContent || tempDiv.innerText;
        setPlainText(text);
        setCharacterCount(text.length);
    }, [htmlData]);
    return (
        <>
            <StepsHeader steps={courseSteps} handleExit={handleExit} />
            <Box height={"100px"} />
            {loading || loaderValue ? (
                <Loader />
            ) : (
                <Box
                    component={"form"}
                    onSubmit={formik.handleSubmit}
                    height={"auto"}
                >
                    <Box height={"50px"}></Box>
                    <Grid
                        container
                        display={"flex"}
                        justifyContent={"flex-start"}
                        alignItems={"flex-start"}
                    >
                        <Grid
                            lg={7}
                            md={12}
                            sm={12}
                            xs={12}
                            px={{ lg: 5, md: 5, sm: 5, xs: 5 }}
                            mb={6}
                            display={{ lg: "flex" }}
                            flexDirection={"column"}
                            justifyContent={"flex-start"}
                            alignItems={"flex-start"}
                            order={{ lg: 1, md: 2, sm: 2, xs: 2 }}
                        >
                            <Box
                                display={"flex"}
                                flexDirection={"column"}
                                sx={{ width: "100%" }}
                                mt={5}
                            >
                                <Details color={"primary"}>
                                    Course description
                                </Details>
                                <ReactQuill
                                    theme="snow"
                                    modules={modules}
                                    formats={formats}
                                    value={htmlData}
                                    onChange={handleCourseDetailsChange}
                                    style={{
                                        marginTop: "20px",
                                    }}
                                />
                            </Box>
                            <Box width={"100%"}>
                                <CharacterCount>
                                    Character Count: <CountText>{characterCount}</CountText>
                                </CharacterCount>
                            </Box>
                        </Grid>
                        <Grid
                            pb={{ sm: 8, xs: 8 }}
                            lg={5}
                            md={12}
                            sm={12}
                            xs={12}
                            height="100%"
                            display={"flex"}
                            flexDirection={"column"}
                            justifyContent={"start"}
                            alignItems={"center"}
                            order={{ lg: 2, md: 1, sm: 1, xs: 1 }}
                        >
                            <Box maxWidth={{ md: "70%", lg: "100%", xlg: "100%" }} display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} >
                                <ImageCropComponent setCroppedImage={setCroppedImage} courseImageUrl={courseImageUrl} formik={formik} croppedImage={croppedImage} />
                                <TextField
                                    name="promoLink"
                                    sx={{ mt: "30px" }}
                                    variant="standard"
                                    {...formik.getFieldProps("promoLink")}
                                    InputLabelProps={{
                                        style: { fontSize: 16 },
                                    }}
                                    InputProps={{
                                        style: { fontSize: 18 },
                                    }}
                                    placeholder="www.promoLink.com"
                                    label={
                                        formik.errors.promoLink
                                            ? `${formik.errors.promoLink}`
                                            : "Promotional Video Link"
                                    }
                                    error={
                                        formik.touched.promoLink && Boolean(formik.errors.promoLink)
                                    }
                                    fullWidth
                                />
                            </Box>
                        </Grid>
                    </Grid>
                    <ErrorBlockSmall sx={{ textAlign: "center" }}>
                        {errorMessage}
                    </ErrorBlockSmall>
                </Box>
            )
            }
            <Box height={"100px"} />
            <StepsFooter handleDec={handleDec} handleContinueClick={handleContinueClick} errorMessage={errorMessage} />
        </>
    );
};
