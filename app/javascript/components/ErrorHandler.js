import React from "react"
import PropTypes from "prop-types"

class ErrorHandler extends React.Component {
  render () {
    return (
      <React.Fragment>
        <div className="alert alert-danger">
          <h3>Uh-oh! Something went wrong. Please contact wee007@gmail.com.</h3>
          <details style={{ whiteSpace: "pre-wrap" }}>
            {this.props.error && this.props.error.toString()}
            <br />
            {this.props.errorInfo.componentStack}
          </details>
        </div>
      </React.Fragment>
    )
  }
}

ErrorHandler.propTypes = {
  error: PropTypes.string,
  errorInfo: PropTypes.string
}

export default ErrorHandler
