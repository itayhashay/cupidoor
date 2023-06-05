import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { Box } from '@mui/material'

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadsForm = () => {
    const [files, setFiles] = useState<any>([]);

    const renderLabelIdle = (message: string, maxFiles: number) => `
        <div>
            <span class="filepond--label-action" >${message}</span>
            <br/>
            <strong>${`You can upload up to ${maxFiles} files`}</strong>
        </div>`;

    return (
        <Box maxHeight={"55vh"} overflow={"auto"} width={"70%"} margin={"auto"}>
            <FilePond
                files={files}
                allowReorder={true}
                allowMultiple={true}
                maxFiles={5}
                onupdatefiles={setFiles}
                labelIdle={renderLabelIdle("To upload photos, click here or drag the photo files", 5)}
                />
        </Box>
    )
}

export default UploadsForm;