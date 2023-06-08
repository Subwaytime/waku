import { render } from 'vue';
import { useMountable } from './service';
import { removeComments, removeElement } from './utils';

/**
 * Remove an Element from DOM
 * @param element
 */

export function destroy(element: HTMLElement) {
	const service = useMountable();

    removeElement(element);

	if (service.elements.value.includes(element)) {
		service.elements.value = service.elements.value.filter((el: HTMLElement) => el != element);
	}

	removeComments(service.instance._container);
	render(null, element);
}

/**
 * Remove all added Elements from DOM
 */

export function destroyAll() {
	const service = useMountable();

	service.elements.value.forEach((element: any) => {
        removeElement(element);
		removeComments(service.instance._container);
		render(null, element);
	});

	service.elements.value.length = 0;
}
