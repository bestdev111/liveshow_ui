import React from "react"
import ContentLoader from "react-content-loader"

const SubscriptionLoader = (props) => (
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
    <rect x="9" y="117" rx="0" ry="0" width="370" height="260" /> 
    <rect x="415" y="117" rx="0" ry="0" width="370" height="260" /> 
    <rect x="815" y="117" rx="0" ry="0" width="370" height="260" /> 
    <rect x="8" y="399" rx="0" ry="0" width="370" height="260" /> 
    <rect x="415" y="399" rx="0" ry="0" width="370" height="260" /> 
    <rect x="815" y="399" rx="0" ry="0" width="370" height="260" /> 
    <rect x="6" y="697" rx="0" ry="0" width="1180" height="132" />
  </ContentLoader>
)

export default SubscriptionLoader;