<?php

$notices = get_settings_errors();

if (empty($notices)) {
	return;
}

//array(1) { [0]=> array(4) { ["setting"]=> string(7) "general" ["code"]=> string(16) "settings_updated" ["message"]=> string(15) "Settings saved." ["type"]=> string(7) "success" } }

?>

<?php foreach ($notices as $notice) : ?>
	<div class="mkd-notice <?= $notice['type'] == "success" ? "bg-green" : "bg-red-200" ?> absolute z-50 top-3 sm:left-7 sm:right-12 rounded-lg right-3 -left-2">
		<div class="flex flex-wrap items-center justify-between px-3 py-2 sm:px-6 lg:px-8">

			<p class="text-base font-bold text-black truncate">
				<?= $notice['message'] ?>
			</p>

			<div class="flex-shrink-0 order-2 sm:order-3 sm:ml-3">
				<button type="button" class="-mr-1 !bg-transparent !p-2 !appearance-none flex rounded-md  !cursor-pointer !transition hover:!bg-black hover:!bg-opacity-10 !border-none !bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 mkd-notice__close">
					<span class="sr-only"><?= __('Dismiss', 'deployer') ?></span>
					<!-- Heroicon name: outline/x-mark -->
					<svg class="w-6 h-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
<?php endforeach; ?>