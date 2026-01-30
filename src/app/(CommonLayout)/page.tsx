import Categories from "@/src/modules/home/Categories";
import FeaturedMeals from "@/src/modules/home/FeaturedMeals";
import Hero from "@/src/modules/home/Hero";
import HowItWorks from "@/src/modules/home/HowItWorks";

export default function Home() {
  return (
    <div>
      <Hero/>
      <Categories/>
      <FeaturedMeals/>
      <HowItWorks/>
    </div>
  );
}
