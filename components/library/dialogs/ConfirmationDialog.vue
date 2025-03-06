<script setup lang="ts">
import { LoaderCircle } from "lucide-vue-next";

const props = withDefaults(defineProps<{
  open: boolean;
  loading: boolean;
  title?: string;
  caption?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action?: () => Promise<any>;
}>(), {
  title: "dialogs.confirmation.title",
  caption: "dialogs.confirmation.description",
});
const emit = defineEmits<{
  "confirmed": [];
  "update:open": [boolean];
}>();

async function confirm() {
  if (props.action) await props.action();
  emit("confirmed");
}
</script>

<template>
  <AlertDialog :open="open">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ $t(props.title) }}</AlertDialogTitle>
        <AlertDialogDescription>{{ $t(props.caption) }}</AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="emit('update:open', false)">
          {{ $t("btn.cancel") }}
        </AlertDialogCancel>
        <AlertDialogAction as-child>
          <Button
            :disabled="loading"
            @click="confirm"
          >
            <LoaderCircle
              v-if="loading"
              class="animate-spin"
            />
            {{ $t("btn.confirm") }}
          </Button>
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
