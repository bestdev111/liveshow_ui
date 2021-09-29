import React from "react"
import ContentLoader from "react-content-loader"

const InvoiceLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={700}
    viewBox="0 0 1200 700"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="535" rx="0" ry="0" width="1180" height="123" /> 
    <rect x="9" y="133" rx="0" ry="0" width="460" height="347" /> 
    <rect x="500" y="133" rx="0" ry="0" width="690" height="347" />
  </ContentLoader>
)

export default InvoiceLoader;