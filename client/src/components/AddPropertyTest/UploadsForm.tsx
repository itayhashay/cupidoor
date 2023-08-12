import { useEffect, useState } from 'react';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
import { Box, Button } from '@mui/material';
import { FilePondErrorDescription, FilePondFile } from 'filepond';
import { UploadedImage } from './types';
import { Apartment, ServerApartmentImages } from '../../types/apartment';
import { convertFilePondImagesToBase64 } from '../../utils/base64';
import useAPI from '../../hooks/useAPI';

registerPlugin(
  FilePondPluginImageExifOrientation,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode,
);

const UploadsForm = ({
  saveImages,
  uploadedImages,
  handleBack,
  handleSubmit,
}: {
  saveImages: (files: UploadedImage[]) => void;
  uploadedImages: UploadedImage[];
  handleBack: () => void;
  handleSubmit: () => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [newfiles, setNewFiles] = useState<File[]>([]);
  const [imagesWithBase64, setImagesWithBase64] = useState<UploadedImage[]>([]);
  const [removedImages, setRemovedImages] = useState<string[]>([]);
  const { getApartmentById } = useAPI();

  useEffect(() => {
    if (uploadedImages.length === imagesWithBase64.length) return;

    const onlyFiles: File[] = uploadedImages.map((uploadedImage) => uploadedImage.file);
    setFiles(onlyFiles);
    setImagesWithBase64(uploadedImages);
  }, []);

  const fetchApartmentImages = async (id: string): Promise<ServerApartmentImages[]> => {
    const apartment: Apartment = await getApartmentById(id);
    return apartment.images;
  };

  useEffect(() => {
    console.log('UPDATED');
    console.log(imagesWithBase64);
    saveImages(imagesWithBase64);
  }, [imagesWithBase64]);

  const handleImageUpload = (fileItems: FilePondFile[]) => {
    console.log(fileItems);
    if (fileItems.length === files.length) return;
    const uploadedFiles: File[] = fileItems.map((fileItem) => fileItem.file as File);
    setFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    setNewFiles((prevFiles) => [...prevFiles, ...uploadedFiles]);
    // const imagesBase64 = convertFilePondImagesToBase64(files);
    // setNewImagesBase64(imagesBase64);
  };

  const handleFileRemove = (error: FilePondErrorDescription | null, removedFile: FilePondFile) => {
    setFiles((prevFiles: File[]) => prevFiles.filter((file: File) => file !== removedFile.file));
    !isNewFile(removedFile.file as File) &&
      setRemovedImages((prevFiles) => [...prevFiles, removedFile.file.name]);
  };

  const isNewFile = (file: File) => {
    return newfiles.includes(file);
  };

  const handleProcessFile = (error: FilePondErrorDescription | null, file: FilePondFile) => {
    console.log('NEW FILE');
    const newFile: File = file.file as File;
    if (files.includes(newFile)) return;

    const filesBase64: string[] = convertFilePondImagesToBase64([file]);

    const newUploadedFile: UploadedImage = {
      file: newFile,
      base64: filesBase64[0],
    };
    setImagesWithBase64((prevFiles) => [...prevFiles, newUploadedFile]);
    setFiles((prevFiles) => [...prevFiles, newFile]);
    setNewFiles((prevFiles) => [...prevFiles, newFile]);
  };

  const renderLabelIdle = (message: string, maxFiles: number) => `
        <div>
            <span class="filepond--label-action" >${message}</span>
            <br/>
            <strong>${`You can upload up to ${maxFiles} files`}</strong>
        </div>`;

  return (
    <>
      <Box display={'flex'} width={'100%'}>
        <FilePond
          allowFileEncode={true}
          files={files}
          imagePreviewHeight={200}
          allowReorder={true}
          allowMultiple={true}
          maxFiles={5}
          onaddfile={handleProcessFile}
          onremovefile={handleFileRemove}
          labelIdle={renderLabelIdle('To upload photos, click here or drag the photo files', 5)}
        />
      </Box>

      <Box
        sx={{
          width: 'auto',
          position: 'absolute',
          bottom: 0,
          right: 0,
          margin: '0 1rem 1rem 0',
        }}
      >
        <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
          Back
        </Button>
        <Button variant='contained' onClick={handleSubmit} sx={{ mt: 1, mr: 1 }}>
          {'Finish'}
        </Button>
      </Box>
    </>
  );
};

export default UploadsForm;
