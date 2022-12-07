<?php

$options = get_option('deployeur_options');

// Check if there's option `deployeur_webhook_url` and if it's an URL
$hasValidWebhook = is_array($options) && isset($options['deployeur_webhook_url']) && filter_var($options['deployeur_webhook_url'], FILTER_VALIDATE_URL);

?>


<div class="relative mkd-wrapper">

	<?php include('includes/deployeur-admin-notices.php'); ?>

	<?php $title = __('Welcome', 'deployeur'); ?>
	<?php include('includes/deployeur-admin-header.php'); ?>

	<div class="px-5 pt-2 pb-2 -ml-5 sm:pb-0 lg:px-12">

		<h2 class="!text-lg mt-8 md:!text-xl"><?= __('Deploy your site', 'deployeur') ?></h2>

		<button id="trigger-deploy" class="<?= $hasValidWebhook ? "!bg-green hover:!bg-green-600 !border-green" : "!bg-gray-500 !border-gray-500 !opacity-50 cursor-not-allowed"  ?> !px-7 !py-2.5 !font-bold !flex items-center !rounded-none  space-x-1 !text-black !text-base  hover:!text-black !transition button button-primary" <?= !$hasValidWebhook ? "disabled='disabled'" : "" ?> data-deploy-webhook="<?= is_array($options) ? $options['deployeur_webhook_url'] : "" ?>" data-deploy-hosting="<?= is_array($options) ? $options['deployeur_hostings_type'] : "" ?>" data-deploy-success="<?= sprintf(__("You're build is in progress ! The average time of a build is %s.", "deployeur"), is_array($options) ? $options['deployeur_average_build_time'] : "") ?> " data-deploy-error="<?= __(" The deploy has failed, please be sure to have correctly set your webhook URL.", "deployeur") ?>" data-ajax-url="<?= admin_url('admin-ajax.php') ?>">
			<span class="dashicons dashicons-cloud-upload"></span>
			<span><?= __('Deploy', 'deployeur') ?></span>
		</button>

		<?php if (!$hasValidWebhook) : ?>
			<p class="mt-2 text-sm text-red-500"><?= __('You need to configure your webhook URL to be able to deploy your website.', 'deployeur') ?></p>
		<?php endif; ?>
	</div>
</div>