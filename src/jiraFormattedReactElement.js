import React from 'react'
import PropTypes from "prop-types"

export default class JIraFormattedReactElement extends React.Component {
    static propTypes = {
        content: PropTypes.string
    }

    render () {
        return (
          <div data-testid="parentElement">
              {this.props.content}
          </div>
        )
      }
}