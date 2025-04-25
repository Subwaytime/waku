import { setupDevToolsPlugin } from '@vue/devtools-api'
import type { App } from 'vue'
import type { Waku } from './core'

export function setupWakuDevtools(app: App, waku: Waku): any {
    if (process.env.NODE_ENV !== 'development') return

    setupDevToolsPlugin(
        {
            id: 'waku-devtools',
            label: 'Waku',
            packageName: 'waku',
            app,
            enableEarlyProxy: true,
        },
        (api) => {
            api.addInspector({
                id: 'waku-inspector',
                label: 'Components by Waku',
                icon: 'view_module',
            })

            api.on.getInspectorTree((payload) => {
                if (payload.inspectorId === 'waku-inspector') {
                    if(!waku.items) {
                        return;
                    }

                    payload.rootNodes = waku.items.map((item) => ({
                        id: item.id,
                        label: item.label,
                    }));
                }
            });

            waku.internal.on('add', () => {
                api.sendInspectorTree('waku-inspector');
                api.sendInspectorState('waku-inspector');
            });

            waku.internal.on('remove', () => {
                api.sendInspectorTree('waku-inspector');
                api.sendInspectorState('waku-inspector');
            });
        }
    )
}
