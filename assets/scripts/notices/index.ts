window.addEventListener("load", () => {
	const notices = document.querySelectorAll(
		".mkd-notice"
	) as NodeListOf<HTMLDivElement>;

	notices?.forEach((notice: HTMLDivElement) => {
		const noticeClose = notice.querySelector(
			".mkd-notice__close"
		) as HTMLButtonElement;

		noticeClose.addEventListener("click", () => {
			notice.remove();
		});
	});
});
