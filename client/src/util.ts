import { Platform } from "../../shared/Platform";
import { Task } from "../../shared/Task";

export const getPlatform = (): Platform => {
	if (window.innerWidth < 600) return Platform.mobile;
	return Platform.desktop;
};

export const getOtherPlatform = (): Platform => {
	if (getPlatform() === Platform.desktop) return Platform.mobile;
	return Platform.desktop;
};

export const doShowTask = (task: Task): boolean => {
	return getPlatform() === task.platform;
};
