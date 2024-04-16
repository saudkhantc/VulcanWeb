import React, { useState, useRef, useEffect } from "react";
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
} from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import EditIcon from "@mui/icons-material/Edit";
import CourseVector from '../../../Assets/Images/courseVector.png'
import CheckIcon from "@mui/icons-material/Check";


function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: "%",
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight
        ),
        mediaWidth,
        mediaHeight
    );
}

export function ImageCropComponent({ setCroppedImage, courseImageUrl, formik, croppedImage }) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const [imgSrc, setImgSrc] = useState("");
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const [crop, setCrop] = useState();
    const [completedCrop, setCompletedCrop] = useState();
    const aspect = 16 / 9

    const handleClose = () => {
        const base64String = previewCanvasRef.current?.toDataURL().split(',')[1];
        setCroppedImage(base64String);
        setOpen(false)
    };
    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined);
            const reader = new FileReader();
            reader.addEventListener("load", () =>
                setImgSrc(reader.result?.toString() || "")
            );
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget;
            setCrop(centerAspectCrop(width, height, aspect));
        }
    }
    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                const base64String = previewCanvasRef.current.toDataURL().split(',')[1];
                setCroppedImage(base64String);
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                );
            }
        },
        100,
        [completedCrop]
    );
    useEffect(() => {
        if (croppedImage) {
            formik.setFieldValue('courseImage', croppedImage);
        }
        // eslint-disable-next-line
    }, [croppedImage]);
    return (
        <>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    height: imgSrc ? 'auto' : 275,
                    width: 430,
                    bgcolor: 'background.paper',
                    border: '1px solid #000',
                    boxShadow: 24,
                    borderRadius: 5,
                    p: 4,
                }}>
                    <Box sx={{ pb: 4 }}>
                        <input type="file" accept="image/*" onChange={onSelectFile} />
                    </Box>
                    {!!imgSrc && (
                        <ReactCrop
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={imgSrc}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    )}
                    <Box
                        sx={{
                            background: (theme) => theme.palette.primary.main,
                            borderRadius: "50%",
                            position: "absolute",
                            bottom: "10px",
                            right: "10px",
                            padding: "3px",
                        }}
                        onClick={handleClose}
                    >
                        <CheckIcon style={{ color: "#FFFFFF" }} />
                    </Box>
                </Box>
            </Modal>
            <Box>
                <Box position="relative" height={200} width={{ xl: 375, sm: 390, md: 400, lg: 430 }}>
                    <Box
                        onClick={handleOpen}
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                            color: "blue",
                            bgcolor: "white",
                            borderRadius: "50%",
                            border: "1px solid grey",
                            cursor: "pointer"
                        }}
                        p={0.5}
                    >
                        <EditIcon fontSize="large" sx={{ color: (theme) => theme.palette.primary.main }} />
                    </Box>
                    {
                        completedCrop ? <>
                            {!!completedCrop && (
                                <Box>
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            border: "1px solid black",
                                            objectFit: "cover",
                                            width: "100%",
                                            height: 200,
                                        }}
                                    />
                                </Box>
                            )}
                        </> :
                            <Box height={200} width={{ xl: 375, sm: 390, md: 400, lg: 430 }} sx={{ backgroundColor: "grey" }}>
                                <img src={courseImageUrl || CourseVector} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                            </Box>
                    }
                </Box>
            </Box>
        </>
    );
}
