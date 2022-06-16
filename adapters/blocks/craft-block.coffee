###
Render a Craft "Media Asset" block containing data for a responsive Visual
###
import { expandSuperTableAssets } from '../globals/responsive-craft-visual'
export default

	functional: true
	props: block: Object

	render: (create, { props: { block }, data }) ->
		create 'cloak-visual-block', {
			...data
			props: {

				# Expand the Super Table image and video fields in the same manner that
				# responsive-craft-visual does it
				...expandSuperTableAssets block

				# Other block specific settings
				maxWidth: block.maxWidth
			}
		}
