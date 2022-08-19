import { useEffect } from "react";
import { useRef, useState } from "react";
import CarouselStyles from "./Carousel.module.css";
const Carousel = ({ carouselItems }) => {
  const refButtonL = useRef(null);
  const refButtonR = useRef(null);
  const refSlices = useRef(null);
  const [selectedSlide, setSelectedSlide] = useState(0);

  const handleButton = (ref) => {
    const offset = ref.current.dataset.carouselButton === "next" ? 1 : -1;
    const slides = refSlices.current;
    const activeSlide = slides.querySelector("[data-active]");
    let newIndex = [...slides.children].indexOf(activeSlide) + offset;
    if (newIndex < 0) newIndex = slides.children.length - 1;
    if (newIndex >= slides.children.length) newIndex = 0;
    slides.children[newIndex].dataset.active = true;
    delete activeSlide.dataset.active;
    setSelectedSlide(newIndex);
  };
  const handleInfoButtons = (pos) => {
    if (pos !== selectedSlide) {
      const activeSlide = refSlices.current.querySelector("[data-active]");
      refSlices.current.children[pos].dataset.active = true;
      delete activeSlide.dataset.active;
      setSelectedSlide(pos);
    }
  };

  return (
    <section className={CarouselStyles.container} aria-label="carousel-items">
      <div className={CarouselStyles.carousel} data-carousel>
        <button
          ref={refButtonL}
          className={`${CarouselStyles.carouselButton} ${CarouselStyles.prev}`}
          data-carousel-button="prev"
          onClick={() => handleButton(refButtonL)}
        >
          &#10092;
        </button>
        <button
          ref={refButtonR}
          className={`${CarouselStyles.carouselButton} ${CarouselStyles.next}`}
          data-carousel-button="next"
          onClick={() => handleButton(refButtonR)}
        >
          &#10093;
        </button>
        <ul ref={refSlices} data-slides>
          {carouselItems &&
            carouselItems.map((item, i) => {
              if (i === 0) {
                return (
                  <li key={i} className={CarouselStyles.slide} data-active>
                    <section>{item}</section>
                  </li>
                );
              } else {
                return (
                  <li key={i} className={CarouselStyles.slide}>
                    <section>{item}</section>
                  </li>
                );
              }
            })}
        </ul>
      </div>
      <div className={CarouselStyles.selectedSlider}>
        {selectedSlide+1}
      </div>
      <div className={CarouselStyles.infoButtons}>
        {carouselItems &&
          carouselItems.map((item, i) => (
            <button
              className={`${CarouselStyles.infoButton} ${
                i === selectedSlide ? CarouselStyles.infoButtonActive : ""
              }`}
              key={i}
              onClick={() => handleInfoButtons(i)}
            >
              &#9866;
            </button>
          ))}
      </div>
    </section>
  );
};

export default Carousel;
