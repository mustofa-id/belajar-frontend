export function setupMainView() {
	const sidebar = document.getElementById('sidebar-left');
	const btn_show_sidebar = document.getElementById('btn-show-sidebar');
	const btn_hide_sidebar = document.getElementById('btn-hide-sidebar');

	btn_show_sidebar.onclick = () => sidebar.classList.remove('hidden');
	btn_hide_sidebar.onclick = () => sidebar.classList.add('hidden');
}
