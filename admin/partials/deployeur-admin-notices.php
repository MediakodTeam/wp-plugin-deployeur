<?php

$notices = get_settings_errors();

if (empty($notices)) {
	return;
}

//array(1) { [0]=> array(4) { ["setting"]=> string(7) "general" ["code"]=> string(16) "settings_updated" ["message"]=> string(15) "Settings saved." ["type"]=> string(7) "success" } }

?>

<?php foreach ($notices as $notice) : ?>
	<div class="<?= $notice['type'] == "success" ? "bg-green" : "bg-red-200" ?> absolute z-50 top-3 sm:left-7 sm:right-12 rounded-lg right-3 -left-2">
		<div class="py-2 px-3 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between">

			<p class="truncate text-base font-bold text-black">
				<?= $notice['message'] ?>
			</p>

			<div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
				<button type="button" class="-mr-1 !bg-transparent !p-2 !appearance-none flex rounded-md  !cursor-pointer !transition hover:!bg-black hover:!bg-opacity-10 !border-none !bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2">
					<span class="sr-only"><?= __('Dismiss', 'deployer') ?></span>
					<!-- Heroicon name: outline/x-mark -->
					<svg class="h-6 w-6 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	</div>
<?php endforeach; ?>