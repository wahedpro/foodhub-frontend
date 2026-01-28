import Link from "next/link";

const meals = [
  {
    id: 1,
    name: "Cheese Burger",
    price: 299,
    category: "Burger",
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 2,
    name: "Pepperoni Pizza",
    price: 499,
    category: "Pizza",
    image:
      "https://images.unsplash.com/photo-1548365328-8b849e6e9c2a",
  },
  {
    id: 3,
    name: "Chicken Chow Mein",
    price: 349,
    category: "Chinese",
    image:
      "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    id: 4,
    name: "Deshi Kacchi",
    price: 699,
    category: "Deshi",
    image:
      "https://images.unsplash.com/photo-1604908554168-0c2b71f4c7c5",
  },
];

const categories = ["All", "Burger", "Pizza", "Chinese", "Deshi"];

export default function MealsPage() {
  return (
    <section className="bg-gray-50 min-h-screen py-14">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900">
            Browse Meals
          </h1>
          <p className="mt-2 text-gray-600">
            Explore delicious meals from various providers
          </p>
        </div>

        {/* Filters (UI only) */}
        <div className="mb-8 flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              className="rounded-full border px-4 py-1.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Meals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {meals.map((meal) => (
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
                <span className="text-xs text-gray-500">
                  {meal.category}
                </span>

                <h3 className="mt-1 font-semibold text-gray-800">
                  {meal.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <p className="font-medium text-indigo-600">
                    ৳ {meal.price}
                  </p>

                  <Link
                    href={`/meals/${meal.id}`}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (future use) */}
        {/* <p className="text-center text-gray-500 mt-10">
          No meals available
        </p> */}
      </div>
    </section>
  );
}
