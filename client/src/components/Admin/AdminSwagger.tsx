import { useEffect } from "react";
import useAPI from "../../hooks/useAPI";

const AdminSwagger = ()=>{
    const {} = useAPI();
    return (
        <iframe src="http://193.106.55.149:3000/api-docs" title="swagger" width={"100%"} height={"100%"}>

        </iframe>
    );
}

export default AdminSwagger;