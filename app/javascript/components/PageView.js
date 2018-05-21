import React from "react"
import PropTypes from "prop-types"
import ErrorHandler from "components/ErrorHandler"
import Histogram from "components/charts/Histogram"

class PageView extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      url: "",
      before: "",
      after: "",
      interval: "",
      data: [],
      errorResponse: [],
      error: null,
      errorInfo: null
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
  }

  handleChange(event) {
    const target = event.target
    this.setState({
      [target.name]: target.value
    })
  }

  handleSubmit(event) {
    const data = new FormData(event.target)

    fetch(process.env.API_URL, {
      method: "POST",
      body: data
    })
    .then(response => response.json())
    .then(data => this.setState({ data }))
    .catch(errorResponse => this.setState({ errorResponse }))

    event.preventDefault()
  }

  render () {
    return (
      <React.Fragment>
        <h1>Page View</h1>
        {
          this.state.data.map((data) => {
            if (data.error) {
              return (<div className="alert alert-danger" role="alert">{data.error}</div>)
            }
          })
        }
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label htmlFor="url" className="col-sm-1 col-form-label">URLs</label>
            <div className="col-sm-11">
              <input type="text" name="url" className="form-control" id="url" value={this.state.url} placeholder="Use comma to separate multiple URLs" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="before" className="col-sm-1 col-form-label">Before</label>
            <div className="col-sm-11">
              <input type="text" name="before" className="form-control" id="before" value={this.state.before} placeholder="YYYY-MM-DD" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="after" className="col-sm-1 col-form-label">After</label>
            <div className="col-sm-11">
              <input type="text" name="after" className="form-control" id="after" value={this.state.after} placeholder="YYYY-MM-DD" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="interval" className="col-sm-1 col-form-label">Interval</label>
            <div className="col-sm-11">
              <input type="text" name="interval" className="form-control" id="interval" value={this.state.interval} placeholder="e.g. 10m (for 10 minutes)" onChange={this.handleChange} />
            </div>
          </div>
          <div className="form-group row">
            <div className="offset-sm-1 col-sm-11">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>
        {this.state.errorInfo ? (
          <ErrorHandler error={this.state.error} errorInfo={this.state.errorInfo} />
        ) : (
          <Histogram queryData={this.state.data} />
        )}
      </React.Fragment>
    )
  }
}

export default PageView
