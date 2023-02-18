const PersianNumber = ({ number, isCost }) => {
  if (number || number === 0) {
    const persianMap = '۰۱۲۳۴۵۶۷۸۹'.split('')
    const formatNumber = isCost
      ? number.toLocaleString().replace(/\d/g, (m) => persianMap[parseInt(m)])
      : number.toString().replace(/\d/g, (m) => persianMap[parseInt(m)])
    return <span>{formatNumber}</span>
  } else return null
}

export default PersianNumber
