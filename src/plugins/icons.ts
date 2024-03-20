import { Plugin } from 'vue'
import { addIcon } from '@iconify/vue'
import { IconifyIcon } from '@iconify/vue/offline'

import baselineClose from '@iconify-icons/ic/baseline-close'
import roundSearch from '@iconify-icons/ic/round-search'
import baselineArrowDownward from '@iconify-icons/ic/baseline-arrow-downward'
import baselineArrowUpward from '@iconify-icons/ic/baseline-arrow-upward'
import baselineArrowForward from '@iconify-icons/ic/baseline-arrow-forward'
import baselineArrowBack from '@iconify-icons/ic/baseline-arrow-back'
import baselineLanguage from '@iconify-icons/ic/baseline-language'
import baselineBrush from '@iconify-icons/ic/baseline-brush'
import baselineEdit from '@iconify-icons/ic/baseline-edit'
import outlineEdit from '@iconify-icons/ic/outline-edit'
import outlineDelete from '@iconify-icons/ic/outline-delete'
import roundCheck from '@iconify-icons/ic/round-check'
import roundDone from '@iconify-icons/ic/round-done'
import roundDoneAll from '@iconify-icons/ic/round-done-all'
import roundInfo from '@iconify-icons/ic/round-info'
import roundAddCircleOutline from '@iconify-icons/ic/round-add-circle-outline'
import outlineLogout from '@iconify-icons/ic/outline-logout'
import outlineInfo from '@iconify-icons/ic/outline-info'
import baselineHome from '@iconify-icons/ic/baseline-home'
import baselineSchedule from '@iconify-icons/ic/baseline-schedule'
import baselineFolder from '@iconify-icons/ic/baseline-folder'
import baselineSubject from '@iconify-icons/ic/baseline-subject'
import baselineBookmark from '@iconify-icons/ic/baseline-bookmark'
import baselineArrowDropDown from '@iconify-icons/ic/baseline-arrow-drop-down'
import outlineFolder from '@iconify-icons/ic/outline-folder'
import outlineFileUpload from '@iconify-icons/ic/outline-file-upload'
import outlineChat from '@iconify-icons/ic/outline-chat'
import outlineMail from '@iconify-icons/ic/outline-mail'
import roundPersonOutline from '@iconify-icons/ic/round-person-outline'
import roundPerson from '@iconify-icons/ic/round-person'
import roundWarning from '@iconify-icons/ic/round-warning'
import roundRefresh from '@iconify-icons/ic/round-refresh'
import roundReportGmailErrorred from '@iconify-icons/ic/round-report-gmailerrorred'
import baselineEmoticon from '@iconify-icons/ic/baseline-insert-emoticon'
import baselineAttachFile from '@iconify-icons/ic/baseline-attach-file'
import baselineSend from '@iconify-icons/ic/baseline-send'
import outlineAccountCircle from '@iconify-icons/ic/outline-account-circle'
import baselineSystemUpdateAlt from '@iconify-icons/ic/baseline-system-update-alt'
import outlineCleaningServices from '@iconify-icons/ic/outline-cleaning-services'
import baselineReply from '@iconify-icons/ic/baseline-reply'
import roundContentCopy from '@iconify-icons/ic/round-content-copy'
import outlineDownloadForOffline from '@iconify-icons/ic/outline-download-for-offline'
import roundCheckBoxOutlineBlank from '@iconify-icons/ic/round-check-box-outline-blank'
import baselineCheckBox from '@iconify-icons/ic/baseline-check-box'
import baselineIndeterminateCheckBox from '@iconify-icons/ic/baseline-indeterminate-check-box'

const icons: Record<string, IconifyIcon> = {
  'close': baselineClose,
  'search': roundSearch,
  'arrow-downward': baselineArrowDownward,
  'arrow-upward': baselineArrowUpward,
  'arrow-forward': baselineArrowForward,
  'arrow-back': baselineArrowBack,
  'language': baselineLanguage,
  'brush': baselineBrush,
  'edit': baselineEdit,
  'edit-outline': outlineEdit,
  'delete': outlineDelete,
  'check': roundCheck,
  'done': roundDone,
  'done-all': roundDoneAll,
  'info': roundInfo,
  'info-outline': outlineInfo,
  'add-circle': roundAddCircleOutline,
  'logout': outlineLogout,
  'home': baselineHome,
  'schedule': baselineSchedule,
  'arrow-drop-down': baselineArrowDropDown,
  'folder': baselineFolder,
  'folder-outline': outlineFolder,
  'subject': baselineSubject,
  'bookmark': baselineBookmark,
  'file-upload': outlineFileUpload,
  'chat': outlineChat,
  'mail': outlineMail,
  'person': roundPerson,
  'person-outline': roundPersonOutline,
  'warning': roundWarning,
  'refresh': roundRefresh,
  'report-gmail-errorred': roundReportGmailErrorred,
  'emoticon': baselineEmoticon,
  'attach-file': baselineAttachFile,
  'send': baselineSend,
  'account-circle': outlineAccountCircle,
  'system-update-alt': baselineSystemUpdateAlt,
  'cleaning-services': outlineCleaningServices,
  'reply': baselineReply,
  'content-copy': roundContentCopy,
  'download-for-offline': outlineDownloadForOffline,
  'check-box': roundCheckBoxOutlineBlank,
  'check-box-checked': baselineCheckBox,
  'check-box-inderterminate': baselineIndeterminateCheckBox,
}

export const useIcons: Plugin = {
  install: () => {
    Object.keys(icons).forEach(name => {
      addIcon(name, icons[name])
    })
    console.info('\n--- ICONS INITIALIZATION ---\n')
  },
}
