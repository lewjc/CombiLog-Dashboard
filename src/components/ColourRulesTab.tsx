import { Grid } from "@material-ui/core";
import React from "react";
import Config from "../config";
import { Settings } from "../types/Settings";
import ColourRuleModal from "./ColourRuleModal";
import InfoDialog from "./InfoDialog";
import ColourRuleCard from "./ColourRuleCard";

interface ColourRulesTabProps {
  config: Config;
  settings: Settings;
  reloadSettings: () => void;
}

const tabInfo = `Colour rules are text patterns that are used to change the colour of
log messages in the realtime log view and also the archive view. Rules
use Regular Expressions in the JavaScript format that are tested against each
line of text. They are tested based on their position in the list
below and the first match will be the rule the line applies.

You can test out your patterns against expected test using online regex testers like the tool below:
`;

export default function ColourRulesTab(props: ColourRulesTabProps) {
  return (
    <Grid container spacing={2}>
      <Grid item container direction="column" wrap={"nowrap"}>
        <Grid justify="space-between" item container xs={12}>
          <Grid item container xs={10}>
            <Grid item container direction="column">
              <Grid item xs={3}>
                <ColourRuleModal
                  aggregatorUrl={props.config.aggregatorApiUrl}
                  onClose={props.reloadSettings}
                />
              </Grid>
            </Grid>
            <Grid item container direction="row"></Grid>
          </Grid>
          <Grid item xs={2}>
            <InfoDialog title="Colour Rules Info" content={tabInfo} />
          </Grid>
        </Grid>
        <br />
        <Grid item container xs={12}>
          {props.settings.colourRules.length > 0
            ? props.settings.colourRules.map((colourRule) => (
                <ColourRuleCard
                  key={colourRule.name}
                  config={props.config}
                  rule={colourRule}
                  reloadSettings={props.reloadSettings}
                />
              ))
            : null}
        </Grid>
      </Grid>
    </Grid>
  );
}
