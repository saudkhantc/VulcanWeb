import { Modal, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import EditIcon from "@mui/icons-material/Edit";
import ProfileImage from "../../../../Assets/Images/vector.png";
import courseImageVector from "../../../../Assets/Images/courseVector.png";
import { AvatarBox } from "../../styles";
import CheckIcon from "@mui/icons-material/Check";
import { useDispatch, useSelector } from "react-redux";
import { CourseImage } from "../../../CourseCreationFlow/styles";
import { setAvatarValue } from "../../../../Infrastructure/States/courseDetailsSlice";

export const UploadAvatar = ({ onUpload, courseImage }) => {
  const dispatch = useDispatch()
  const [preview, setPreview] = useState(null);
  const [open, setOpen] = React.useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const userData = useSelector((state) => state.userData.data);
  const avatarRedux = useSelector((state) => state.course.avatar)
  const avatar = userData?.educator?.profile?.avatar
  const course_image = userData?.educator?.courses?.pending?.details?.course_image

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    if (preview) {
      onUpload(preview);
      dispatch(setAvatarValue(preview))
    }
    setOpen(false);
  };
  const onClose = () => {
    setPreview(null);
  };
  const onCrop = (view) => {
    setPreview(view);
  };
  useEffect(() => {
    if (preview) {
      setShowPreview(true);
    } else {
      setShowPreview(false);
    }
  }, [preview]);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ overflow: "hidden" }}
      >
        <AvatarBox
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Avatar
            alt="image not found"
            width={200}
            height={200}
            onCrop={onCrop}
            onClose={onClose}
            exportAsSquare={courseImage ? true : false}
          />
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
        </AvatarBox>
      </Modal>
      <Box display="flex" position={"relative"} flexDirection={"column"} justifyContent="center" alignItems="center" backgroundColor={courseImage ? "gray" : ""} borderRadius={courseImage ? "20%" : ""}>
        {
          courseImage ?
            <CourseImage sx={{ position: "absolute", top: 15, color: "white" }}>
              Course Image
            </CourseImage> : null}
        <Box sx={{ position: "relative", top: 0 }}>
          {
            !courseImage ?
              <img
                src={showPreview && preview ? preview : (avatarRedux || avatar || ProfileImage)}
                height={200}
                width={200}
                alt="Preview"
              />
              :
              <img
                src={showPreview && preview ? preview : (course_image || courseImageVector)}
                height={200}
                width={200}
                alt="Preview"
              />
          }
        </Box>
      </Box>
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
          cursor:'pointer'
        }}
        p={0.5}
      >
        <EditIcon fontSize="large" sx={{ color: (theme) => theme.palette.primary.main }} />
      </Box>
    </div>
  );
};
