import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Burger",
    image:"https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 2,
    name: "Pizza",
    image:"https://images.unsplash.com/photo-1550547660-d9450f859349",
  },
  {
    id: 3,
    name: "Chinese",
    image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
  {
    id: 4,
    name: "Deshi",
    image:"https://images.unsplash.com/photo-1540189549336-e6e99c3679fe",
  },
];

const Categories = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-900">
            Browse by Category
          </h2>
          <p className="mt-3 text-gray-600">
            Choose your favorite cuisine and explore delicious meals
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link
              href={`/meals?category=${category.name}`}
              key={category.id}
              className="group rounded-xl overflow-hidden border hover:shadow-md transition"
            >
              <div className="h-36 overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover group-hover:scale-110 transition"
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-gray-800">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
