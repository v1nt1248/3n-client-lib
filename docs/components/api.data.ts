import { parse } from 'vue-docgen-api';
import path from 'path';

export default {
  async load() {
    // Здесь можно прописать логику обхода ваших папок и парсинга
    // Например, для конкретного компонента:
    const componentPath = path.resolve(__dirname, '../../src/components/ui3n-badge/ui3n-badge.vue');
    const metadata = await parse(componentPath);
    return {
      props: metadata.props,
      slots: metadata.slots,
      events: metadata.events,
    };
  },
};
