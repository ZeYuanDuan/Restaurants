/* global confirm, alert */

function confirmDelete (id, name, event) {
  event.preventDefault()
  const scrollPosition = window.scrollY

  if (confirm(`確定要刪除「${name}」？`)) {
    fetch(`/restaurants/${id}`, { method: 'DELETE' })
      .then((response) => response.json())
      .then(data => {
        if (data.success) {
          window.location.href = '/restaurants'
        } else {
          alert('刪除餐廳時發生錯誤: ' + data.message)
          window.scrollTo(0, scrollPosition)
        }
      })
      .catch((error) => {
        console.error('Error:', error)
        window.scrollTo(0, scrollPosition)
      })
  }
}

window.confirmDelete = confirmDelete
