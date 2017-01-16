import React from 'react'
import { Link } from 'react-router'
import { LoginLink } from 'react-stormpath'
import DocumentTitle from 'react-document-title'
import Header from './Header'
import Media from '../components/Media'

export default class extends React.Component {
  render () {
    return (
      <DocumentTitle title="Guitar Tuner">
        <Media />

        {/*<div className="MasterPage">
                  <Header />
                  { this.props.children }
                </div>*/}
      </DocumentTitle>
    )
  }
}