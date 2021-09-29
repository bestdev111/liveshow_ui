import React from "react"
import ContentLoader from "react-content-loader"

const RevenueDashboardLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={500}
    viewBox="0 0 1200 500"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="300" rx="0" ry="0" width="1180" height="123" /> 
    <rect x="9" y="151" rx="0" ry="0" width="370" height="82" /> 
    <rect x="415" y="151" rx="0" ry="0" width="370" height="82" /> 
    <rect x="820" y="150" rx="0" ry="0" width="370" height="82" />
  </ContentLoader>
)

export default RevenueDashboardLoader;
