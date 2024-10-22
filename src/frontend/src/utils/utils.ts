const formatDate = (date?: string) => {
  if (date) {
    const dateString = new Date(date)
    return dateString.toISOString().split('T')[0]
  }
  return null
}

export default formatDate