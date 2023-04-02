export function getBorderToggleStyle(isActive: boolean, options = {text: true, bg: true}) {
    const text = {
        'text-zinc-600': !isActive,
        'text-zinc-200': isActive,
    };
    const bg = {
        'bg-zinc-800': isActive,
    };
    return {
        'border-zinc-600': !isActive,
        'border-zinc-200': isActive,
        ...(options.text ? text : {}),
        ...(options.bg ? bg : {}),
    };
}