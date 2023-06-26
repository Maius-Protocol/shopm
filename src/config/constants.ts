const Constants = {
  APP_NAME: "Shopm",
  CDN_URL: "https://cdn.shopm/",
  IMAGE_SIZE: 3000,
};

export const ConvertS3UrlToCDN = (key: string) => {
  return Constants.CDN_URL + key;
};
