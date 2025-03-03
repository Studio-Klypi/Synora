import type { LocaleMessage, LocaleMessageValue, RemoveIndexSignature } from "@intlify/core-base";
import type { ComposerTranslation, VueMessageType } from "vue-i18n";

export type I18nTools = ComposerTranslation<{
  fr: LocaleMessage<VueMessageType>;
}, "fr", RemoveIndexSignature<{
    [p: string]: LocaleMessageValue<VueMessageType>;
  }>, never, string, string>;
