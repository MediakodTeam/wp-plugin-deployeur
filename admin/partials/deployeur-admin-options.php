<?php

// Get section from class deployeur admin
$sections = $this->get_options_sections();
$fields = $this->get_options_fields();

// Get settings fields registered in options table
$options = get_option('deployeur_options');
?>
<div class="relative">

	<?php include('includes/deployeur-admin-notices.php'); ?>

	<?php $title = __('Settings', 'deployeur'); ?>
	<?php include('includes/deployeur-admin-header.php'); ?>

	<div class="px-5 pt-2 pb-2 -ml-5 bg-white sm:pb-0 lg:px-12">
		<nav class="flex -mb-px space-x-8" aria-label="Tabs">
			<?php $i = 0; ?>

			<?php foreach ($sections as $section) : ?>
				<button class="<?= $i < 1 ? "border-blue text-blue hover:text-blue" : "text-gray-500 hover:text-gray-700 hover:border-gray-300 border-transparent" ?> group inline-flex items-center no-underline py-4 px-1 border-b-2 font-medium text-sm border-b border-solid border-x-0 border-t-0 bg-transparent cursor-pointer transition" data-mkd-trigger-tabs-id="<?= $section['id'] ?>">
					<span class="h-5 w-5 dashicons mr-1 dashicons-<?= $section['icon'] ?> border-0"></span>
					<span><?= $section["title"] ?></span>
				</button>

				<?php $i++; ?>
			<?php endforeach; ?>
		</nav>
	</div>

	<form method="POST" action="options.php" class="px-5 mt-8 -ml-5 lg:px-12">
		<div class="hidden">
			<?php
			settings_fields('deployeur_options');
			do_settings_sections('deployeur_options');
			?>
		</div>

		<div class="">
			<?php $i = 0; ?>

			<?php foreach ($sections as $section) : ?>
				<div class="space-y-6 sm:space-y-5 <?= $i < 1 ? "" : "hidden" ?>" data-mkd-tabs-id="<?= $section['id'] ?>">
					<div>
						<h3 class="text-lg font-medium leading-6 !mb-0 text-gray-900">
							<?= $section['title'] ?>
						</h3>
						<?php if (isset($section['description'])) : ?>
							<p class="max-w-2xl mt-1 text-sm text-gray-500">
								<?= $section['description'] ?>
							</p>
						<?php endif; ?>
					</div>

					<div class="space-y-6 sm:space-y-5">
						<?php foreach ($fields as $field) : ?>
							<?php if ($field['section'] == $section['id']) : ?>
								<?php include('includes/deployeur-admin-fields.php'); ?>
							<?php endif; ?>
						<?php endforeach; ?>
					</div>
				</div>

				<?php $i++; ?>
			<?php endforeach; ?>
		</div>

		<div class="pt-5">
			<p class="submit">
				<input type="submit" name="submit" id="submit" class="!px-7 !py-2.5 !font-bold !rounded-none !bg-green hover:!bg-green-600 !text-black !text-base !border-green hover:!text-black !transition button button-primary" value="<?= __("Save changes", "deployeur") ?>">
			</p>
		</div>
	</form>
</div>