<script setup lang="ts">
import { data } from '../component.data.ts';
const badgeMeta = data.find(c => c.name === 'ui3n-badge');
</script>

# Ui3nBadge

<ComponentDoc :props="badgeMeta.props" :events="badgeMeta.events" :slots="badgeMeta.slots" :exposes="badgeMeta.exposes" />
