###
Render the visual block from Craft block data
###
export default
	functional: true
	props: block: Object
	render: (create, { props: { block }, data }) ->
		create 'cloak-visual-block', {
			...data
			props: block
		}
