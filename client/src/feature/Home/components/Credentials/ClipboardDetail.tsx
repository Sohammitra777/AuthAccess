import { useState } from "react";
import homeAssets from "../../assets/assets";

function ClipboardDetail({ role, copy }: { role: string; copy: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="flex justify-between items-center gap-4 text-xl">
            <p>
                User {role}: {copy}
            </p>
            <div
                className="h-6 w-6 cursor-pointer"
                onClick={async () => {
                    await navigator.clipboard.writeText(copy);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                }}
            >
                {copied ? (
                    <img src={homeAssets.icon.copyDone} />
                ) : (
                    <img src={homeAssets.icon.clipboard} />
                )}
            </div>
        </div>
    );
}

export default ClipboardDetail;
