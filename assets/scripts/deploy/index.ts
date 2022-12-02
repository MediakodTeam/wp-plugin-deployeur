const defineFetchMethod = (hosting: string): "GET" | "POST" => {
	switch (hosting) {
		case "Netlify":
			return "POST";
		case "Vercel":
			return "GET";
		default:
			return "POST";
	}
};

const fetchWebhooks = async (
	webhook: string,
	method: "GET" | "POST"
): Promise<any> => {
	const response = await fetch(webhook, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			if (data.error) {
				return {
					...data,
				};
			}

			return {
				success: true,
			};
		})
		.catch((error) => {
			console.log("⛔️ ", error);

			return {
				error: "Unknow error, please check your console",
			};
		});

	return response;
};

window.addEventListener("load", async () => {
	const triggerDeploy = document.getElementById("trigger-deploy");

	if (!triggerDeploy) {
		return;
	}

	triggerDeploy.addEventListener("click", async () => {
		const webhookResponse = await fetchWebhooks(
			triggerDeploy.dataset.deployWebhook as string,
			defineFetchMethod(triggerDeploy.dataset.deployHosting as string)
		);

		if (webhookResponse.error) {
			alert("⛔️ " + triggerDeploy.dataset.deployError);
		}

		if (webhookResponse.success) {
			alert("✅ " + triggerDeploy.dataset.deploySuccess);
		}
	});
});
