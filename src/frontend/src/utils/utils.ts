const formatDate = (date?: string, includeTime: boolean = false) => {
  if (date) {
    const dateString = new Date(date)
    if (includeTime) {
      return dateString.toISOString().replace('T', ' ').split('.')[0]
    }
    return dateString.toISOString().split('T')[0]
  }
  return null
}

export default formatDate