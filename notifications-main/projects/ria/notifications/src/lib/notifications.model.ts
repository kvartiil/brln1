import { VeeraGlobalNotificationType } from '@ria/ria-components/dist/types/components/veera-global-notification/veera-global-notification';

export interface GlobalNotification {
  uuid: string;
  title?: string;
  type: VeeraGlobalNotificationType;
  visible: boolean;
  visibleFrom: string;
  visibleTo: string;
  content: string;
  lang?: string;
}
