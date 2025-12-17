import { useEffect } from "react";
import { api } from "./shared/utils/api";

export function App() {
    useEffect(() => {
        api.get("/")
            .then((res) => console.log(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <h1>Frontend connected</h1>
            <p>We are ready for auth!</p>
        </div>
    );
}

export default App;
