import React from "react"
import ContentLoader from "react-content-loader"

const NotificationViewAll = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={920}
    viewBox="0 0 1200 920"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="700" rx="0" ry="0" width="1180" height="123" /> 
    <rect x="9" y="107" rx="0" ry="0" width="1180" height="74" /> 
    <rect x="9" y="205" rx="0" ry="0" width="1180" height="74" /> 
    <rect x="9" y="300" rx="0" ry="0" width="1180" height="74" /> 
    <rect x="9" y="396" rx="0" ry="0" width="1180" height="74" /> 
    <rect x="10" y="491" rx="0" ry="0" width="1180" height="74" /> 
    <rect x="10" y="587" rx="0" ry="0" width="1180" height="74" />
  </ContentLoader>
)

export default NotificationViewAll;