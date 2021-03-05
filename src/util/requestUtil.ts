import { ColourRule } from "react-combilazylog";
import APIRoutes from "../constants/APIRoutes";
import { GetColourRules } from "../types/ApiResponses";

export function handleGenericNon200Code(response: Response) {
  switch (response.status) {
    case 404: {
      return "Not found";
    }
  }
}

export async function getColourRules(
  aggregatorApiUrl: string
): Promise<Array<ColourRule> | undefined> {
  const url = aggregatorApiUrl + APIRoutes.aggregator.GET_COLOUR_RULES;
  return fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return response.json().then((json) => {
          console.error("Error occured retrieving settings: " + json?.message);
          return null;
        });
      }
    })
    .then((responseObject: GetColourRules | null) => {
      if (responseObject !== null) {
        responseObject.colourRules.map((colourRule: ColourRule) => {
          colourRule.rule = new RegExp(colourRule.rule);
          return colourRule;
        });
        return responseObject.colourRules;
      } else {
        return undefined;
      }
    });
}
