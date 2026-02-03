import Link from "next/link";

const featuredMeals = [
  {
    id: 1,
    name: "Cheese Burger",
    price: 299,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 250,
    image:
      "https://images.deliveryhero.io/image/fd-bd/LH/rhs5-listing.jpg",
  },
  {
    id: 3,
    name: "Chicken Chow Mein",
    price: 349,
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    id: 4,
    name: "Biryani Rice",
    price: 350,
    image:
      "https://images.deliveryhero.io/image/fd-bd/LH/v0m6-listing.jpg",
  },
];

const FeaturedMeals = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto w-[90%]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-3xl font-semibold text-gray-900">
              Featured Meals
            </h2>
            <p className="mt-3 text-gray-600">
              Our most popular and loved dishes
            </p>
          </div>

          <Link
            href="/meals"
            className="mt-4 md:mt-0 text-sm font-medium text-indigo-600 hover:underline"
          >
            View All Meals →
          </Link>
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMeals.map((meal) => (
            <div
              key={meal.id}
              className="rounded-xl bg-white border hover:shadow-sm transition overflow-hidden"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="h-44 w-full object-cover"
              />

              <div className="p-4 flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">
                  {meal.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-indigo-600 font-medium">
                    ৳ {meal.price}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedMeals;
