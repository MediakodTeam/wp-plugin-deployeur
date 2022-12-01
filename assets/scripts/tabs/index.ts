window.addEventListener("load", function () {
	const tabsTrigger = document.querySelectorAll(
		"button[data-mkd-trigger-tabs-id]"
	) as NodeListOf<HTMLButtonElement>;

	tabsTrigger?.forEach((tabTrigger: HTMLButtonElement) => {
		const tab = document.querySelector(
			`[data-mkd-tabs-id="${tabTrigger.dataset.mkdTriggerTabsId}"]`
		);

		if (tab) {
			tabTrigger.addEventListener("click", function () {
				if (tab.classList.contains("hidden")) {
					tab.classList.remove("hidden");

					tabTrigger.classList.add("border-blue", "text-blue");
					tabTrigger.classList.remove(
						"text-gray-500",
						"hover:text-gray-700",
						"hover:border-gray-300",
						"border-transparent"
					);

					// Close all other tabs
					const otherTabs = document.querySelectorAll(
						`[data-mkd-tabs-id]:not([data-mkd-tabs-id="${tabTrigger.dataset.mkdTriggerTabsId}"])`
					) as NodeListOf<HTMLElement>;

					otherTabs?.forEach((otherTab: HTMLElement) => {
						otherTab.classList.add("hidden");
					});

					// Remove active effect on other tabs
					const otherTabsTrigger = document.querySelectorAll(
						`button[data-mkd-trigger-tabs-id]:not([data-mkd-trigger-tabs-id="${tabTrigger.dataset.mkdTriggerTabsId}"])`
					) as NodeListOf<HTMLButtonElement>;

					otherTabsTrigger?.forEach(
						(otherTabTrigger: HTMLButtonElement) => {
							otherTabTrigger.classList.remove(
								"border-blue",
								"text-blue"
							);
							otherTabTrigger.classList.add(
								"text-gray-500",
								"hover:text-gray-700",
								"hover:border-gray-300",
								"border-transparent"
							);
						}
					);
				}
			});
		}
	});
});
