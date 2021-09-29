import React from "react"
import ContentLoader from "react-content-loader"

const LiveStreamingHistoryLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1350}
    height={600}
    viewBox="0 0 1200 600"
    backgroundColor="#dedede"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="430" y="40" rx="0" ry="0" width="319" height="37" /> 
    <rect x="9" y="450" rx="0" ry="0" width="1175" height="123" /> 
    <rect x="22" y="103" rx="0" ry="0" width="1150" height="316" />
  </ContentLoader>
)

export default LiveStreamingHistoryLoader;