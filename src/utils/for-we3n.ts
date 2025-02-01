import isEmpty from 'lodash/isEmpty';

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
