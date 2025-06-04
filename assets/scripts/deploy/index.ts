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

const handleDeployTrigger = () => {
	// Handle deploy button
	const triggersDeploy = document.querySelectorAll("#trigger-deploy");

	if (!triggersDeploy || triggersDeploy.length === 0) {
		return;
	}

	for (let i = 0; i < triggersDeploy.length; i++) {
		const triggerDeploy = triggersDeploy[i] as HTMLButtonElement;

		const modalType = triggerDeploy.dataset.deployType as string;

		const modalLoading = new Modal({
			title: getTranslations("loading"),
			content: getTranslations(
				modalType === "revalidate" ? "revalidate-loading" : "deploy-loading"
			),
			type: "info",
			hideConfirmButton: true,
		});

		const modalSuccess = new Modal({
			title: getTranslations("success"),
			content: getTranslations(
				modalType === "revalidate" ? "revalidate-success" : "deploy-success"
			),
			type: "success",
		});

		const modalError = new Modal({
			title: getTranslations("error"),
			content: getTranslations(
				modalType === "revalidate" ? "revalidate-error" : "deploy-error"
			),
			type: "error",
		});

		const ajaxURL = (triggersDeploy[0] as HTMLButtonElement).dataset
			.ajaxUrl as string;

		console.log("Trigger deploy ", triggerDeploy);

		triggerDeploy.addEventListener("click", async () => {
			modalLoading.showModal();

			const webhookData = {
				action:
					modalType === "revalidate"
						? "mkd_revalidate_path"
						: "mkd_fetch_webhooks",
				webhooks: triggerDeploy.dataset.deployWebhook as string,
				method: defineFetchMethod(
					triggerDeploy.dataset.deployHosting as string
				),
				post_id: triggerDeploy.dataset.postId as string,
				path: triggerDeploy.dataset.revalidatePath as string,
			};

			const res = await fetch(ajaxURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"Cache-Control": "no-cache",
				},
				body: new URLSearchParams(webhookData),
			});

			console.log("Trigger deploy ", triggerDeploy);

			const data = {
				action: "mkd_log_history",
				status: res.ok ? "success" : "error",
				webhooks:
					modalType === "revalidate"
						? (triggerDeploy.dataset.revalidatePath as string)
						: (triggerDeploy.dataset.deployWebhook as string),
				type: modalType,
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

			if (!res.ok) {
				modalError.showModal();
			} else {
				modalSuccess.showModal();
			}
		});
	}
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
