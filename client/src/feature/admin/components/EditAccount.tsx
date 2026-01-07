import { useState } from "react";
import DeleteAccount from "./editAccount/DeleteAccount";
import UpdateEmail from "./editAccount/UpdateEmail";
import UpdateRole from "./editAccount/UpdateRole";
import { motion } from "framer-motion";
import assets from "../../../assets/assets";

const EditAccount = ({
    id,
    email,
    role,
}: {
    id: string;
    email: string;
    role: string;
}) => {
    const [edit, setEdit] = useState(false);
    return (
        <li className="m-4 mb-0 flex cursor-pointer flex-col gap-4 rounded-lg border-2 border-[#2A2A2A] bg-[#0F0F0F] p-4 text-[#E5E5E5] duration-75 ease-in-out hover:border-4">
            <div className="sm:text-md flex grow justify-between gap-2 font-bold opacity-90">
                <div className="flex gap-4">
                    {" "}
                    <p>{email}</p>
                    {role === "admin" && <p>Admin</p>}
                </div>
                <img
                    onClick={() => setEdit(!edit)}
                    className="h-5 w-5 duration-500 ease-in-out hover:h-7 hover:w-7"
                    src={assets.admin.icon.editIcon}
                    alt=""
                />
            </div>
            {edit && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="m-2 mb-0 flex flex-col items-center justify-evenly gap-4 rounded-lg bg-[#141414] p-4 lg:flex-row"
                >
                    <UpdateEmail id={id} />
                    <UpdateRole id={id} role={role} />
                    <DeleteAccount id={id} />
                </motion.div>
            )}
        </li>
    );
};

export default EditAccount;
