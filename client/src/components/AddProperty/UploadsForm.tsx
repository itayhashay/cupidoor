import { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Box } from '@mui/material'
import { FilePondFile } from "filepond";
import { ApartmentImages, NewApartment } from "./types";
import { DEFAULT_IMAGES } from "./constants";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode);

const UploadsForm = ({apartmentData, saveChangesOnNext} : {apartmentData: NewApartment,  saveChangesOnNext: (values: any) => void}) => {
    const [imagesState, setImagesState] = useState<ApartmentImages>(DEFAULT_IMAGES) 
    const imageStateRef = useRef(imagesState); // Create a mutable ref
    
    useEffect(() => {
         if(imagesState.images.length === apartmentData.images.length) return;
         setImagesState({ images: apartmentData.images });
    }, [apartmentData]);

    useEffect(() => {
        imageStateRef.current = (imagesState);
        // saveChangesOnNext(imagesState);
    }, [imagesState]);

    useEffect(() => {
        return () => {
          saveChangesOnNext(imageStateRef.current);
        };
      }, []);

    const handleImageUpload = (fileItems: FilePondFile[]) => {
        const files: any[] = fileItems.map(fileItem => fileItem);
        setImagesState({ images: files })
    }

    const renderLabelIdle = (message: string, maxFiles: number) => `
        <div>
            <span class="filepond--label-action" >${message}</span>
            <br/>
            <strong>${`You can upload up to ${maxFiles} files`}</strong>
        </div>`;

    return (
        <Box maxHeight={"55vh"} overflow={"auto"} width={"70%"} margin={"auto"}>
            <FilePond
                allowFileEncode={true}
                files={imagesState.images}
                allowReorder={true}
                allowMultiple={true}
                maxFiles={5}
                onupdatefiles={handleImageUpload}
                labelIdle={renderLabelIdle("To upload photos, click here or drag the photo files", 5)}
                />
        </Box>
    )
}

export default UploadsForm;