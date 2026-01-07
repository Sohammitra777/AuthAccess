import { useState } from "react";
import assets from "../../../../assets/assets";

function ClipboardDetail({ role, copy }: { role: string; copy: string }) {
    const [copied, setCopied] = useState(false);
    return (
        <div className="flex items-center justify-between sm:gap-6">
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
                    <img src={assets.home.icon.copyDone} />
                ) : (
                    <img src={assets.home.icon.clipboard} />
                )}
            </div>
        </div>
    );
}

export default ClipboardDetail;
