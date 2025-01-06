interface SelectedItem {
	id: string
	grade: 1 | 2 | 3
}

interface PhotoItem {
	email: string
	class: string
	number: number
	name: string
	id: string
	title: string
}

interface DocsData {
	selected: SelectedItem[]
	items: PhotoItem[]
}

declare module "~/assets/docs.json" {
	const value: DocsData
	export default value
}
