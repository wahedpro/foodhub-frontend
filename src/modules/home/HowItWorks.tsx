import { Search, ShoppingCart, Truck } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Browse Meals",
    description:
      "Explore meals from various providers and choose your favorites.",
    icon: <Search size={28} />,
  },
  {
    id: 2,
    title: "Place Order",
    description:
      "Add meals to your cart and place your order with cash on delivery.",
    icon: <ShoppingCart size={28} />,
  },
  {
    id: 3,
    title: "Fast Delivery",
    description:
      "Sit back and relax while your food is delivered to your doorstep.",
    icon: <Truck size={28} />,
  },
];

const HowItWorks = () => {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-semibold text-gray-900">
            How It Works
          </h2>
          <p className="mt-3 text-gray-600">
            Order your favorite meals in just 3 simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <div
              key={step.id}
              className="rounded-xl border p-8 text-center hover:shadow-md transition"
            >
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                {step.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-800">
                {step.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
