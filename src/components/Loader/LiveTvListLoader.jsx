import React from "react"
import ContentLoader from "react-content-loader"

const LiveTvListLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={700}
    viewBox="0 0 1200 700"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="38" rx="0" ry="0" width="272" height="37" /> 
    <rect x="20" y="134" rx="0" ry="0" width="350" height="160" /> 
    <rect x="425" y="133" rx="0" ry="0" width="350" height="160" /> 
    <rect x="825" y="131" rx="0" ry="0" width="350" height="160" /> 
    <rect x="20" y="319" rx="0" ry="0" width="350" height="160" /> 
    <rect x="425" y="318" rx="0" ry="0" width="350" height="160" /> 
    <rect x="825" y="316" rx="0" ry="0" width="350" height="160" /> 
    <rect x="500" y="504" rx="15" ry="15" width="167" height="29" /> 
    <rect x="9" y="564" rx="0" ry="0" width="1180" height="129" />
  </ContentLoader>
)

export default LiveTvListLoader;