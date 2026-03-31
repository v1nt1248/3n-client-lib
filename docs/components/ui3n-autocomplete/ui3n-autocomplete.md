<script setup lang="ts">
import { data } from '../component.data.ts';
const componentMeta = data.find(c => c.name === 'ui3n-autocomplete');
</script>

# Ui3nAutocomplete

<ComponentDoc :props="componentMeta.props" :events="componentMeta.events" :slots="componentMeta.slots" :exposes="componentMeta.exposes" />
