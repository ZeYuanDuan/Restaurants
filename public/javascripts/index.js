/* global confirm, alert */

function confirmDelete (id, name, event) {
  event.preventDefault()

  if (confirm(`確定要刪除「${name}」？`)) {
    fetch(`/restaurants/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = '/restaurants'
        } else {
          alert('刪除餐廳時發生錯誤: ' + data.message)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }
}

function sortRestaurants (event) {
  const sortOrder = event.target.value
  const urlParams = new URLSearchParams(window.location.search)
  urlParams.set('sort', sortOrder)
  window.location.search = urlParams.toString()
}

window.confirmDelete = confirmDelete
window.sortRestaurants = sortRestaurants
