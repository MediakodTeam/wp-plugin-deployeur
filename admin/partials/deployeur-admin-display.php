<?php

$options = get_option('deployeur_options');
var_dump($options);


// Check if there's option `deployeur_webhook_url` and if it's an URL
$hasValidWebhook = isset($options['deployeur_webhook_url']) && filter_var($options['deployeur_webhook_url'], FILTER_VALIDATE_URL);

?>


<div class="relative">

	<?php include('includes/deployeur-admin-notices.php'); ?>

	<?php $title = __('Welcome', 'deployeur'); ?>
	<?php include('includes/deployeur-admin-header.php'); ?>

	<div class="px-5 pt-2 pb-2 -ml-5 sm:pb-0 lg:px-12">

		<h2 class="!text-lg mt-8 md:!text-xl"><?= __('Deploy your site', 'deployeur') ?></h2>

		<button class="<?= $hasValidWebhook ? "!bg-green hover:!bg-green-600 !border-green" : "!bg-gray-500 !border-gray-500 !opacity-50 cursor-not-allowed"  ?> !px-7 !py-2.5 !font-bold !flex items-center !rounded-none  space-x-1 !text-black !text-base  hover:!text-black !transition button button-primary" <?= !$hasValidWebhook ? "disabled='disabled'" : "" ?>>
			<span class="dashicons dashicons-cloud-upload"></span>
			<span><?= __('Deploy', 'deployeur') ?></span>
		</button>

		<?php if (!$hasValidWebhook) : ?>
			<p class="mt-2 text-sm text-red-500"><?= __('You need to configure your webhook URL to be able to deploy your website.', 'deployeur') ?></p>
		<?php endif; ?>
	</div>
</div>