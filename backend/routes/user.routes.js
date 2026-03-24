import { Router} from "express";
import { acceptConnectionRequest, getAllUserProfiles, getMyConnectionRequest, login, register, sendConnectionRequest, whatAreMyConnections } from "../controllers/user.controller.js";
import multer from "multer";
import { uploadProfilePicture } from "../controllers/user.controller.js";
import {updateUserProfile} from "../controllers/user.controller.js";
import {getUserAndProfile} from "../controllers/user.controller.js";
import {updateProfileData} from "../controllers/user.controller.js";
import {downloadProfile}  from "../controllers/user.controller.js";
// import {getAllUserProfiles}  from "../controllers/user.controller.js";

const router = Router();

const storage = multer.diskStorage({
    destination : (req,file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
})


const upload = multer({storage: storage});

//updated user routes
router.route("/update_profile_picture")
  .post(upload.single("profile_picture"), uploadProfilePicture);

//login and register route

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/user_update").post(updateUserProfile);

router.route("/get_user_and_profile").get(getUserAndProfile);

router.route("/update_profile_data").post(updateProfileData);

router.route("/get_all_users").get(getAllUserProfiles);

router.route("/download_resume").get(downloadProfile);

router.route("/send_connection_request").get(sendConnectionRequest);

router.route("/getConnectionRequests").get(getMyConnectionRequest);

router.route("/user_connection_request").get(whatAreMyConnections);

router.route("/accept_connection_request").get(acceptConnectionRequest);






export default router;