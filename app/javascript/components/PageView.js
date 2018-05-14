import React from "react"
import PropTypes from "prop-types"

class PageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      data: [],
      url: "",
      before: "",
      after: "",
      interval: ""
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    const target = event.target
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    alert("Woot!")
    event.preventDefault()
  }

  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.handleSubmit}>
          <label>
            URLs:
            <input type="text" name="url" value={this.state.url} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </React.Fragment>
    )
  }
}

PageView.propTypes = {
  data: PropTypes.array,
  url: PropTypes.string,
  before: PropTypes.string,
  after: PropTypes.string,
  interval: PropTypes.string
}

export default PageView
