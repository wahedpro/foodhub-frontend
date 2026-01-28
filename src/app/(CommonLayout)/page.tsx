import Categories from "@/src/components/modules/Home/Categories";
import FeaturedMeals from "@/src/components/modules/Home/FeaturedMeals";
import Hero from "@/src/components/modules/Home/Hero";
import HowItWorks from "@/src/components/modules/Home/HowItWorks";

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
