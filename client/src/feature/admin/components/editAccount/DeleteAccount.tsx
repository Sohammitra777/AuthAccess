import assets from "../../../../assets/assets";
import { useAccountDelete } from "../../admin.mutations";

const DeleteAccount = ({ id }: { id: string }) => {
    const { mutate } = useAccountDelete();
    return (
        <img
            onClick={() => {
                mutate(id);
            }}
            className="h-6 w-6 duration-400 hover:h-8 hover:w-8"
            src={assets.admin.icon.deleteIcon}
            alt="delete Icon"
        />
    );
};

export default DeleteAccount;
