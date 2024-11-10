import { appendAutoCompressionParamToImgUrl } from "../utils/helpers";

type DrawerProps = {
  isOpen: boolean;
  selectedItems: string[];
  handleRemoveImage: (url: string) => void;
  handleDownloadImages: () => void;
  handleDrawerToggle: () => void;
};

const Drawer = ({
  selectedItems,
  handleRemoveImage,
  handleDownloadImages,
  handleDrawerToggle,
  isOpen = false,
}: DrawerProps) => {
  return (
    <>
      <div
        className={`fixed right-0 min-h-dvh ${
          isOpen ? "w-full" : "w-0"
        } bg-[rgba(0,0,0,0.3)]`}
        onClick={handleDrawerToggle}
      ></div>
      <div
        className={`fixed right-0 min-h-dvh ${
          isOpen ? "w-80" : "w-0"
        } bg-primary border-l-2 border-black transition-all duration-200 overflow-hidden py-20`}
      >
        {isOpen && selectedItems && selectedItems.length > 0 && (
          <div className="relative flex flex-col justify-center gap-4 px-4">
            <ul className="h-[80dvh] overflow-y-auto flex flex-col gap-6 transition-all">
              {selectedItems.map((url, index) => (
                <li key={index} className="border-2 border-black relative">
                  <button
                    className="absolute right-0 top-0 bg-red-400 p-2"
                    onClick={() => handleRemoveImage(url)}
                  >
                    <img
                      src="/delete.svg"
                      alt="delete icon"
                      className="w-6 h-6"
                    />
                  </button>
                  <img
                    src={appendAutoCompressionParamToImgUrl(url)}
                    alt=""
                    className="w-full object-cover outline outline-2 outline-black"
                  />
                </li>
              ))}
            </ul>
            <button
              className="bg-btn-primary py-2 px-4 border-2 border-black"
              onClick={handleDownloadImages}
            >
              Download All ({selectedItems.length})
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Drawer;
