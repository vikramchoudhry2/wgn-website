import Image from 'next/image';

const ShopHero = () => (
  <section className="w-full h-[60vh] md:h-[80vh] flex flex-col md:flex-row">
    {/* Left: Image */}
    <div className="relative w-full md:w-1/2 h-1/2 md:h-full">
      <Image
        src="/assets/anamika.png"
        alt="Anamika"
        fill
        style={{ objectFit: 'cover' }}
        className="w-full h-full"
        priority
      />
    </div>
    {/* Right: Text */}
    <div className="flex flex-col justify-center items-center w-full md:w-1/2 h-1/2 md:h-full bg-black">
      <h1 className="text-white text-4xl md:text-6xl font-extrabold tracking-wider text-center mb-4" style={{ letterSpacing: '0.1em' }}>
        WE. GOT. NEXT
      </h1>
      <Image
        src="/assets/swoosh.png"
        alt="Swoosh"
        width={750}
        height={200}
        className="mx-auto"
        priority
      />
    </div>
  </section>
);

export default ShopHero; 