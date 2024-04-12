import Layout from "@/components/layout";
import Weather from "@/lib/weather/weather";
import TravelCardList from "@/pages/main/TravelCardList";
import main from "@/assets/image/main.png";

function MainPage() {
  return (
    <Layout>
      <div className="flex justify-between items-center p-4">
        <img src={main} alt="Sight" className="w-3/5 h-48" loading="lazy" />
        <Weather />
      </div>
      <TravelCardList />
    </Layout>
  );
}
export default MainPage;
