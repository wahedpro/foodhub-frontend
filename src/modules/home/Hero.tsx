import Link from "next/link";

const Hero = () => {
  return (
    <section className="">
      <div className="mx-auto w-[90%] py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div>
          <h1 className="text-2xl md:text-4xl md:text-left text-center font-bold text-gray-900 leading-tight">
            Discover & Order <br /> Delicious Meals Near You
          </h1>

          <p className="mt-5 text-gray-600 text-lg md:text-left text-center">
            Fresh food from trusted providers, delivered to your doorstep —
            fast & easy.
          </p>

          <div className="mt-8 flex gap-4 justify-center md:justify-start">
            <Link
              href="/meals"
              className="rounded bg-[#e10101] px-6 py-3 text-white text-sm font-medium hover:bg-red-700"
            >
              Explore Meals
            </Link>

            <Link
              href="/register"
              className="rounded border border-[#e10101] px-6 py-3 text-[#e10101] text-sm font-medium hover:bg-red-50"
            >
              Become a Provider
            </Link>
          </div>
        </div>

        {/* Image */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836"
            alt="Delicious food"
            className="rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
