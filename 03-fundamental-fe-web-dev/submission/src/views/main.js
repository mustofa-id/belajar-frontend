export function setupMainView() {
	const sidebar = document.getElementById('sidebar-left');
	const showSidebarButton = document.getElementById('btn-show-sidebar');
	const hideSidebarButton = document.getElementById('btn-hide-sidebar');

	showSidebarButton.onclick = () => sidebar.classList.remove('hidden');
	hideSidebarButton.onclick = () => sidebar.classList.add('hidden');
}
