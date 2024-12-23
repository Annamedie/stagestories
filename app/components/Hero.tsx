import Image from "next/image";

function Hero() {
  return (
    <section className="flex border-2 border-cyan-600 my-10 bg-black">
      <div className="w-1/2 flex object-center object-cover">
        <Image
          src="/images/background.jpg"
          alt="Lively concert crowd and stage"
          width={650}
          height={400}
        />
      </div>
      <div className="w-1/2 flex flex-col justify-center p-8 font-inter">
        <h2 className="font-inter text-xl font-medium text-white p-2">
          Our Stage Stories
        </h2>{" "}
        <p className="text-white text-lg leading-relaxed">
          Studies show that concert memories fade faster than we realize. That's
          why <i className="font-medium">Stage Stories</i> is here — to help you
          capture the energy, unforgettable vibes, and magic of live music.
          Whether it's your first show or your 100th, preserve the moments that
          made it special and explore memories shared by fellow music lovers.
          Relive the thrill, connect with others, and keep the music alive long
          after the encore fades.
        </p>
      </div>
    </section>
  );
}

export default Hero;
