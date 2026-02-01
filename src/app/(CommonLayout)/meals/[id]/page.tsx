// // import { getMealById } from "@/src/services/meal.service";
// // import { notFound } from "next/navigation";

// // const MealDetailsPage = async ({
// //   params,
// // }: {
// //   params: Promise<{ id: string }>;
// // }) => {
// //   const { id } = await params;
// //   const meal = await getMealById(id);
// //   if (!meal) {
// //     notFound();
// //   }

// //   return (
// //     <div className="max-w-4xl mx-auto p-6">
// //       <img
// //         src={meal.image}
// //         alt={meal.name}
// //         className="w-full h-64 object-cover rounded mb-4"
// //       />

// //       <h1 className="text-3xl font-bold">{meal.name}</h1>
// //       <p className="text-gray-600">{meal.description}</p>
// //       <p className="font-bold mt-2">৳ {meal.price}</p>
// //       <button className="px-3 py-2 bg-gray-300">Add to Cart</button>
// //     </div>
// //   );
// // };

// // export default MealDetailsPage;

// import { getMealById } from "@/src/services/meal.service";
// import { notFound } from "next/navigation";
// import AddToCartButton from "./AddToCartButton";

// const MealDetailsPage = async ({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) => {
//   const { id } = await params;

//   const meal = await getMealById(id);

//   if (!meal) {
//     notFound();
//   }

//   console.log(meal, "line 50")

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       <img
//         src={meal.image}
//         alt={meal.name}
//         className="w-full h-64 object-cover rounded mb-4"
//       />

//       <h1 className="text-3xl font-bold">{meal.name}</h1>
//       <p className="text-gray-600 mt-2">{meal.description}</p>
//       <p className="font-bold text-xl mt-3">৳ {meal.price}</p>

//       <AddToCartButton meal={meal} />
//     </div>
//   );
// };

// export default MealDetailsPage;

import { getMealById } from "@/src/services/meal.service";
import { notFound } from "next/navigation";
import AddToCartButton from "./AddToCartButton";
import StarRating from "@/src/components/customer/StarRating";

const MealDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const meal = await getMealById(id);

  if (!meal) {
    notFound();
  }

  const reviews = meal.reviews || [];
  const avgRating =
    reviews.length > 0
      ? (
          reviews.reduce(
            (sum: number, r: any) => sum + r.rating,
            0
          ) / reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Meal Info */}
      <div className="grid md:grid-cols-2 gap-8">
        <img
          src={meal.image}
          alt={meal.name}
          className="w-full h-80 object-cover rounded"
        />

        <div>
          <h1 className="text-3xl font-bold mb-2">
            {meal.name}
          </h1>

          {avgRating && (
            <div className="flex items-center gap-2 mb-2">
              <StarRating rating={Math.round(Number(avgRating))} />
              <span className="text-sm text-gray-500">
                ({avgRating} / 5)
              </span>
            </div>
          )}

          <p className="text-gray-600 mb-4">
            {meal.description}
          </p>

          <p className="text-2xl font-bold mb-4">
            ৳ {meal.price}
          </p>

          <AddToCartButton meal={meal} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">
          Customer Reviews
        </h2>

        {reviews.length === 0 && (
          <p className="text-gray-500">
            No reviews yet. Be the first to review!
          </p>
        )}

        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div
              key={review.id}
              className="border rounded p-4"
            >
              <StarRating rating={review.rating} />

              <p className="mt-2 text-gray-700">
                {review.comment}
              </p>

              <p className="text-sm text-gray-400 mt-1">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealDetailsPage;
