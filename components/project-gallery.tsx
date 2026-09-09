'use client';

import { useEffect, useState } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from '@/components/ui/carousel';
import type { ProjectImage } from '@/lib/projects';

export function ProjectGallery({
  images,
  name,
  portrait = false,
}: {
  images: ProjectImage[];
  name: string;
  portrait?: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!api) return;
    const update = () => setActive(api.selectedScrollSnap());
    update();
    api.on('select', update);
    return () => {
      api.off('select', update);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{ loop: false }}
      className={`detail-gallery ${portrait ? 'gallery-portrait' : ''}`}
      aria-label={`${name} interface gallery`}
      tabIndex={0}
    >
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem
            key={image.src}
            aria-label={`${index + 1} of ${images.length}`}
          >
            <figure>
              <div className="gallery-image">
                <img
                  src={image.src}
                  alt={image.alt}
                  loading="lazy"
                  width={portrait ? 1080 : 1600}
                  height={portrait ? 1350 : 1000}
                />
              </div>
              <figcaption>{image.caption}</figcaption>
            </figure>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="gallery-controls">
        <p aria-live="polite" aria-atomic="true">
          {String(active + 1).padStart(2, '0')}{' '}
          <span>/ {String(images.length).padStart(2, '0')}</span>
        </p>
        <div>
          <CarouselPrevious className="gallery-button" />
          <CarouselNext className="gallery-button" />
        </div>
      </div>
    </Carousel>
  );
}
