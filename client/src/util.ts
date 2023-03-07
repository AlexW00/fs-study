import { Platform } from "../../shared/Platform";

export const getPlatform = (): Platform => {
	if (window.innerWidth < 600) return Platform.mobile;
	return Platform.desktop;
};
