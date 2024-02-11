import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import Button from "@mui/material/Button";
import { MenuItem, Select, TextField, Typography } from "@mui/material";
import { MuiColorInput } from "mui-color-input";
import "./App.css";
import Footer from "./components/Footer";

export default function App() {
  const [url, setUrl] = useState<string>(
    "https://www.youtube.com/results?search_query=qr+code"
  );
  const [imageUrl, setImageUrl] = useState<string>("/placeholder.png");
  const [userDotsOptions, setDotsOptions] = useState<any>({
    color: "rgba(33, 33, 33)",
    type: "classy-rounded",
  });
  const [userCornerSquareOptions, setCornerSquareOptions] = useState<any>({
    color: "rgba(68, 68, 68)",
    type: "dot",
  });
  const [userCornerDotOptions, setCornerDotOptions] = useState<any>({
    color: "rgba(137, 137, 137)",
    type: "dot",
  });
  const [fileExt, setFileExt] = useState<string>("png");
  const [qrCodeRef, setQrCodeRef] = useState<QRCodeStyling | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const qrCode = new QRCodeStyling({
      width: 350,
      height: 350,
      image: imageUrl,
      dotsOptions: {
        color: userDotsOptions.color,
        type: userDotsOptions.type,
      },
      cornersSquareOptions: {
        color: userCornerSquareOptions.color,
        type: userCornerSquareOptions.type,
      },
      cornersDotOptions: {
        color: userCornerDotOptions.color,
        type: userCornerDotOptions.type,
      },
      imageOptions: {
        crossOrigin: "anonymous",
        margin: 20,
      },
    });

    setQrCodeRef(qrCode);

    if (ref.current && qrCode) {
      qrCode.append(ref.current);
      qrCode.update({ data: url });
    }

    return () => {
      // Cleanup logic if needed
    };
  }, [
    url,
    imageUrl,
    userDotsOptions,
    userCornerSquareOptions,
    userCornerDotOptions,
  ]);

  const onUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  const onImageUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setImageUrl(event.target.value);
  };

  const onDotsColorChange = (value: string) => {
    setDotsOptions({ ...userDotsOptions, color: value });
  };

  const onDotsTypeChange = (event: any) => {
    setDotsOptions({ ...userDotsOptions, type: event.target.value });
  };

  const onCornerSquareColorChange = (value: string) => {
    setCornerSquareOptions({
      ...userCornerSquareOptions,
      color: value,
    });
  };

  const onCornerSquareTypeChange = (event: any) => {
    const type = event.target.value;
    if (type === "square" || type === "extra-rounded" || type === "dot") {
      setCornerSquareOptions({ ...userCornerSquareOptions, type });
    }
  };

  const onCornerDotColorChange = (value: any) => {
    setCornerDotOptions({ ...userCornerDotOptions, color: value });
  };

  const onCornerDotTypeChange = (event: any) => {
    const type = event.target.value;
    if (type === "square" || type === "dot") {
      setCornerDotOptions({ ...userCornerDotOptions, type });
    }
  };

  const onExtensionChange = (event: any) => {
    setFileExt(event.target.value);
  };

  const onDownloadClick = () => {
    if (qrCodeRef) {
      qrCodeRef.download({
        extension: fileExt as any,
      });
    }
  };

  return (
    <div className="App flex">
      <div className="w-[60%] px-12 py-6 pb-0 h-screen overflow-auto flex flex-col gap-2">
        <Typography
          component={"h1"}
          fontSize={"2rem"}
          mb={"0.5rem"}
          align="center"
        >
          QR Code Generator
        </Typography>
        <Typography component={"h3"} fontSize={"1.5rem"} my={"0.75rem"}>
          Main Info
        </Typography>
        <TextField
          variant="filled"
          label="Website Url"
          value={url}
          onChange={onUrlChange}
          className="inputBox"
        />
        <TextField
          variant="filled"
          label="Icon"
          value={imageUrl}
          onChange={onImageUrlChange}
          placeholder="Image URL"
          className="inputBox"
        />
        <Typography component={"h3"} fontSize={"1.5rem"} my={"0.75rem"}>
          Dots Options
        </Typography>
        <MuiColorInput
          value={userDotsOptions.color}
          onChange={onDotsColorChange}
          className="inputBox"
        />
        <Select
          onChange={onDotsTypeChange}
          value={userDotsOptions.type}
          className="inputBox"
        >
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="rounded">Rounded</MenuItem>
          <MenuItem value="extra-rounded">Extra Rounded</MenuItem>
          <MenuItem value="dots">Dots</MenuItem>
          <MenuItem value="classy">Classy</MenuItem>
          <MenuItem value="classy-rounded">Classy Rounded</MenuItem>
        </Select>
        <Typography component={"h3"} fontSize={"1.5rem"} my={"0.75rem"}>
          Corner Options
        </Typography>
        <MuiColorInput
          value={userCornerSquareOptions.color}
          onChange={onCornerSquareColorChange}
          className="inputBox"
        />
        <Select
          onChange={onCornerSquareTypeChange}
          value={userCornerSquareOptions.type}
          className="inputBox"
        >
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="extra-rounded">Extra Rounded</MenuItem>
          <MenuItem value="dot">Dot</MenuItem>
        </Select>
        <Typography component={"h3"} fontSize={"1.5rem"} my={"0.75rem"}>
          Corner Dots Options
        </Typography>
        <MuiColorInput
          value={userCornerDotOptions.color}
          onChange={onCornerDotColorChange}
          className="inputBox"
        />
        <Select
          onChange={onCornerDotTypeChange}
          value={userCornerDotOptions.type}
          className="inputBox"
        >
          <MenuItem value="square">Square</MenuItem>
          <MenuItem value="dot">Dot</MenuItem>
        </Select>
        <Typography component={"h3"} fontSize={"1.5rem"} my={"0.75rem"}>
          Download
        </Typography>
        <div className="flex gap-6 w-full">
          <Select
            onChange={onExtensionChange}
            sx={{ width: "100%" }}
            value={fileExt}
          >
            <MenuItem value="png">PNG</MenuItem>
            <MenuItem value="jpeg">JPEG</MenuItem>
            <MenuItem value="webp">WEBP</MenuItem>
          </Select>
          <Button
            variant="contained"
            sx={{ padding: "0.5rem 2rem", background: "rgba(33, 33, 33)" }}
            disableElevation
            className="button"
            onClick={onDownloadClick}
          >
            Download
          </Button>
        </div>
        <br />
        <Footer />
      </div>
      <div className="flex items-center justify-center w-[40%] h-screen border-l-[1px] border-slate-300">
        <div ref={ref} />
      </div>
    </div>
  );
}
