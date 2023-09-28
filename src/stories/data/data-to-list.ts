/* eslint-disable @typescript-eslint/no-explicit-any */
export function prepareList() {
  const res: {
    id: string;
    title: string;
    children: {
      id: string;
      title: string;
    }[];
  }[] = []
  for (let i = 0; i < 26; i++) {
    const char = String.fromCharCode(65 + i)
    res.push({
      id: char,
      title: `${char} title`,
      children: [
        { id: `${char}-01`, title: `01 ${char} item` },
        { id: `${char}-02`, title: `02 ${char} item` },
        { id: `${char}-03`, title: `03 ${char} item` },
        { id: `${char}-04`, title: `03 ${char} item` },
        { id: `${char}-05`, title: `03 ${char} item` },
      ],
    })
  }
  return res
}