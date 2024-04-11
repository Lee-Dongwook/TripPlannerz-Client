import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import sight from "@/assets/image/관광지.png";
import culture from "@/assets/image/문화시설.png";
import festival from "@/assets/image/축제.png";
import surfing from "@/assets/image/서핑.png";
import hotel from "@/assets/image/호텔.png";
import shopping from "@/assets/image/쇼핑.png";
import restaurant from "@/assets/image/레스토랑.png";

const images = [sight, culture, festival, surfing, hotel, shopping, restaurant];

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-1/2 h-1/3 max-w-screen-lg mx-auto">
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="">
            <img
              src={img}
              alt={`Slide ${idx}`}
              className="w-full object-cover rounded-lg shadow-lg"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ImageSlider;
