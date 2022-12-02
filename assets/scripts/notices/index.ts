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

type NoticeType = "success" | "error";
export class Notice {
	private message: string;
	private type: NoticeType;
	private notice: HTMLDivElement;
	private noticeClose: HTMLButtonElement;

	constructor(message: string, type: NoticeType) {
		this.message = message;
		this.type = type;

		this.notice = this.createElement();
		this.show();
	}

	public createElement = () => {
		const notice = document.createElement("div");
		notice.classList.add(
			"mkd-notice",
			this.type == "success" ? "bg-green" : "bg-red-200",
			"rounded-lg"
		);

		const noticeContent = document.createElement("div");
		noticeContent.classList.add(
			"flex",
			"flex-wrap",
			"items-center",
			"justify-between",
			"px-3",
			"py-2",
			"sm:px-6",
			"lg:px-8"
		);

		const noticeMessage = document.createElement("p");
		noticeMessage.classList.add(
			"text-base",
			"font-bold",
			"text-black",
			"truncate"
		);
		noticeMessage.textContent = this.message;

		this.noticeClose = document.createElement("button");
		this.noticeClose.classList.add(
			"-mr-1",
			"!bg-transparent",
			"!p-2",
			"!appearance-none",
			"flex",
			"rounded-md",
			"!cursor-pointer",
			"!transition",
			"hover:!bg-black",
			"hover:!bg-opacity-10",
			"!border-none",
			"!bg-opacity-10",
			"focus:outline-none",
			"focus:ring-2",
			"focus:ring-white",
			"sm:-mr-2",
			"mkd-notice__close",
			"pointer-events-auto"
		);

		const noticeCloseIcon = document.createElement("div");
		noticeCloseIcon.innerHTML = `<svg class="w-6 h-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
		<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
	</svg>`;

		this.noticeClose.appendChild(noticeCloseIcon);
		noticeContent.appendChild(noticeMessage);
		noticeContent.appendChild(this.noticeClose);
		notice.appendChild(noticeContent);

		return notice;
	};

	public show = () => {
		const wrapper = document.querySelector(".mkd-notification-center");

		if (wrapper) wrapper.appendChild(this.notice);

		// Set a timeout to automatically close notification
		const autoRemove = setTimeout(() => {
			this.notice.remove();
		}, 5000);

		this.noticeClose.addEventListener("click", () => {
			this.notice.remove();

			// Clear the timeout
			autoRemove && clearTimeout(autoRemove);
		});
	};
}
