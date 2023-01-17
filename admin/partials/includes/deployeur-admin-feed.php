<?php

// Get display name of user_id
$user = get_user_by('ID', $update->user_id);

// require file on parent folder 'admin/class-deployeur-admin-helpers.php'
require_once __DIR__ . '../../../class-deployeur-admin-helpers.php';




$helpers = new Deployeur_Helpers();

?>

<li>
	<div class="relative pb-8">
		<?php if (!$is_last) : ?>
			<span class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
		<?php endif; ?>

		<div class="relative flex items-center gap-2 space-x-3">
			<div class="relative">
				<img class="flex items-center justify-center w-10 h-10 bg-gray-400 rounded-full ring-8 ring-white" src="<?= get_avatar_url($user->ID) ?>" alt="">

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
				<p class="mt-0 mb-0 text-sm text-gray-500">
					<?= $helpers->get_time_ago($update->date) ?>
				</p>
			</div>
		</div>
	</div>
</li>