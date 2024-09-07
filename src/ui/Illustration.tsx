import React from 'react';

type IllustrationProps = {
  src: string;
  alt: string;
  bgColor: string;
  imgSize: string;
  containerImgClass: string;
};

export const Illustration: React.FC<IllustrationProps> = ({
  src,
  alt,
  bgColor,
  imgSize,
  containerImgClass,
}) => {
  return (
    <div
      className={`flex items-center justify-center rounded-full ${bgColor} ${containerImgClass}`}
    >
      <img
        src={src}
        alt={alt.toLowerCase()}
        width={imgSize}
        height={imgSize}
        className="invert"
      />
    </div>
  );
};
