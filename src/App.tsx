import React, { ChangeEvent } from "react";
import Resizer from "react-image-file-resizer";

export function App() {
  const [image, setImage] = React.useState<string | null>(null);
  const [size, setSize] = React.useState({ width: 0, height: 0 });
  const [file, setFile] = React.useState<File>();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      try {
        const reader = new FileReader();
        const file = e.target.files[0];

        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target?.result as string;

          img.onload = () => {
            setSize({
              width:
                img.width > img.height ? 512 : (img.width * 512) / img.height,
              height:
                img.height > img.width ? 512 : (img.height * 512) / img.width,
            });
          };
        };

        setFile(file);
      } catch (err) {
        console.log(err);
      }
    }
  }

  React.useEffect(() => {
    async function resizeImage() {
      try {
        if (file) {
          Resizer.imageFileResizer(
            file,
            size.width,
            size.height,
            "PNG",
            100,
            0,
            (uri) => {
              setImage(uri as string);
              const a = document.createElement("a");
              a.href = uri as string;
              a.download = file?.name ?? "filename";
              a.click();
            },
            "base64"
          );
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (size.width && size.height) {
      resizeImage();
    }
  }, [size, file]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "100px auto",
        width: 512,
        gap: 16,
      }}
    >
      <h1>Telegram Sticker Auto-resizer to 512px by one side</h1>
      <input type="file" onChange={handleFileChange} />
      {image && (
        <img src={image} alt="resize" width={size.width} height={size.height} />
      )}
    </div>
  );
}
