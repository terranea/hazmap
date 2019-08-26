export function timestampToString(timestamp) {
  if (timestamp != null && timestamp.seconds > 0) {
    const format = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' }
    return new Date(timestamp.seconds * 1000).toLocaleString('de-DE', format)
  }
  return "-"
}

export function timestampToDateString(timestamp) {
  if (timestamp != null && timestamp.seconds > 0) {
    const format = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(timestamp.seconds * 1000).toLocaleString('de-DE', format)
  }
  return "-"
}

export function hazardTypeColor(type) {
  switch (type) {
    case "Wildfire":
      return "#FB6542"
    case "Flood":
      return "#375E97"
    case "Storm":
      return "#379797"
    case "Mass movement":
      return "#5a5f5f"
    case "Earthquake":
      return "#977137"
    default:
      return "#000"
  }
}