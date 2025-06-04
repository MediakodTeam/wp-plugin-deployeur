<?php

// Get display name of user_id
$user = get_user_by('ID', $update->user_id);

// require file on parent folder 'admin/class-deployeur-admin-helpers.php'
require_once __DIR__ . '../../../class-deployeur-admin-helpers.php';

$build_type = is_array($options) && array_key_exists('deployeur_build_type', $options) ? $options['deployeur_build_type'] : 'static';
$hasValidRevalidate = is_array($options) && isset($options['deployeur_revalidate_endpoint']) && filter_var($options['deployeur_revalidate_endpoint'], FILTER_VALIDATE_URL);

$helpers = new Deployeur_Helpers();

$revalidate_path = get_the_permalink($update->item_id);

// Get only the slugs from the revalidate path
$revalidate_path = str_replace(home_url(), '', $revalidate_path);
?>

<li>
	<div class="relative pb-8">
		<?php if (!$is_last) : ?>
			<span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
		<?php endif; ?>

		<div class="relative flex items-center gap-2 space-x-3">
			<div class="relative">
				<?php if ($user) : ?>
					<img class="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full ring-8 ring-white" src="<?= get_avatar_url($user->ID) ?>" alt="">
				<?php else : ?>
					<img class="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full ring-8 ring-white" src="<?= get_avatar_url(0) ?>" alt="">
				<?php endif; ?>

				<span class="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
					<?= $helpers->get_status_icon($update->status) ?>
				</span>
			</div>

			<div class="flex-1 min-w-0">
				<div class="mt-0 mb-0 text-gray-700 max-w-[48ch]">
					<p class="mt-0 mb-1 text-[16px]">
						<?= $helpers->get_status_text($update->item_id, $update->user_id, $update->status, $update->note) ?>
					</p>
				</div>

				<?php if ($build_type === "ISR_revalidate" && $hasValidRevalidate && $update->status !== "post_deleted") : ?>
					<button id="trigger-deploy" data-deploy-webhook="<?= is_array($options) ? $options['deployeur_revalidate_endpoint'] : "" ?>" data-deploy-hosting="<?= is_array($options) ? $options['deployeur_hostings_type'] : "" ?>" data-ajax-url="<?= admin_url('admin-ajax.php') ?>" data-deploy-type="revalidate" data-revalidate-path="<?= $revalidate_path ?>" class="p-0 mt-0 underline border-none appearance-none cursor-pointer text-sm- text-blue outline-focus hover:no-underline revalidate-button" data-post-id="<?= $update->item_id ?>">
						<span><?= __('Revalidate this path', 'deployeur') ?></span>
					</button>
				<?php endif; ?>

				<p class="mt-0 mb-0 text-sm text-gray-500">
					<?= $helpers->get_time_ago($update->date) ?>
				</p>
			</div>
		</div>
	</div>
</li>