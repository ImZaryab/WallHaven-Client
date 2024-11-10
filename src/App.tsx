import "./App.css";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import GridContainer from "./components/GridContainer";
import { useEffect, useState } from "react";
import { routes } from "./routes";
import { nanoid } from "nanoid";
import Drawer from "./components/Drawer";
import { appendAutoCompressionParamToImgUrl } from "./utils/helpers";

type Image = {
  publicId: string;
  url: string;
  format: string;
  width: number;
  height: number;
  created: Date;
};

function App() {
  const [images, setImages] = useState<Image[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL + routes.wallpapers}`
      );
      const res = await response.json();
      setImages(res.data);
    };

    fetchData();
  }, []);

  const handleFullScreen = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.currentTarget.requestFullscreen();
  };

  const handleImageSelection = (url: string) => {
    if (!selectedImages.includes(url)) {
      setSelectedImages([...selectedImages, url]);
    } else {
      setSelectedImages(selectedImages.filter((img) => img !== url));
    }
  };

  const handleRemoveImage = (url: string) => {
    setSelectedImages(selectedImages.filter((img) => img !== url));
  };

  const handleDownloadImages = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL + routes.downloadSelection}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ images: selectedImages }),
        }
      );

      if (!response.ok) {
        throw new Error("Download failed");
      }

      // Create a blob from the zip file response
      const blob = await response.blob();

      // Create a download link and trigger it
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `wallhaven-${nanoid(8)}.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading images:", error);
      throw error;
    }
  };

  const handleDrawerToggle = () => {
    setIsOpen((s) => !s);
  };

  return (
    <main className="pb-4 min-h-dvh font-epilogue flex flex-col gap-14 overflow-x-hidden overflow-y-auto">
      <Navbar
        navlinks={["Home"]}
        selectedImagesCount={selectedImages.length}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Hero placeHolderImage={images[2]?.url || ""} />
      <section className="h-32 py-2 flex flex-col justify-center items-center gap-2 bg-black">
        <h1 className="text-white text-4xl">Featured Wallpapers</h1>
      </section>

      <GridContainer>
        {images &&
          images.length > 0 &&
          images.map((img, index) => (
            <div
              key={index}
              className="relative max-h-96 overflow-hidden group border-2 border-black"
            >
              <img
                src={appendAutoCompressionParamToImgUrl(img.url)}
                alt=""
                className="w-full h-72 sm:h-96 object-cover group-hover:scale-105 transition-transform duration-500"
                onClick={handleFullScreen}
              />
              <div className="p-4 absolute bottom-0 w-full flex justify-end items-end gap-4">
                {/* <button className="py-5 px-4 h-4 bg-btn-primary flex justify-center items-center hover:scale-125 transition-all duration-300">
                  <img src="view.svg" alt="" className="h-5" />
                </button> */}
                <button
                  className={`py-5 px-4 h-4 ${
                    selectedImages.includes(img.url)
                      ? "bg-red-400"
                      : "bg-btn-primary"
                  } flex justify-center items-center hover:scale-125 transition-all duration-300`}
                  onClick={() => handleImageSelection(img.url)}
                >
                  <img
                    src={`${
                      selectedImages.includes(img.url)
                        ? "remove.svg"
                        : "add.svg"
                    }`}
                    alt=""
                    className="h-5"
                  />
                </button>
              </div>
            </div>
          ))}
      </GridContainer>
      <Drawer
        isOpen={isOpen}
        selectedItems={selectedImages}
        handleRemoveImage={handleRemoveImage}
        handleDownloadImages={handleDownloadImages}
        handleDrawerToggle={handleDrawerToggle}
      />
    </main>
  );
}

export default App;
