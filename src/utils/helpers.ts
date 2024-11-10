export const appendAutoCompressionParamToImgUrl = (url: string) => {
  const splitIdentifier = "/upload/";
  const autoCompressionParam = "q_auto/";
  const parts = url.split(splitIdentifier);

  const newUrl = parts[0] + splitIdentifier + autoCompressionParam + parts[1];
  return newUrl;
};
