<script setup lang="ts">
  import { ref, watch } from 'vue';
  import Ui3nTimePicker from '@/components/ui3n-date-time/ui3n-time-picker.vue';
  import Ui3nDatePicker from '@/components/ui3n-date-time/ui3n-date-picker.vue';
  import Ui3nInputTime from '@/components/ui3n-input-time/ui3n-input-time.vue';
  import Ui3nInputDate from '@/components/ui3n-input-date/ui3n-input-date.vue';
  import type { Ui3nTimePickerConfig } from '@/components/ui3n-date-time/types';
  import DemoLayout from './demo-layout.vue';
  import DemoLayoutCell from './demo-layout-cell.vue';

  const defaultConfig: Ui3nTimePickerConfig = {};
  const withSecondsConfig: Ui3nTimePickerConfig = { showSeconds: true };
  const twelveHourConfig: Ui3nTimePickerConfig = { hourFormat: '12' };
  const twelveHourWithSecondsConfig: Ui3nTimePickerConfig = { hourFormat: '12', showSeconds: true };
  const minuteSecondConfig: Ui3nTimePickerConfig = { showHours: false, showMinutes: true, showSeconds: true };
  const noLeadingZerosConfig: Ui3nTimePickerConfig = { leadingZeros: false, showSeconds: true };

  const vDefault = ref<string | null>('22:32');
  const vSeconds = ref<string | null>('22:32:12');
  const vTwelveHour = ref<string | null>('07:33 PM');
  const vTwelveHourSeconds = ref<string | null>('07:33:13 PM');
  const vMinuteSecond = ref<string | null>('33:13');
  const vNoLeadingZeros = ref<string | null>('8:5:3');
  const vCustomSteps = ref<string | null>('22:32:10');

  const vDate = ref<Date | null>(null);
  const vInputDate = ref<Date | null>(null);
  const vInputDateTime = ref<Date | null>(null);

  watch(
    [vDefault, vSeconds, vTwelveHour, vTwelveHourSeconds, vMinuteSecond, vNoLeadingZeros, vCustomSteps],
    () => {
      console.log('[Ui3nTimePicker] values', {
        vDefault: vDefault.value,
        vSeconds: vSeconds.value,
        vTwelveHour: vTwelveHour.value,
        vTwelveHourSeconds: vTwelveHourSeconds.value,
        vMinuteSecond: vMinuteSecond.value,
        vNoLeadingZeros: vNoLeadingZeros.value,
        vCustomSteps: vCustomSteps.value,
      });
    },
  );

  watch(vDate, () => {
    console.log('[Ui3nDatePicker] value] => ', vDate.value);
  });

  watch(vInputDate, () => {
    console.log('[Ui3nInputDate] a date value] => ', vInputDate.value);
  });

  watch(vInputDateTime, () => {
    console.log('[Ui3nInputDate] a date and time value] => ', vInputDateTime.value);
  });
</script>

<template>
  <demo-layout title="Ui3nTimePicker">
    <div class="demo__body-grid">
      <demo-layout-cell label="Configurations">
        <div class="cell">
          <ui3n-time-picker
            v-model="vDefault"
            :config="defaultConfig"
          />
        </div>

        <div class="cell">
          <ui3n-time-picker
            v-model="vSeconds"
            :config="withSecondsConfig"
          />
        </div>

        <div class="cell">
          <ui3n-time-picker
            v-model="vTwelveHour"
            :config="twelveHourConfig"
          />
        </div>

        <div class="cell">
          <ui3n-time-picker
            v-model="vTwelveHourSeconds"
            :config="twelveHourWithSecondsConfig"
            size="large"
          />
        </div>

        <div class="cell">
          <ui3n-time-picker
            v-model="vMinuteSecond"
            :config="minuteSecondConfig"
          />
        </div>

        <div class="cell">
          <ui3n-time-picker
            v-model="vNoLeadingZeros"
            :config="noLeadingZerosConfig"
          />
        </div>

        <div class="cell">
          <ui3n-time-picker
            v-model="vCustomSteps"
            :config="withSecondsConfig"
            :minute-step="1"
            :second-step="5"
          />
        </div>

        <div class="cell">
          <ui3n-date-picker
            v-model="vDate"
            show-timepicker
          />
        </div>

        <div class="cell">
          <ui3n-input-time
            v-model="vDefault"
            label="Current time"
            placeholder="HH:mm"
          />
        </div>

        <div class="cell">
          <ui3n-input-time
            v-model="vSeconds"
            label="Time with seconds"
            :config="withSecondsConfig"
            placeholder="HH:mm:ss"
          />
        </div>

        <div class="cell">
          <ui3n-input-time
            v-model="vTwelveHour"
            label="12-hour time"
            :config="twelveHourConfig"
            placeholder="hh:mm A"
          />
        </div>

        <div class="cell">
          <ui3n-input-date
            v-model="vInputDate"
            label="Date"
            placeholder="YYYY-MM-DD"
          />
        </div>

        <div class="cell">
          <ui3n-input-date
            v-model="vInputDateTime"
            label="Date + time"
            show-timepicker
            placeholder="YYYY-MM-DD HH:mm"
          />
        </div>
      </demo-layout-cell>
    </div>
  </demo-layout>
</template>

<style lang="scss" scoped>
  .cell {
    position: relative;
    width: 280px;
  }

  .cell1 {
    position: relative;
    width: 400px;
  }
</style>
