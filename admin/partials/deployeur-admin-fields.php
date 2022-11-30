<div class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 sm:pt-5">
	<label for="about" class="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"><?= $field['title'] ?></label>
	<div class="mt-1 sm:col-span-2 sm:mt-0">
		<?php
		switch (isset($field["type"]) ? $field["type"] : "text"):
			case 'select': ?>
				<select id="<?= esc_attr($field['name']); ?>" class="!px-2 !py-1 block w-full !max-w-lg rounded-md !border-gray-300 focus:!shadow-none focus:!ring-2 focus:!border-green focus:!ring-green sm:text-sm transition" name="deployeur_options[<?= esc_attr($field['name']); ?>]">
					<?php foreach ($field['options'] as $key => $value) : ?>
						<option value="<?= $key ?>" <?= $key == $options[$field['name']] ? "selected" : "" ?>><?= $value ?></option>
					<?php endforeach; ?>
				</select>
			<?php break;

				/*	case 'text': ?>
		<input id='<?php echo esc_attr($args['label_for']); ?>' name="deployeur_options[<?php echo esc_attr($args['label_for']); ?>]" type='url' placeholder='https://example.com' pattern='https://.*' value='<?php echo isset($options['deployeur_webhook_url']) ? esc_attr($options['deployeur_webhook_url']) : ''; ?>' />
	<?php break;
	case 'textarea': ?>
		<textarea id='<?php echo esc_attr($args['label_for']); ?>' name="deployeur_options[<?php echo esc_attr($args['label_for']); ?>]" rows='5' cols='50' placeholder='https://example.com' pattern='https://.*'><?php echo isset($options['deployeur_webhook_url']) ? esc_attr($options['deployeur_webhook_url']) : ''; ?></textarea>
	<?php break;*/
			default: ?>
				<input id='<?= esc_attr($field['name']); ?>' class="!px-2 !py-1 block w-full max-w-lg rounded-md !border-gray-300 focus:!shadow-none focus:!ring-2 focus:!border-green focus:!ring-green sm:text-sm transition" name="deployeur_options[<?= esc_attr($field['name']); ?>]" type="<?= isset($field['type']) ? $field['type'] : "text" ?>" value='<?php echo isset($options[$field['name']]) ? esc_attr($options[$field['name']]) : ''; ?>' />
		<?php break;
		endswitch; ?>

		<?php if (isset($field["note"])) : ?>
			<p class="mt-0 mb-0 text-sm italic text-gray-500">
				<?= $field['note'] ?>
			</p>
		<?php endif; ?>
	</div>
</div>