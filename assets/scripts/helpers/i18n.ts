export const getTranslations = (key: string): string => {
	const translationsContainer = document.getElementById("mkd-translations");

	if (!translationsContainer) {
		return "";
	}

	return (
		translationsContainer.querySelector(`#${key}`)?.innerHTML ||
		`missing translation for ${key}`
	);
};
