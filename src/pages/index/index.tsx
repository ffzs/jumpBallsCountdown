import React, { Component } from 'react'
import { View } from '@tarojs/components'
import Balls from '../../components/Balls';
import './index.less'

export default class Index extends Component {

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  render () {
    return (
      <View className='index'>
        <Balls/>
      </View>
    )
  }
}
