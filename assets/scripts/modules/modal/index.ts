import { getTranslations } from "../../helpers/i18n";

type ModalOptions = {
	title: string;
	content: string;
	type?: string;
	confirmLabelKey?: string;
	hideConfirmButton?: boolean;
};

export class Modal {
	options: ModalOptions;
	onConfirm: () => void;
	confirmButton: HTMLButtonElement;
	modal: HTMLDivElement;
	modalId: string;

	constructor(
		{
			title,
			content,
			type,
			confirmLabelKey,
			hideConfirmButton = false,
		}: ModalOptions,
		onConfirm = () => {}
	) {
		this.options = {
			title,
			content,
			type,
			confirmLabelKey,
			hideConfirmButton,
		};
		this.onConfirm = onConfirm;
		this.modalId = `mkd-modal-${Math.floor(Math.random() * 1000)}`;

		this.createModal();
	}

	createModal() {
		const modal = document.createElement("div");
		modal.id = this.modalId;
		modal.classList.add(
			"fixed",
			"inset-0",
			"z-[112000]",
			"opacity-0",
			"pointer-events-none",
			"flex",
			"items-center",
			"justify-center",
			"transition"
		);
		modal.setAttribute("role", "dialog");
		modal.setAttribute("aria-modal", "true");

		const modalOverlay = document.createElement("span");
		modalOverlay.classList.add(
			"absolute",
			"inset-0",
			"bg-black",
			"opacity-50"
		);

		modalOverlay.addEventListener("click", () => this.hideModal());

		const modalWrapper = document.createElement("div");
		modalWrapper.classList.add(
			"relative",
			"overflow-hidden",
			"bg-white",
			"px-4",
			"pt-5",
			"pb-4",
			"text-left",
			"shadow-xl",
			"transition-all",
			"sm:my-8",
			"sm:w-full",
			"sm:max-w-sm",
			"sm:p-6"
		);

		modalWrapper.innerHTML = `
		<div>
      <i class="mx-auto flex h-12 w-12 items-center justify-center rounded-full ${
			this.options.type == "success"
				? "bg-green-100"
				: this.options.type == "error"
				? "bg-red-100"
				: "bg-blue-50 bg-opacity-50"
		}">

			${
				this.options.type == "success"
					? `<svg class="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
				<path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
				</svg>`
					: ""
			}

			${
				this.options.type == "error"
					? `<svg class="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			 </svg>
			 `
					: ""
			}

			${
				this.options.type == "info"
					? `<svg class="h-6 w-6 text-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
		<path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
	 </svg>
	 `
					: ""
			}
      </i>

      <div class="mt-3 text-center sm:mt-5">
        <h3 class="text-lg font-medium leading-6 text-gray-900" id="modal-title">${
				this.options.title
			}</h3>
        <div class="mt-2">
          <p class="text-sm text-gray-500">${this.options.content}</p>
        </div>
      </div>
    </div>`;

		if (!this.options.hideConfirmButton) {
			this.confirmButton = document.createElement("button");
			this.confirmButton.classList.add(
				"mt-5",
				"inline-flex",
				"w-full",
				"justify-center",
				"!border-none",
				"!bg-blue-500",
				"!px-4",
				"!py-2",
				"!text-base",
				"!text-white",
				"hover:!bg-blue-600",
				"hover:!text-white",
				"!cursor-pointer"
			);

			this.confirmButton.innerHTML = getTranslations(
				this.options.confirmLabelKey ?? "confirm"
			);

			this.handleConfirm();

			modalWrapper.appendChild(this.confirmButton);
		}

		modal.appendChild(modalOverlay);
		modal.appendChild(modalWrapper);

		this.modal = modal;

		// Append to body
		document.body.appendChild(this.modal);
	}

	handleConfirm() {
		this.confirmButton.addEventListener("click", () => {
			this.onConfirm();
			this.hideModal();
		});
	}

	hideModal() {
		this.modal.classList.add("opacity-0");
		this.modal.classList.add("pointer-events-none");
	}

	showModal() {
		this.modal.classList.remove("opacity-0");
		this.modal.classList.remove("pointer-events-none");
	}
}
