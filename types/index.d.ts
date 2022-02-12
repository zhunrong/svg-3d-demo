import { VueConstructor, PluginObject } from 'vue';

type ComponentType = VueConstructor & PluginObject<void>;

declare const plugin: ComponentType;

export default plugin;
