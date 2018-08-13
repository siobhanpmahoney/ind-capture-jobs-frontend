export const formatDate = (date) => {
  let dateSaved = new Date(date)
  return dateSaved.toLocaleDateString()
}
