import React from "react"
import ContentLoader from "react-content-loader"

const VodManagerLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={650}
    viewBox="0 0 1200 650"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="450" rx="0" ry="0" width="1175" height="123" /> 
    <rect x="22" y="159" rx="0" ry="0" width="1150" height="259" /> 
    <rect x="1070" y="103" rx="15" ry="15" width="104" height="27" />
  </ContentLoader>
)

export default VodManagerLoader;