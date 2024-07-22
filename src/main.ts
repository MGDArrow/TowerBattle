import { createApp } from 'vue';
import App from '@/App.vue';
import '@/assets/styles.scss';

import { router } from '@/router/router';

import VIcon from '@/components/UI/VIcon.vue';
import VButton from '@/components/UI/VButton.vue';
import VInput from '@/components/UI/VInput.vue';
import VCheckbox from '@/components/UI/VCheckbox.vue';
import VPopup from '@/components/UI/VPopup.vue';

createApp(App)
  .component('VIcon', VIcon)
  .component('VButton', VButton)
  .component('VInput', VInput)
  .component('VCheckbox', VCheckbox)
  .component('VPopup', VPopup)
  .use(router)
  .mount('#app');
