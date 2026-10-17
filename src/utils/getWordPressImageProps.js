const getWordPressImageProps = (post, sizes, displayWidth) => {
  const media = post?._embedded?.["wp:featuredmedia"]?.[0];
  if (!media?.source_url) {
    return null;
  }

  const imageSizes = Object.values(media.media_details?.sizes ?? {})
    .filter((size) => size.source_url && size.width)
    .sort((first, second) => first.width - second.width);

  const sourceSetEntries = imageSizes.map(
    (size) => `${size.source_url} ${size.width}w`
  );

  if (media.media_details?.width && media.source_url) {
    sourceSetEntries.push(
      `${media.source_url} ${media.media_details.width}w`
    );
  }

  const preferredImage =
    imageSizes.find((size) => size.width >= displayWidth) ??
    imageSizes.at(-1);

  return {
    src: preferredImage?.source_url ?? media.source_url,
    srcSet: sourceSetEntries.length > 0 ? sourceSetEntries.join(", ") : undefined,
    sizes,
  };
};

export default getWordPressImageProps;
