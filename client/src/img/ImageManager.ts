// import all images from ./1 to ./10

import { getPlatform } from "../util";
import { Platform } from "../../../shared/Platform";

// glob all images in ./1 to ./10 named *d.png and *m.png

const DESKTOP_IMAGES: Array<string> = [];
const MOBILE_IMAGES: Array<string> = [];

export async function importImages() {
	const images = await import.meta.glob("./*/*.jpg");
	for (const path in images) {
		// @ts-ignore
		const image = (await images[path]()).default as string;
		const platform = path.includes("d") ? DESKTOP_IMAGES : MOBILE_IMAGES;
		platform.push(image);
	}
	console.log("imported images", DESKTOP_IMAGES, MOBILE_IMAGES);
}

interface ImageDownload {
	base64: string;
	platform: Platform;
}

export async function loadImages() {
	// load all unloaded images as blobs into local storage
	const jobs: Array<Promise<ImageDownload>> = [];
	[...DESKTOP_IMAGES, ...MOBILE_IMAGES].forEach((image) => {
		console.log("loading", image);
		const download = new Promise<ImageDownload>((resolve) => {
			fetch(image)
				.then((response) => response.blob())
				.then((blob) => {
					const imageName = image.split("/").pop()?.split("-")[0] ?? "",
						platform = imageName.includes("d")
							? Platform.desktop
							: Platform.mobile;
					const reader = new FileReader();
					reader.onload = () => {
						const base64 = reader.result as string;
						// console.log(base64);
						resolve({ base64, platform });
					};
					reader.readAsDataURL(blob);
				});
		});
		jobs.push(download);
	});
	const downloads = await Promise.all(jobs);

	downloads.forEach((download) => {
		if (download.platform === Platform.desktop)
			DESKTOP_IMAGES.push(download.base64);
		else MOBILE_IMAGES.push(download.base64);
	});
}

export const getRandomImage = (): string => {
	const platform = getPlatform();
	const images = platform === "desktop" ? DESKTOP_IMAGES : MOBILE_IMAGES;
	const randomIndex = Math.floor(Math.random() * images.length);
	const image = images[randomIndex];
	return image;
};
