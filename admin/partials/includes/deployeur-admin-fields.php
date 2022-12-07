<div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
	<<?= isset($field['type']) && $field['type'] == "checkbox" ? "span" : "label" ?> for="<?= $field['name'] ?>" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"><?= $field['title'] ?></<?= isset($field['type']) && $field['type'] == "checkbox" ? "span" : "label" ?>>
	<div class="mt-1 sm:col-span-2 sm:mt-0">
		<?php
		switch (isset($field["type"]) ? $field["type"] : "text"):
			case 'select': ?>
				<select id="<?= esc_attr($field['name']); ?>" class="!px-2 !py-1 block w-full !max-w-lg rounded-md !border-gray-300 focus:!shadow-none focus:!ring-2 focus:!border-green focus:!ring-green sm:text-sm transition" name="deployeur_options[<?= esc_attr($field['name']); ?>]">
					<?php foreach ($field['options'] as $key => $value) : ?>
						<option value="<?= $key ?>" <?= isset($options[$field['name']]) ? ($key == $options[$field['name']] ? "selected" : "") : "" ?>><?= $value ?></option>
					<?php endforeach; ?>
				</select>
			<?php break;
			case 'checkbox': ?>
				<div class="mt-1">
					<input type="checkbox" id="<?= esc_attr($field['name']); ?>" name="deployeur_options[<?= esc_attr($field['name']); ?>]" value="1" <?= isset($options[$field['name']]) && $options[$field['name']] == 1 ? "checked" : "" ?> class="!px-2 !py-1 block !max-w-lg rounded-md !border-gray-300 focus:!shadow-none focus:!ring-2 focus:!border-green focus:!ring-green sm:text-sm transition !w-5 !h-5 before:!w-[1.5125rem] before:!h-[1.5125rem]">
					<label for="<?= $field['name'] ?>"><?= $field['label'] ?></label>
				</div>
			<?php break;
			default: ?>
				<input id='<?= esc_attr($field['name']); ?>' class="!px-2 !py-1 block w-full max-w-lg rounded-md !border-gray-300 focus:!shadow-none focus:!ring-2 focus:!border-green focus:!ring-green sm:text-sm transition" name="deployeur_options[<?= esc_attr($field['name']); ?>]" type="<?= isset($field['type']) ? $field['type'] : "text" ?>" value='<?= isset($options[$field['name']]) ? esc_attr($options[$field['name']]) : ''; ?>' />
		<?php break;
		endswitch; ?>

		<?php if (isset($field["note"])) : ?>
			<p class="mt-0 mb-0 text-sm italic text-gray-500">
				<?= $field['note'] ?>
			</p>
		<?php endif; ?>
	</div>
</div>