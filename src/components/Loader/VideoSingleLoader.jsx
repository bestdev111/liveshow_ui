import React from "react"
import ContentLoader from "react-content-loader"

const VideoSingleLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={1000}
    viewBox="0 0 1200 1000"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="39" rx="0" ry="0" width="272" height="37" /> 
    <rect x="28" y="93" rx="0" ry="0" width="1140" height="378" /> 
    <rect x="450" y="495" rx="0" ry="0" width="272" height="37" /> 
    <rect x="12" y="570" rx="0" ry="0" width="350" height="159" /> 
    <rect x="420" y="570" rx="0" ry="0" width="350" height="159" /> 
    <rect x="825" y="570" rx="0" ry="0" width="350" height="159" /> 
    <rect x="520" y="761" rx="15" ry="15" width="144" height="35" /> 
    <rect x="9" y="832" rx="0" ry="0" width="1180" height="107" />
  </ContentLoader>
)

export default VideoSingleLoader;