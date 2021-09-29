import React from "react"
import ContentLoader from "react-content-loader"

const RedeemsLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={600}
    viewBox="0 0 1200 600"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="456" rx="0" ry="0" width="1180" height="123" /> 
    <rect x="9" y="131" rx="0" ry="0" width="570" height="280" /> 
    <rect x="620" y="129" rx="0" ry="0" width="570" height="280" />
  </ContentLoader>
)

export default RedeemsLoader;