import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  /** Must include positioning + dimensions, e.g. "relative h-16 w-16" */
  className: string;
  sizes?: string;
};

/** Brand icons / PNGs from `public/brand/` — unoptimized for crisp edges */
export function BrandRaster({ src, alt, className, sizes = "128px" }: Props) {
  return (
    <div className={className}>
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes={sizes}
        unoptimized
      />
    </div>
  );
}
