import Slider from "@/ui/components/homepage/Slider"; 
import ShopComponent from "@/ui/components/homepage/ShopComponent"; 
import Categories from "@/ui/components/homepage/Categories";

export default function Home() {
  return (
    <div className="shell grow">
      <div className="core flex flex-col items-center">
        <Slider />
        <ShopComponent />
        <Categories />
      </div>
    </div>
  );
}
