export default {
  getSharedListUrl
};

function getSharedListUrl(listId: number) {
  const baseUrl = window.location.origin;
  return `${baseUrl}/shared-list/${listId}`;
}
