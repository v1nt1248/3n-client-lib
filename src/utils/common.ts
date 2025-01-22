import isEmpty from 'lodash/isEmpty';

export function getRandomId(numOfChars: number): string {
  if (numOfChars < 1) {
    throw new Error(`number of chars is less than one`);
  }

  const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const array = new Uint8Array(numOfChars * 2);
  crypto.getRandomValues(array);
  let result = '';
  for (let i = 0; i < array.length; i++) {
    result += possibleCharacters.charAt(array[i] % 62);
  }
  return result.slice(0, numOfChars);
}

export function getDeliveryErrors(progress: web3n.asmail.DeliveryProgress) {
  const { recipients } = progress;
  return Object.keys(recipients).reduce(
    (res, recipient) => {
      const { err } = recipients[recipient];
      if (!isEmpty(err) && 'runtimeException' in err) {
        const { type } = err;
        res[recipient] = type!;
      }
      return res;
    },
    {} as Record<string, string>,
  );
}

export async function transformFileToWeb3NFile(file: File): Promise<web3n.files.File | undefined> {
  const { path } = file as File & { path: string };
  const fsItemCollection = await w3n.storage!.getSysFS!('device', path);
  const { isFile, item } = fsItemCollection;
  return isFile && item ? (item as web3n.files.File) : undefined;
}

export function markSearch(str: string, search: string): string {
  if (!str) return '';

  if (search) {
    const regex = new RegExp(`(${search.split(' ').join('|')})`, 'gi');
    // @ts-ignore
    return str.replace(regex, (match, group) => `<span class="match-search">${group}</span>`);
  }

  const regex = new RegExp(String.fromCharCode(160), 'g');
  return str.replace(regex, ' ');
}

/**
 * Rounding with a given accuracy
 * @param num {number}
 * @param precision {number} - rounding accuracy (number of digits after the decimal point
 * indicated with the "-" sign)
 * @return {number}
 */
export function round(num: number, precision: number): number {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let tmpNum = num.toString().split('e') as any;
  tmpNum = Math.round(+(tmpNum[0] + 'e' + (tmpNum[1] ? +tmpNum[1] - precision : -precision)));
  tmpNum = tmpNum.toString().split('e');
  return +(tmpNum[0] + 'e' + (tmpNum[1] ? +tmpNum[1] - +precision : precision));
}
