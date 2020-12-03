export function Override(target: {}, key: string, descriptor: PropertyDescriptor): PropertyDescriptor {
	const originalMethod = descriptor.value;
	// tslint:disable-next-line: typedef
	descriptor.value = function() {
		return Promise.resolve(originalMethod.apply(this, arguments));
	};
	descriptor.writable = false;
	descriptor.enumerable = false;
	descriptor.configurable = false;
	return descriptor;
}
