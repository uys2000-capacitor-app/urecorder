import {
  AdMob,
  BannerAdPluginEvents,
  BannerAdPosition,
  BannerAdSize,
  InterstitialAdPluginEvents,
  type AdOptions,
  type BannerAdOptions,
} from "@capacitor-community/admob";

export async function initializeAdMob(): Promise<void> {
  return await AdMob.initialize({});
}

export async function showAdMobBanner(callback: () => void): Promise<void> {
  AdMob.addListener(BannerAdPluginEvents.Loaded, callback);
  const options: BannerAdOptions = {
    adId: "ca-app-pub-6530204715466484/2255276676",
    adSize: BannerAdSize.BANNER,
    position: BannerAdPosition.BOTTOM_CENTER,
    margin: 0,
  };
  AdMob.showBanner(options);
}
