import { dateFtt } from './tools'
export const dataFilter = (value, format) => {
  if (!value) return ''
  return dateFtt(value, format)
}

export const percentFilter = (value) => {
  if (!value) return ''
  return (value*100).toFixed(2) + '%'
}

export const moenyFilter = (value) => {
  if (!value) return ''
  return (value || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
}