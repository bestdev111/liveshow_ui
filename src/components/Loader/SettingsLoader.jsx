import React from "react"
import ContentLoader from "react-content-loader"

const SettingsLoader = (props) => (
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
    <rect x="9" y="120" rx="0" ry="0" width="370" height="134" /> 
    <rect x="415" y="120" rx="0" ry="0" width="370" height="134" /> 
    <rect x="820" y="120" rx="0" ry="0" width="370" height="134" /> 
    <rect x="9" y="280" rx="0" ry="0" width="370" height="134" /> 
    <rect x="415" y="280" rx="0" ry="0" width="370" height="134" /> 
    <rect x="820" y="280" rx="0" ry="0" width="370" height="134" /> 
    <rect x="9" y="607" rx="0" ry="0" width="370" height="134" /> 
    <rect x="415" y="440" rx="0" ry="0" width="370" height="134" /> 
    <rect x="820" y="440" rx="0" ry="0" width="370" height="134" /> 
    <rect x="9" y="440" rx="0" ry="0" width="370" height="134" /> 
    <rect x="415" y="607" rx="0" ry="0" width="370" height="134" /> 
    <rect x="9" y="779" rx="0" ry="0" width="1180" height="123" />
  </ContentLoader>
)

export default SettingsLoader;