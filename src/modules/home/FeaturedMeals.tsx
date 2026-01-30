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
    price: 499,
    image:
      "https://images.unsplash.com/photo-1548365328-8b849e6e9c2a",
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
    name: "Deshi Kacchi",
    price: 699,
    image:
      "https://images.unsplash.com/photo-1604908554168-0c2b71f4c7c5",
  },
];

const FeaturedMeals = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="mx-auto max-w-7xl px-4">
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
              className="rounded-xl bg-white border shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <img
                src={meal.image}
                alt={meal.name}
                className="h-44 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-gray-800">
                  {meal.name}
                </h3>

                <div className="mt-2 flex items-center justify-between">
                  <p className="text-indigo-600 font-medium">
                    ৳ {meal.price}
                  </p>

                  <Link
                    href={`/meals/${meal.id}`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View
                  </Link>
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
