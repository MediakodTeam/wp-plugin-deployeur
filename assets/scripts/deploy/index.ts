import { getTranslations } from "../helpers/i18n";
import { Modal } from "../modules/modal";
import { Notice } from "../modules/notices";

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

const handleDeployTrigger = () => {
	// Handle deploy button
	const triggersDeploy = document.querySelectorAll("#trigger-deploy");

	if (!triggersDeploy || triggersDeploy.length === 0) {
		return;
	}

	const modalLoading = new Modal({
		title: getTranslations("loading"),
		content: getTranslations("deploy-loading"),
		type: "info",
		hideConfirmButton: true,
	});

	const modalSuccess = new Modal({
		title: getTranslations("success"),
		content: getTranslations("deploy-success"),
		type: "success",
	});

	const modalError = new Modal({
		title: getTranslations("error"),
		content: getTranslations("deploy-error"),
		type: "error",
	});
	const ajaxURL = (triggersDeploy[0] as HTMLButtonElement).dataset
		.ajaxUrl as string;

	triggersDeploy.forEach((triggerDeploy: HTMLButtonElement) => {
		triggerDeploy.addEventListener("click", async () => {
			modalLoading.showModal();

			const webhookResponse = await fetchWebhooks(
				triggerDeploy.dataset.deployWebhook as string,
				defineFetchMethod(triggerDeploy.dataset.deployHosting as string)
			);

			const data = {
				action: "mkd_log_history",
				status: webhookResponse.success ? "success" : "error",
				webhooks: triggerDeploy.dataset.deployWebhook as string,
			};

			// Log deploy trigger into db
			await fetch(ajaxURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Cache-Control": "no-cache",
				},
				body: new URLSearchParams(data),
			});

			modalLoading.hideModal();

			if (webhookResponse.error) {
				modalError.showModal();
			}
			if (webhookResponse.success) {
				modalSuccess.showModal();
			}
		});
	});
};

const handleClearHistory = () => {
	// Handle clear history
	const clearHistory = document.getElementById("clear-history");

	if (!clearHistory) {
		return;
	}

	const modalConfirmClear = new Modal(
		{
			title: getTranslations("confirm-clear"),
			content: getTranslations("confirm-clear-content"),
			type: "warning",
		},
		async () => {
			console.log("Clear history now");

			const ajaxURL = clearHistory.dataset.ajaxUrl as string;

			const data = {
				action: "mkd_clear_history",
			};

			await fetch(ajaxURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Cache-Control": "no-cache",
				},
				body: new URLSearchParams(data),
			});

			// Reload the page
			window.location.reload();
		},
		() => {}
	);

	clearHistory.addEventListener("click", () => {
		modalConfirmClear.showModal();
	});
};

window.addEventListener("load", async () => {
	handleDeployTrigger();
	handleClearHistory();
});
