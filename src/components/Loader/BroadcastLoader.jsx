import React from "react"
import ContentLoader from "react-content-loader"

const BroadcastLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={700}
    viewBox="0 0 1200 700"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="430" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="535" rx="0" ry="0" width="1175" height="123" /> 
    <rect x="9" y="133" rx="0" ry="0" width="800" height="347" /> 
    <rect x="850" y="133" rx="0" ry="0" width="330" height="347" />
  </ContentLoader>
)

export default BroadcastLoader;