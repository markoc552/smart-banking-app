import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Grid, Icon } from "semantic-ui-react";
import { DropzoneDialog } from "../utils/StyledComponents";
import CryptoJS from "crypto-js";

const Dropzone = (props) => {
  const secret = "secret123";

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");

      reader.onerror = () => console.log("file reading has failed");

      reader.onload = () => {
        const selectedFile = reader.result;

        let encrypted = CryptoJS.AES.encrypt(selectedFile, secret).toString();

        props.data.push(encrypted);

        console.log(props.data);

        console.log(
          CryptoJS.AES.decrypt(props.data[0], secret).toString(
            CryptoJS.enc.Utf8
          )
        );
      };
      reader.readAsText(file);
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
};

export default Dropzone;
