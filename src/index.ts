import { type FocusTrap, createFocusTrap } from "focus-trap";

export class EnhancedDialog extends HTMLElement {
	dialogObserver: MutationObserver;
	trap: FocusTrap | null = null;

	constructor() {
		super();
		this.close = this.close.bind(this);
		this.handleClick = this.handleClick.bind(this);

		this.dialogObserver = new MutationObserver((mutations) => {
			for (const mutation of mutations) {
				if (mutation.attributeName === "open") {
					const dialog = mutation.target as HTMLDialogElement;

					const isOpen = dialog.hasAttribute("open");
					if (!isOpen) return;

					this.trap?.activate();
				}
			}
		});
	}

	get dialog() {
		return this.querySelector(":scope dialog") as HTMLDialogElement;
	}

	get closeButton() {
		return this.querySelector(":scope .dialog-close") as HTMLButtonElement;
	}

	connectedCallback() {
		this.dialog?.addEventListener("click", this.handleClick);
		this.closeButton?.addEventListener("click", this.close);
		this.dialogObserver.observe(this.dialog, {
			attributes: true,
		});
		this.trap = createFocusTrap(this.dialog, {
			clickOutsideDeactivates: true,
		});
	}

	disconnectedCallback() {
		this.dialog?.removeEventListener("click", this.handleClick);
		this.closeButton?.removeEventListener("click", this.close);
	}

	async close() {
		this.trap?.deactivate();
		this.dialog.classList.add("dialog-closing");

		await this.animationsComplete();

		this.dialog.classList.remove("dialog-closing");
		this.dialog.close();
	}

	handleClick(event: MouseEvent) {
		if (event.clientX === 0 && event.clientY === 0) return;

		const dialogDimensions = this.dialog.getBoundingClientRect();

		if (
			event.clientX < dialogDimensions.left ||
			event.clientX > dialogDimensions.right ||
			event.clientY < dialogDimensions.top ||
			event.clientY > dialogDimensions.bottom
		) {
			this.close();
		}
	}

	animationsComplete() {
		return Promise.allSettled(
			this.dialog.getAnimations().map((animation) => animation.finished),
		);
	}
}

if (!customElements.get("enhanced-dialog")) {
	customElements.define("enhanced-dialog", EnhancedDialog);
}
