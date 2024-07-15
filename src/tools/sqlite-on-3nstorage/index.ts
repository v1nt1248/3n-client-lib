/*
 Copyright (C) 2022 3NSoft Inc.

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
import initSqljs from './sqljs';
import { Database as DBClass, BindParams as QueryParams, QueryExecResult as QueryResult } from './types';
import { SingleProc, Action } from './synced';

export type Database = DBClass;
export type BindParams = QueryParams;
export type QueryExecResult = QueryResult;

type WritableFile = web3n.files.WritableFile;
type ReadonlyFile = web3n.files.ReadonlyFile;
type FileException = web3n.files.FileException;

export interface SaveOpts {
  skipUpload?: boolean;
}

export abstract class SQLiteOn3NStorage {

  protected readonly syncProc = new SingleProc();

  protected constructor(
    protected readonly database: Database,
    protected readonly file: WritableFile,
  ) {}

  static async makeAndStart(file: WritableFile): Promise<SQLiteOn3NStorage> {
    const SQL = await initSqljs(true);
    const fileContent = await readFileContent(file);
    const db = new SQL.Database(fileContent) as Database;
    let sqlite: SQLiteOn3NStorage;
    if (file.v?.sync) {
      sqlite = new SQLiteOnSyncedFS(db, file);
    } else if (file.v) {
      sqlite = new SQLiteOnLocalFS(db, file);
    } else {
      sqlite = new SQLiteOnDeviceFS(db, file);
    }
    await sqlite.start();
    return sqlite;
  }

  private async start(): Promise<void> {
    // XXX add listening process(es)
  }

  async saveToFile(_opts?: SaveOpts): Promise<void> {
    await this.syncProc.startOrChain(async () => {
      const dbFileContent = this.database.export();
      await this.file.writeBytes(dbFileContent);
    });
  }

  get db(): Database {
    return this.database;
  }

  sync<T>(action: Action<T>): Promise<T> {
    return this.syncProc.startOrChain(action);
  }

  listTables(): string[] {
    const result = this.database.exec(
      `SELECT tbl_name FROM sqlite_schema WHERE type='table' AND name NOT LIKE 'sqlite_%'`,
    );
    return ((result.length > 0) ?
        result[0].values.map(row => row[0] as string) :
        []
    );
  }

}

Object.freeze(SQLiteOn3NStorage.prototype);
Object.freeze(SQLiteOn3NStorage);


class SQLiteOnSyncedFS extends SQLiteOn3NStorage {

  constructor(db: Database, file: WritableFile) {
    super(db, file);
    Object.seal(this);
  }

  async saveToFile(opts?: SaveOpts): Promise<void> {
    await super.saveToFile();
    if (opts?.skipUpload) {
      return;
    } else {
      await this.file.v!.sync!.upload();
    }
  }

}

Object.freeze(SQLiteOnSyncedFS.prototype);
Object.freeze(SQLiteOnSyncedFS);


class SQLiteOnLocalFS extends SQLiteOn3NStorage {

  constructor(db: Database, file: WritableFile) {
    super(db, file);
    Object.seal(this);
  }

}

Object.freeze(SQLiteOnLocalFS.prototype);
Object.freeze(SQLiteOnLocalFS);


class SQLiteOnDeviceFS extends SQLiteOn3NStorage {

  constructor(db: Database, file: WritableFile) {
    super(db, file);
    Object.seal(this);
  }

}

Object.freeze(SQLiteOnDeviceFS.prototype);
Object.freeze(SQLiteOnDeviceFS);


async function readFileContent(
  file: ReadonlyFile,
): Promise<Uint8Array | undefined> {
  try {
    return await file.readBytes();
  } catch (exc) {
    if ((exc as FileException).notFound) {
      return undefined;
    } else {
      throw exc;
    }
  }
}

export function objectFromQueryExecResult<T>(
  sqlResult: QueryExecResult,
): Array<T> {
  const { columns, values: rows } = sqlResult;
  return rows.map(row => row.reduce((obj, cellValue, index) => {
    const field = columns[index] as keyof T;
    obj[field] = cellValue as any;
    return obj;
  }, {} as T));
}

export class TableColumnsAndParams<ColumnDefs extends object> {

  public readonly c: { [columnName in keyof ColumnDefs]: string; };
  public readonly cReversed: { [snakedColName: string]: keyof ColumnDefs; };
  public readonly p: { [columnName in keyof ColumnDefs]: string; };
  public readonly q: { [columnName in keyof ColumnDefs]: string; };

  constructor(
    public readonly name: string,
    private readonly columnDefs: ColumnDefs,
  ) {
    this.c = {} as this['c'];
    this.cReversed = {} as this['cReversed'];
    this.p = {} as this['p'];
    this.q = {} as this['q'];
    for (const cName of Object.keys(this.columnDefs)) {
      const snakedColName = toSnakeCaseName(cName);
      this.c[cName as keyof ColumnDefs] = snakedColName;
      this.cReversed[snakedColName] = cName as keyof ColumnDefs;
      this.p[cName as keyof ColumnDefs] = `$${cName}`;
      this.q[cName as keyof ColumnDefs] = `${this.name}.${snakedColName}`;
    }
    Object.freeze(this.c);
    Object.freeze(this.p);
    Object.freeze(this.q);
  }

  private toC(cName: string): string {
    const snakedColName = this.c[cName as keyof ColumnDefs];
    if (snakedColName === undefined) {
      throw new Error(`Column ${cName} is not found among columns of table ${this.name}`);
    }
    return snakedColName;
  }

  toParams<T extends { [columnName in keyof ColumnDefs]: any; }>(
    value: Partial<T>, _throwOnUnknownField = true,
  ): any {
    const params = {} as any;
    for (const [cName, columnValue] of Object.entries(value)) {
      this.toC(cName);	// does implicit check for column existence
      params[this.p[cName as keyof ColumnDefs]] = columnValue;
    }
    for (const paramName of Object.values(this.p)) {
      if (params[paramName as string] === undefined) {
        params[paramName as string] = null;
      }
    }
    return params;
  }

  getFromQueryExecResult<T>(
    sqlResult: QueryExecResult,
  ): Array<T> {
    const { columns, values: rows } = sqlResult;
    return rows.map(row => row.reduce((obj, cellValue, index) => {
      const tabColumn = columns[index];
      let field = this.cReversed[tabColumn as string];
      if (field === undefined) {
        field = tabColumn as keyof ColumnDefs;
      }
      obj[field as string as keyof T] = cellValue as any;
      return obj;
    }, {} as T));
  }

  get insertQuery(): string {
    const colAndParamNames = Object.entries(this.p);
    return `INSERT INTO ${this.name} (${
			colAndParamNames.map(([cName]) => this.toC(cName)).join(', ')
		}) VALUES (${
			colAndParamNames.map(([_n, colParam]) => colParam).join(', ')
		})`;
  }

  updateQuery(
    withTabName: boolean,
    columns: (keyof ColumnDefs)[] | undefined = undefined,
    skipColumns = false,
  ): string {
    let colAndParamNames = Object.entries(this.p);
    if (columns) {
      if (skipColumns) {
        colAndParamNames = colAndParamNames.filter(
          ([cName]) => !columns.includes(cName as keyof ColumnDefs),
        );
      } else {
        colAndParamNames = colAndParamNames.filter(
          ([cName]) => columns.includes(cName as keyof ColumnDefs),
        );
      }
    }
    return `UPDATE ${withTabName ? `${this.name} ` : ''}SET ${
      colAndParamNames
        .map(([cName, pName]) => `${this.toC(cName)}=${pName}`)
        .join(', ')
    }`;
  }

  get columnsCreateSection(): string {
    return Object.entries(this.columnDefs)
      .map(([cName, columnDef]) => `${this.toC(cName)} ${columnDef}`)
      .join(`,\n`);
  }

  selectQuery(
    columnsToSelect: (keyof ColumnDefs)[] | string,
    ...whereAndColEqual: (keyof ColumnDefs)[]
  ): string {
    const whereClause = (whereAndColEqual.length > 0) ?
      ` WHERE ${
        (whereAndColEqual as string[]).map(n => `${n}=$${n}`).join(' AND ')
      }` : '';
    return `SELECT ${(typeof columnsToSelect === 'string') ?
			this.toC(columnsToSelect) :
			columnsToSelect.map(cName => this.toC(cName as string)).join(', ')
		} FROM ${this.name}${whereClause}`;
  }

}

Object.freeze(TableColumnsAndParams.prototype);
Object.freeze(TableColumnsAndParams);


function toSnakeCaseName(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}
