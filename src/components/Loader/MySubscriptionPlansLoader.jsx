import React from "react"
import ContentLoader from "react-content-loader"

const MySubscriptionPlansLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={900}
    viewBox="0 0 1200 900"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="450" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="716" rx="0" ry="0" width="1180" height="132" /> 
    <rect x="22" y="103" rx="0" ry="0" width="1150" height="166" /> 
    <rect x="22" y="290" rx="0" ry="0" width="1150" height="166" /> 
    <rect x="22" y="477" rx="0" ry="0" width="1150" height="166" /> 
    <rect x="500" y="660" rx="15" ry="15" width="157" height="32" />
  </ContentLoader>
)

export default MySubscriptionPlansLoader;
