interface StringFilterFn {
	fn(file: string): boolean;
	expect: boolean;
}

interface String {
	filter(...fns: StringFilterFn[]): boolean;
}
