import { EmblaOptionsType } from "embla-carousel";
import Carousel, {
  Slider,
  SliderContainer,
  ThumsSlider,
} from "@/components/carsouel";
import Image from "next/image";
function ThumnailSlider({
  images,
  title = "product-image",
}: {
  images: string[];
  title?: string;
}) {
  const OPTIONS: EmblaOptionsType = {
    loop: true,
    align: "start",
  };
  if (images.length < 1) return <></>;
  return (
    <div className="bg-background w-full mx-auto" style={{ height: "400px" }}>
      {" "}
      {/* Fixed height */}
      <Carousel options={OPTIONS} className="relative" isAutoPlay={true}>
        <SliderContainer className="gap-2">
          {images.map((image, index) => (
            <Slider
              key={index}
              className="xl:h-[400px] sm:h-[350px] h-[300px] w-full"
              thumnailSrc={image}
            >
              <Image
                src={image}
                width={1400}
                height={800}
                alt="image"
                priority
                className="h-full lg:object-contain object-cover rounded-lg w-full"
              />
            </Slider>
          ))}
        </SliderContainer>
        <ThumsSlider />
      </Carousel>
    </div>
  );
}
export default ThumnailSlider;
