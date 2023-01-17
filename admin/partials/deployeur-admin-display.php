<?php

$options = get_option('deployeur_options');

// Check if there's option `deployeur_webhook_url` and if it's an URL
$hasValidWebhook = is_array($options) && isset($options['deployeur_webhook_url']) && filter_var($options['deployeur_webhook_url'], FILTER_VALIDATE_URL);

// Retrive entry from update table
global $wpdb;

$table_name = $wpdb->prefix . 'deployeur_update';
$update_history = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");

?>

<div class="relative mkd-wrapper">

	<?php include('includes/deployeur-admin-notices.php'); ?>

	<?php $title = __('Welcome', 'deployeur'); ?>
	<?php include('includes/deployeur-admin-header.php'); ?>

	<div class="px-5 pt-2 pb-2 -ml-5 sm:pb-0 lg:px-12">

		<h2 class="!text-lg mt-8 md:!text-xl">
			<?= __('Deploy your site', 'deployeur') ?>
		</h2>

		<?php if ($this->helpers->get_count_of_update() > 0) : ?>
			<p class="mt-2 text-sm">
				<?= sprintf(__("You have %s update(s) to deploy.", "deployeur"), $this->helpers->get_count_of_update()) ?>
			</p>
		<?php endif; ?>

		<button id="trigger-deploy" class="<?= $hasValidWebhook ? "!bg-green hover:!bg-green-600 !border-green" : "!bg-gray-500 !border-gray-500 !opacity-50 cursor-not-allowed"  ?> !px-7 !py-2.5 !font-bold !flex items-center !rounded-none  space-x-1 !text-black !text-base  hover:!text-black !transition button button-primary" <?= !$hasValidWebhook ? "disabled='disabled'" : "" ?> data-deploy-webhook="<?= is_array($options) ? $options['deployeur_webhook_url'] : "" ?>" data-deploy-hosting="<?= is_array($options) ? $options['deployeur_hostings_type'] : "" ?>" data-deploy-success="<?= sprintf(__("You're build is in progress ! The average time of a build is %s.", "deployeur"), is_array($options) ? $options['deployeur_average_build_time'] : "") ?> " data-deploy-error="<?= __(" The deploy has failed. Please check that you have correctly configured your webhook URL in the plugin settings.", "deployeur") ?>" data-ajax-url="<?= admin_url('admin-ajax.php') ?>">
			<span class="dashicons dashicons-cloud-upload"></span>
			<span><?= __('Deploy', 'deployeur') ?></span>
		</button>

		<?php if (!$hasValidWebhook) : ?>
			<p class="mt-2 text-sm text-red-500"><?= __('You need to configure your webhook URL to be able to deploy your website.', 'deployeur') ?></p>
		<?php endif; ?>
	</div>


	<div class="px-5 pt-2 pb-2 mt-12 -ml-5 sm:pb-0 lg:px-12" id="mkd-table-history">
		<div class="md:flex md:items-center md:justify-between">
			<div class="flex-1">
				<h2 class="!text-lg mt-8 md:!text-xl">
					<?= __('History of update', 'deployeur') ?>
				</h2>
			</div>
		</div>

		<div class="flow-root">

			<?php if (count($update_history) > 0) : ?>
				<ul role="list" class="-mb-8">
					<?php foreach ($update_history as $key => $update) : ?>
						<?php $is_last = ((count($update_history) - 1) === $key) ?>

						<?php include('includes/deployeur-admin-feed.php'); ?>
					<?php endforeach; ?>
				</ul>
			<?php else : ?>

				<div class="text-center">
					<svg class="w-12 h-12 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
						<path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
					</svg>

					<h3 class="mt-2 mb-0 text-sm font-medium text-gray-900"><?= __('No update', 'deployeur') ?></h3>
					<p class="mt-1 text-sm text-gray-500"><?= __("All your change has already published, well done!", "deployeur") ?></p>
				</div>
			<?php endif; ?>
		</div>
	</div>
</div>