export function handleGenericNon200Code(response: Response) {
	switch (response.status) {
		case 404: {
			console.log("Not found");
		}
	}
}
