import React from "react"
import ContentLoader from "react-content-loader"

const ViewGroupLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={850}
    viewBox="0 0 1200 850"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="661" rx="0" ry="0" width="1180" height="123" /> 
    <rect x="9" y="121" rx="0" ry="0" width="1180" height="247" /> 
    <rect x="9" y="400" rx="0" ry="0" width="370" height="53" /> 
    <rect x="415" y="400" rx="0" ry="0" width="370" height="53" /> 
    <rect x="820" y="400" rx="0" ry="0" width="370" height="53" /> 
    <rect x="9" y="496" rx="0" ry="0" width="570" height="57" /> 
    <rect x="620" y="496" rx="0" ry="0" width="570" height="57" /> 
    <rect x="9" y="575" rx="0" ry="0" width="570" height="57" /> 
    <rect x="620" y="575" rx="0" ry="0" width="570" height="57" />
  </ContentLoader>
)

export default ViewGroupLoader;
