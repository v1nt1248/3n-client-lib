import { ref } from 'vue'
import type { Meta, StoryFn } from '@storybook/vue3'
import Ui3nDropFiles from '../components/ui3n-drop-files.vue'
import type { Ui3nDropFilesProps } from '../components/ui3n-drop-files.vue'

const meta: Meta<typeof Ui3nDropFiles> = {
  title: 'Example/Ui3nDropFiles',
  component: Ui3nDropFiles,
  tags: ['autodocs'],
}

export default meta

const Template: StoryFn<typeof Ui3nDropFiles> = (args: Ui3nDropFilesProps) => ({
  components: { Ui3nDropFiles },
  setup() {
    const fileList = ref<string[]>([])
    const onSelect = (files: FileList) => {
      fileList.value = [...files].map(f => f.name)
      setTimeout(() => {
        fileList.value = []
      }, 3000)
    }
    return { args, fileList, onSelect }
  },
  template: `
    <ui3n-drop-files
      v-bind="args"
      @select="onSelect"
    >
      <div style="
        position: relative;
        width: 100%;
        height: 160px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #ccc;
      ">
        <div v-if="fileList.length">
          <h4>File(s) is (are) dropped (list will clean after 3 sec)</h4>
          <div
            v-for="name in fileList"
            :key="name"
          >
            {{ name }}
          </div>
        </div>
        <span v-else>Drop file(s) here!</span>
      </div>
    </ui3n-drop-files>`,
})

export const Default = Template.bind({})
Default.args = { 
  title: '12345',
}
