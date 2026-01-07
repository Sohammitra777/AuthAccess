import { useAccountDelete } from "../../admin.mutations";
import adminAssets from "../../assets/assets";

const DeleteAccount = ({ id }: { id: string }) => {
    const { mutate } = useAccountDelete();
    return (
        <img
            onClick={() => {
                mutate(id);
            }}
            className="h-6 w-6 duration-400 hover:h-8 hover:w-8"
            src={adminAssets.icon.deleteIcon}
            alt="delete Icon"
        />
    );
};

export default DeleteAccount;
