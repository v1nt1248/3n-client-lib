/*
 Copyright (C) 2016 - 2018 3NSoft Inc.
 
 This program is free software: you can redistribute it and/or modify it under
 the terms of the GNU General Public License as published by the Free Software
 Foundation, either version 3 of the License, or (at your option) any later
 version.
 
 This program is distributed in the hope that it will be useful, but
 WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 See the GNU General Public License for more details.
 
 You should have received a copy of the GNU General Public License along with
 this program. If not, see <http://www.gnu.org/licenses/>.
*/


/**
 * This function creates a copy of json entity with a caveat that Buffer and
 * byte arrays are shared between original and a copy.
 * @param orig is an object, which copy is created. Buffer and byte arrays
 * passed through like primitives.
 * @param excludeTopFields is an optional list of fields to exclude from copy.
 */
export function copyJSON<T>(orig: T, excludeTopFields?: string[]): T {
	const origType = typeof orig;
	if (origType !== 'object') {
		return ((origType !== 'function') ? orig : (undefined as any));
	}
	if (orig === null) { return (null as any); }
	if (ArrayBuffer.isView(orig)) { return (orig as any); }
	if (Array.isArray(orig)) {
		const arr: any[] = orig;
		const c: any[] = [];
		for (let i=0; i < arr.length; i+=1) {
			c[i] = copyJSON(arr[i]);
		}
		return (c as any);
	} else {
		const c = ({} as T);
		const fields = Object.keys(orig!);
		if (excludeTopFields) {
			for (const f of fields) {
				if (excludeTopFields.includes(f)) { continue; }
				(c as any)[f] = copyJSON<any>((orig as any)[f]);
			}
		} else {
			for (const f of fields) {
				(c as any)[f] = copyJSON<any>((orig as any)[f]);
			}
		}
		return c;
	}
}
