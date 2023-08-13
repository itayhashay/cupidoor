import { useEffect } from "react";
import useAPI from "../../hooks/useAPI";

const AdminSwagger = ()=>{
    const {} = useAPI();
    return (
        <iframe src="http://localhost:2308/api-docs" width={"100%"} height={"100%"}>

        </iframe>
    );
}

export default AdminSwagger;