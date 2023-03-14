import { Platform } from "../../shared/Platform";
import { Task } from "../../shared/Task";

const getPlatformByUserAgent = (): Platform => {
	console.log("mobile:", navigator.userAgent.includes("Mobile"));
	if (navigator.userAgent.includes("Mobile")) return Platform.mobile;
	return Platform.desktop;
};

export const getPlatform = (): Platform => {
	// get platform by screen width
	if (window.innerWidth < 768) return Platform.mobile;
	else return getPlatformByUserAgent();

	// get platform by user agent
	// if (navigator.userAgent.includes("Mobile")) return Platform.mobile;
	// return Platform.desktop;
};

export const getOtherPlatform = (): Platform => {
	if (getPlatform() === Platform.desktop) return Platform.mobile;
	return Platform.desktop;
};

export const doShowTask = (task: Task): boolean => {
	if (task === undefined) return false;
	return getPlatform() === task.platform;
};

export const getPairingCodeFromUrl = (): string | null => {
	const urlParams = new URLSearchParams(window.location.search);
	return urlParams.get("pairingCode");
};

export const generatePairingUrl = (pairingCode: string): string => {
	return `${window.location.origin}/?pairingCode=${pairingCode}`;
};
