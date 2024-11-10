import { AsyncImage } from "loadable-image";

// const buttons = [{ label: "Desktop" }, { label: "Mobile" }];

type HeroProps = {
  placeHolderImage: string;
};

const Hero = ({ placeHolderImage }: HeroProps) => {
  return (
    <div className="w-full mt-28 py-2 px-4 flex items-center">
      <section className="w-1/2 h-[30rem] flex flex-col justify-between">
        <div className="flex flex-col gap-4 pt-16">
          <h1 className="text-7xl">
            Turn your
            <br />
            screen into a<br />
            masterpiece
          </h1>

          <h2 className="text-3xl">
            Curated collection of stunning
            <br />
            wallpapers for every device and taste
          </h2>
        </div>

        {/* HERO BUTTONS */}
        {/* <div className="flex items-center justify-between">
          {buttons.map((btn, i) => (
            <div key={i} className="flex items-center w-1/2">
              <button className="h-10 w-3/5 bg-btn-primary py-2 border-2 border-black">
                <p className="font-medium">{btn.label}</p>
              </button>
              <button className="h-10 w-10 bg-black"></button>
            </div>
          ))}
        </div> */}
      </section>

      <section className="w-1/2">
        <div className="flex justify-center items-center">
          <AsyncImage
            src={placeHolderImage}
            style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }}
            loader={<div style={{ background: "#000000" }} />}
            error={<div style={{ background: "#000000" }}/>}
          />
          {/* <img src={placeHolderImage} loading="lazy" /> */}
        </div>
      </section>
    </div>
  );
};

export default Hero;
