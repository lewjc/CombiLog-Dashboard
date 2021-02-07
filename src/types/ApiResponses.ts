import { Settings } from "./Settings";
import { Service } from "./Service";
import { ColourRule } from "react-combilazylog";

export type GetServicesResponse = {
	services: Service[];
	message: string;
};

export type GetSettingsResponse = {
	settings: Settings;
	message?: string;
};

export type GetColourRules = {
	colourRules: ColourRule[];
	message?: string;
};

export type DeleteColourRule = {
	message: string;
};
