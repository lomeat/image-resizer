import React, { ChangeEvent } from "react";

export function App() {
  const [file, setFile] = React.useState<File>();

  const [width, setWidth] = React.useState<number>(0);
  const [height, setHeight] = React.useState<number>(0);

  const imgRef = React.useRef<HTMLImageElement | null>(null);
  function handleSizeChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: "width" | "height"
  ) {
    const value = +e.target.value;

    if (type === "width") {
      setWidth(value);
      setHeight((width) => Math.floor((height * value) / width));
    } else if (type === "height") {
      setHeight(value);
      setWidth((height) => Math.floor((width * value) / height));
    }
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0];

      setFile(image);

      if (imgRef.current) {
        imgRef.current.src = URL.createObjectURL(image);
        setWidth(imgRef.current?.width || 10);
      }
    }
  }

  function onImageLoad() {
    // setSize({
    //   width: imgRef.current?.width || 0,
    //   height: imgRef.current?.height || 0,
    // });
    setWidth(imgRef.current?.width || 10);
  }

  return (
    <div>
      <input
        disabled={!file}
        value={width}
        onChange={(e) => handleSizeChange(e, "width")}
      />
      <input
        disabled={!file}
        value={height}
        onChange={(e) => handleSizeChange(e, "height")}
      />
      <input type="file" onChange={handleFileChange} />
      {file && (
        <img
          ref={imgRef}
          src={file.name}
          alt="resize"
          width={width}
          height={height}
          onLoad={onImageLoad}
        />
      )}
    </div>
  );
}
