import React from 'react'
import { Link } from 'react-router'
import { LoginLink } from 'react-stormpath'
import DocumentTitle from 'react-document-title'
import Header from './Header'
import PitchDetector from '../components/PitchDetector'

export default class extends React.Component {
  render () {
    return (
      <DocumentTitle title="Guitar Tuner">
        <PitchDetector />

        {/*<div className="MasterPage">
                  <Header />
                  { this.props.children }
                </div>*/}
      </DocumentTitle>
    )
  }
}