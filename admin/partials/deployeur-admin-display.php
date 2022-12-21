<?php

$options = get_option('deployeur_options');

// Check if there's option `deployeur_webhook_url` and if it's an URL
$hasValidWebhook = is_array($options) && isset($options['deployeur_webhook_url']) && filter_var($options['deployeur_webhook_url'], FILTER_VALIDATE_URL);

// Retrive entry from history table
global $wpdb;
$table_name = $wpdb->prefix . 'deployeur_history';
$history = $wpdb->get_results("SELECT * FROM $table_name ORDER BY id DESC");

?>

<div class="relative mkd-wrapper">

	<?php include('includes/deployeur-admin-notices.php'); ?>

	<?php $title = __('Welcome', 'deployeur'); ?>
	<?php include('includes/deployeur-admin-header.php'); ?>

	<div class="px-5 pt-2 pb-2 -ml-5 sm:pb-0 lg:px-12">

		<h2 class="!text-lg mt-8 md:!text-xl">
			<?= __('Deploy your site', 'deployeur') ?>
		</h2>

		<button id="trigger-deploy" class="<?= $hasValidWebhook ? "!bg-green hover:!bg-green-600 !border-green" : "!bg-gray-500 !border-gray-500 !opacity-50 cursor-not-allowed"  ?> !px-7 !py-2.5 !font-bold !flex items-center !rounded-none  space-x-1 !text-black !text-base  hover:!text-black !transition button button-primary" <?= !$hasValidWebhook ? "disabled='disabled'" : "" ?> data-deploy-webhook="<?= is_array($options) ? $options['deployeur_webhook_url'] : "" ?>" data-deploy-hosting="<?= is_array($options) ? $options['deployeur_hostings_type'] : "" ?>" data-deploy-success="<?= sprintf(__("You're build is in progress ! The average time of a build is %s.", "deployeur"), is_array($options) ? $options['deployeur_average_build_time'] : "") ?> " data-deploy-error="<?= __(" The deploy has failed. Please check that you have correctly configured your webhook URL in the plugin settings.", "deployeur") ?>" data-ajax-url="<?= admin_url('admin-ajax.php') ?>">
			<span class="dashicons dashicons-cloud-upload"></span>
			<span><?= __('Deploy', 'deployeur') ?></span>
		</button>

		<?php if (!$hasValidWebhook) : ?>
			<p class="mt-2 text-sm text-red-500"><?= __('You need to configure your webhook URL to be able to deploy your website.', 'deployeur') ?></p>
		<?php endif; ?>
	</div>

	<div class="px-5 pt-2 pb-2 mt-12 -ml-5 sm:pb-0 lg:px-12" id="mkd-table-history">
		<hr class="border-gray-300" />

		<div class="md:flex md:items-center md:justify-between">
			<div class="flex-1">
				<h2 class="!text-lg mt-8 md:!text-xl">
					<?= __('History', 'deployeur') ?>
				</h2>
			</div>

			<div class="flex mt-4 md:mt-0 md:ml-4">
				<?php if (isset($history) && !empty($history)) : ?>
					<button type="button" class="inline-flex items-center px-4 py-2 text-sm font-medium !text-white !bg-blue-500 !border-0 hover:!bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue focus:ring-offset-2" id="clear-history" data-ajax-url="<?= admin_url('admin-ajax.php') ?>">
						<?= __('Clear history', 'deployeur') ?>
					</button>
				<?php endif; ?>
			</div>
		</div>

		<?php if (isset($history) && !empty($history)) : ?>
			<div class="flow-root">
				<ul role="list" class="-mb-8">

					<?php $i = 0; ?>
					<?php foreach ($history as $item) : ?>
						<?php $date_format = get_option('date_format'); ?>
						<?php $time_format = get_option('time_format'); ?>

						<?php $user = get_user_by('id', $item->user_id); ?>

						<li>
							<div class="relative pb-8">

								<?php if ($i < count($history) - 1) : ?>
									<span class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
								<?php endif; ?>

								<div class="relative flex space-x-3">
									<div>
										<span class="flex items-center justify-center w-8 h-8 <?= $item->status == "success" ? "bg-green-400" : "bg-red-400" ?> rounded-full text-white ring-8 ring-[#F0F0F1]">
											<?php if ($item->status == "success") : ?>
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" d="m5 13 6 6 9-14" />
												</svg>
											<?php else : ?>
												<svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-width="1.5" class="w-5 h-5" viewBox="0 0 24 24">
													<path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
												</svg>
											<?php endif; ?>
										</span>
									</div>
									<div class="flex flex-col md:flex-row min-w-0 flex-1 justify-between gap-4 pt-1.5">
										<div>
											<p class="!mt-0 !mb-0 text-sm text-gray-500">
												<?= sprintf(__('Deployed by <strong class="font-bold text-black">%s</strong>', 'deployeur'), $user->display_name) ?>
											</p>
										</div>
										<div class="text-sm text-gray-500 md:text-right whitespace-nowrap">
											<time>
												<?= date("{$date_format} {$time_format}", strtotime($item->date)) ?>
											</time>
										</div>
									</div>
								</div>
							</div>
						</li>

						<?php $i++; ?>
					<?php endforeach; ?>
				</ul>
			</div>
		<?php else : ?>
			<div class="text-center">
				<svg class="w-12 h-12 mx-auto text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
				</svg>

				<h3 class="mt-2 text-sm font-medium text-gray-900"><?= __('No deploy', 'deployeur') ?></h3>
				<p class="mt-1 text-sm text-gray-500">
					<?= __('No deploy has been made yet.', 'deployeur') ?>
				</p>
			</div>
		<?php endif; ?>
	</div>
</div>