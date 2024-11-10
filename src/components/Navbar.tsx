interface NavbarProps {
  navlinks: string[];
  selectedImagesCount: number;
  handleDrawerToggle: () => void;
}

const Navbar = ({
  navlinks,
  selectedImagesCount,
  handleDrawerToggle,
}: NavbarProps) => {
  return (
    <div className="z-10 w-full fixed py-2 px-4 flex justify-between items-center bg-primary border-b-2 border-b-black">
      <section className="w-[20%] flex gap-2 items-center">
        {navlinks.map((link, index) => (
          <a key={index} href="#" className="text-xl font-medium">
            {link}
          </a>
        ))}
      </section>

      <section className="w-[60%] flex justify-center items-center">
        <h1 className="text-4xl font-medium">WallHaven</h1>
      </section>

      <section className="w-[20%] flex items-center justify-end gap-2">
        <button onClick={handleDrawerToggle} className="text-xl font-medium">
          Collection ({selectedImagesCount})
        </button>
      </section>
    </div>
  );
};

export default Navbar;
