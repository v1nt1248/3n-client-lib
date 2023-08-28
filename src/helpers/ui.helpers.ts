import {
  Comment,
  Text,
  Slot,
  VNode,
  // createApp,
} from 'vue'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import { colorsMap } from '../constants/general'
// import { getRandomId } from './common.helpers'
// import Ui3nNotification from '@/ui/components/ui-3n-notification.vue'

export function hasSlotContent(slot?: Slot, slotProps = {} ) {
  if (!slot) return false

  return slot(slotProps).some((vnode: VNode) => {
    if (vnode.type === Comment)
      return false

    if (Array.isArray(vnode.children) && !vnode.children.length)
      return false

    return (
      vnode.type !== Text
      || (typeof vnode.children === 'string' && vnode.children.trim() !== '')
    )
  })
}

export function getElementColor(initials = '?'): string {
  const code = initials.length === 1
    ? initials.charCodeAt(0) % 64
    : (initials.charCodeAt(0) + initials.charCodeAt(1)) % 64
  const codeStr = initials[0] === '?' ? '?' : code.toFixed()
  return colorsMap[codeStr]
}

export function invertColor(color: string): string {
  if (color) {
    let tmpColor = color.substring(1)
    let tmpColorNum = parseInt(tmpColor, 16)
    tmpColorNum = 0xFFFFFF ^ tmpColorNum
    tmpColor = tmpColorNum.toString(16)
    tmpColor = ('00000' + tmpColor).slice(-6)
    tmpColor = `#${tmpColor}`
    return tmpColor
  }
  return '#000'
}

export function html2text(html: string): string {
  const tag = document.createElement('div')
  tag.innerHTML = html
  return tag.innerText
}

/**
 * @param {number} ts - timestamp
 * @return {string} - times as string%
 * If TS is today, then Date returns as a string 'HH:mm'
 * If ts is period between 3 day before today and today, then Date returns as a string '{1|2|3} days ago'
 * Else Date returns as a string 'YYYY-MM-DD'
 */
export function prepareDateAsSting(ts: number): string {
  dayjs.extend(relativeTime)
  const now = dayjs()
  const dateValue = dayjs(ts)

  if (now.isSame(dateValue, 'day')) {
    return dateValue.format('HH:mm')
  }

  if (now.isBefore(dateValue.add(3, 'day'))) {
    return dateValue.fromNow()
  }

  return dateValue.format('YYYY-MM-DD')
}

// export function createNotification(params: Ui3nNotificationProps) {
//   const div = document.createElement('div')
//   const parentElement = !params.teleport || params.teleport === 'body'
//     ? document.body
//     : document.querySelector(params.teleport)
//   const duration = params.duration ?? 1500

//   if (parentElement) {
//     const componentInstance = createApp(
//       Ui3nNotification,
//       {
//         id: getRandomId(6),
//         content: params.content,
//         ...(params.type && { type: params.type }),
//         ...(params.icon && { icon: params.icon }),
//         ...(params.iconSize && { iconSize: params.iconSize }),
//         ...(params.iconColor && { iconColor: params.iconColor }),
//         ...(params.position && { position: params.position }),
//         ...(params.onOpen && { onOpen: params.onOpen }),
//         duration,
//         onClose: () => {
//           parentElement.removeChild(component.$el)
//           componentInstance && componentInstance.unmount && componentInstance.unmount()
//         },
//       },
//     )
//     const component = componentInstance.mount(div)
//     parentElement.appendChild(component.$el)

//     if (duration) {
//       setTimeout(() => {
//         parentElement.removeChild(component.$el)
//         componentInstance && componentInstance.unmount && componentInstance.unmount()
//       }, duration)
//     }
//   }
// }
