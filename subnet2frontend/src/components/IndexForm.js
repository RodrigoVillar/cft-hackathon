import React from 'react'

export class IndexForm extends React.Component {
  constructor(props) {
    super(props)
  }


  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Enter the escrow indexx:
          <input
            type="number"
            //value={index}
            onChange={(e) => this.props.setIndex(e.target.value)}
          />
        </label>
        <input type="submit" />
      </form>
    )
  }

}