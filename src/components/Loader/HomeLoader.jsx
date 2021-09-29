import React from "react"
import ContentLoader from "react-content-loader"

const HomeLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={800}
    viewBox="0 0 1200 800"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="33" rx="0" ry="0" width="820" height="40" /> 
    <rect x="850" y="17" rx="0" ry="0" width="340" height="619" /> 
    <rect x="10" y="97" rx="0" ry="0" width="820" height="258" /> 
    <rect x="9" y="378" rx="0" ry="0" width="820" height="258" /> 
    <rect x="9" y="653" rx="0" ry="0" width="1180" height="113" />
  </ContentLoader>
)

export default HomeLoader;