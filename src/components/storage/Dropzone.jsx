import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Icon } from "semantic-ui-react";
import { DropzoneDialog } from "../utils/StyledComponents";
import path from "path";
import fs from "browserify-fs";

export default function MyDropzone() {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");

      reader.onerror = () => console.log("file reading has failed");

      reader.onload = () => {

        const deliveryFolder = path.join(__dirname, "deliveryFolder")
        const selectedFile = reader.result;
        fs.writeFile(path.resolve(deliveryFolder, "text.txt"), selectedFile, err => console.log(err));

        const data = fs.readFile(path.join(deliveryFolder, "text.txt"))

        console.log(data)

      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div
      style={{
        position: "relative",
        width: "250px",
        height: "200px",
        backgroundColor: "#f0f0f0",
        margin: "0 auto",
        border: "1px solid #e3e3e3",
        borderRadius: "5px",
      }}
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <DropzoneDialog>Drop the files here ...</DropzoneDialog>
      ) : (
        <>
          <Icon
            style={{ marginTop: "80px", size: "huge" }}
            name="cloud download"
          />
          <DropzoneDialog>
            Drag 'n' drop some files here, or click to select files
          </DropzoneDialog>
        </>
      )}
    </div>
  );
}
