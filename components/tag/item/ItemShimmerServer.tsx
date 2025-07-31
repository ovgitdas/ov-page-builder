import { memo } from "react";

export const ItemShimmer: React.FC = memo(() => {
  return (
    <div className="bg-slate-200/50 animate-pulse w-[100px] h-[100px] rounded-md"></div>
  );
});

export const ItemShimmerCarousel: React.FC<{ carouselContainerWidth: number }> =
  memo(({ carouselContainerWidth }) => {
    return (
      <div
        role="group"
        aria-roledescription="slide"
        data-slot="carousel-item"
        className="min-w-0 shrink-0 grow-0"
        style={{ flexBasis: `${(100 / carouselContainerWidth) * 100}%` }}
      >
        <ItemShimmer />
      </div>
    );
  });
