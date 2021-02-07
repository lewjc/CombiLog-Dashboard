import React from "react";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import TabPanel from "./TabPanel";
import { Settings } from "../types/Settings";
import ColourRulesTab from "./ColourRulesTab";
import Config from "../config";

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		tabPanel: {
			boxShadow:
				"0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)",
			height: "65vh",
			overflowX: "scroll",
		},
		tab: {
			textTransform: "none",
		},
	})
);

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

interface SettingsTabsProps {
	settings: Settings;
	config: Config;
	reloadSettings: () => void;
}

export default function SettingsTabs(props: SettingsTabsProps) {
	const classes = useStyles();
	const [currentTab, setSettingsTab] = React.useState(0);

	const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setSettingsTab(newValue);
	};

	return (
		<div>
			<AppBar position="static">
				<Tabs
					value={currentTab}
					onChange={handleTabChange}
					aria-label="settings tabs"
				>
					<Tab className={classes.tab} label="Colour Rules" {...a11yProps(0)} />
				</Tabs>
			</AppBar>
			<TabPanel className={classes.tabPanel} value={currentTab} index={0}>
				<ColourRulesTab
					config={props.config}
					settings={props.settings}
					reloadSettings={props.reloadSettings}
				/>
			</TabPanel>
			<TabPanel className={classes.tabPanel} value={currentTab} index={1}>
				Item Two
			</TabPanel>
			<TabPanel className={classes.tabPanel} value={currentTab} index={2}>
				Item Three
			</TabPanel>
		</div>
	);
}
