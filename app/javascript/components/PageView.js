import React from "react"
import PropTypes from "prop-types"

class PageView extends React.Component {
  render () {
    return (
      <React.Fragment>
        Url: {this.props.url}
        Before: {this.props.before}
        After: {this.props.after}
        Interval: {this.props.interval}
      </React.Fragment>
    )
  }
}

PageView.propTypes = {
  url: PropTypes.string,
  before: PropTypes.string,
  after: PropTypes.string,
  interval: PropTypes.string
}

export default PageView
