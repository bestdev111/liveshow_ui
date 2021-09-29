import React from "react"
import ContentLoader from "react-content-loader"

const AccountLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={700}
    viewBox="0 0 1200 700"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="9" y="278" rx="0" ry="0" width="1270" height="216" /> 
    <rect x="9" y="532" rx="0" ry="0" width="1270" height="123" /> 
    <circle cx="350" cy="105" r="67" /> 
    <rect x="17" y="196" rx="0" ry="0" width="1175" height="44" /> 
    <rect x="500" y="60" rx="0" ry="0" width="173" height="16" /> 
    <rect x="500" y="94" rx="0" ry="0" width="205" height="19" /> 
    <rect x="500" y="133" rx="0" ry="0" width="150" height="20" /> 
    <rect x="700" y="133" rx="0" ry="0" width="150" height="20" />
  </ContentLoader>
)

export default AccountLoader;