import Link from "next/link";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-indigo-50 to-white">
      <div className="mx-auto max-w-7xl px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Text Content */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Discover & Order <br /> Delicious Meals Near You
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Fresh food from trusted providers, delivered to your doorstep —
            fast & easy.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/meals"
              className="rounded bg-indigo-600 px-6 py-3 text-white text-sm font-medium hover:bg-indigo-700"
            >
              Explore Meals
            </Link>

            <Link
              href="/register"
              className="rounded border border-indigo-600 px-6 py-3 text-indigo-600 text-sm font-medium hover:bg-indigo-50"
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
