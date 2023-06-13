import { useEffect, useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import { Box } from '@mui/material'
import { FilePondFile } from "filepond";
import { ApartmentImages, NewApartment } from "./types";
import { DEFAULT_IMAGES } from "./constants";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

const UploadsForm = ({apartmentData, saveChangesOnNext} : {apartmentData: NewApartment,  saveChangesOnNext: (values: any) => void}) => {
    const [imagesState, setImagesState] = useState<ApartmentImages>(DEFAULT_IMAGES) 
    const imageStateRef = useRef(imagesState); // Create a mutable ref
    
    useEffect(() => {
        setImagesState((prev) => {
            if(imagesState.images.length === apartmentData.images.length) return prev;

            return apartmentData
        });
    }, [apartmentData]);

    useEffect(() => {
        imageStateRef.current = (imagesState);
        saveChangesOnNext(imagesState);
    }, [imagesState]);

    useEffect(() => {
        return () => {
          saveChangesOnNext(imageStateRef.current);
        };
      }, []);

    const handleImageUpload = (fileItems: FilePondFile[]) => {
        const files: any[] = fileItems.map(fileItem => fileItem.file);
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