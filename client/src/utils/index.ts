const buttonStyle =
	"py-2 px-3 border rounded-lg mx-1 cursor-pointer select-none transition-all text-sm"
const objButtonStyle = buttonStyle
	.split(" ")
	.reduce((obj, key) => ({ ...obj, [key]: true }), {})

export function getButtonStyle(flag: boolean) {
	return { ...objButtonStyle, ...getBorderToggleStyle(flag) }
}

export function getBorderToggleStyle(
	isActive: boolean,
	options = { text: true, bg: true }
) {
	const text = {
		"text-zinc-600": !isActive,
		"text-zinc-200": isActive,
		"hover:text-zinc-500": !isActive,
		"hover:text-white": isActive
	}
	const bg = {
		"bg-zinc-800": isActive
	}
	return {
		"border-zinc-600": !isActive,
		"hover:border-zinc-500": !isActive,
		"border-zinc-200": isActive,
		"hover:border-white": isActive,
		...(options.text ? text : {}),
		...(options.bg ? bg : {})
	}
}
