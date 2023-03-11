import { Platform } from "../../shared/Platform";
import { Task } from "../../shared/Task";

export const getPlatform = (): Platform => {
	// get platform by screen width
	if (window.innerWidth < 768) return Platform.mobile;
	return Platform.desktop;

	// get platform by user agent
	// if (navigator.userAgent.includes("Mobile")) return Platform.mobile;
	// return Platform.desktop;
};

export const getOtherPlatform = (): Platform => {
	if (getPlatform() === Platform.desktop) return Platform.mobile;
	return Platform.desktop;
};

export const doShowTask = (task: Task): boolean => {
	return getPlatform() === task.platform;
};
