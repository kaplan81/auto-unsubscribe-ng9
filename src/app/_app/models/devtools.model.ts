export interface DevTools {
  isOpen: boolean;
  orientation: DevToolsOrientation;
}

export type DevToolsOrientation = 'vertical' | 'horizontal' | undefined;
