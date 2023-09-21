import * as $protobuf from "protobufjs";
import Long = require("long");
/** Namespace json_ipc. */
export namespace json_ipc {

    /** Properties of a ValuesSequence. */
    interface IValuesSequence {

        /** ValuesSequence values */
        values?: (json_ipc.ValuesSequence.IValue[]|null);
    }

    /** Represents a ValuesSequence. */
    class ValuesSequence implements IValuesSequence {

        /**
         * Constructs a new ValuesSequence.
         * @param [properties] Properties to set
         */
        constructor(properties?: json_ipc.IValuesSequence);

        /** ValuesSequence values. */
        public values: json_ipc.ValuesSequence.IValue[];

        /**
         * Creates a new ValuesSequence instance using the specified properties.
         * @param [properties] Properties to set
         * @returns ValuesSequence instance
         */
        public static create(properties?: json_ipc.IValuesSequence): json_ipc.ValuesSequence;

        /**
         * Encodes the specified ValuesSequence message. Does not implicitly {@link json_ipc.ValuesSequence.verify|verify} messages.
         * @param message ValuesSequence message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encode(message: json_ipc.IValuesSequence, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Encodes the specified ValuesSequence message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.verify|verify} messages.
         * @param message ValuesSequence message or plain object to encode
         * @param [writer] Writer to encode to
         * @returns Writer
         */
        public static encodeDelimited(message: json_ipc.IValuesSequence, writer?: $protobuf.Writer): $protobuf.Writer;

        /**
         * Decodes a ValuesSequence message from the specified reader or buffer.
         * @param reader Reader or buffer to decode from
         * @param [length] Message length if known beforehand
         * @returns ValuesSequence
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): json_ipc.ValuesSequence;

        /**
         * Decodes a ValuesSequence message from the specified reader or buffer, length delimited.
         * @param reader Reader or buffer to decode from
         * @returns ValuesSequence
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): json_ipc.ValuesSequence;

        /**
         * Verifies a ValuesSequence message.
         * @param message Plain object to verify
         * @returns `null` if valid, otherwise the reason why it is not
         */
        public static verify(message: { [k: string]: any }): (string|null);

        /**
         * Creates a ValuesSequence message from a plain object. Also converts values to their respective internal types.
         * @param object Plain object
         * @returns ValuesSequence
         */
        public static fromObject(object: { [k: string]: any }): json_ipc.ValuesSequence;

        /**
         * Creates a plain object from a ValuesSequence message. Also converts values to other types if specified.
         * @param message ValuesSequence
         * @param [options] Conversion options
         * @returns Plain object
         */
        public static toObject(message: json_ipc.ValuesSequence, options?: $protobuf.IConversionOptions): { [k: string]: any };

        /**
         * Converts this ValuesSequence to JSON.
         * @returns JSON object
         */
        public toJSON(): { [k: string]: any };

        /**
         * Gets the default type url for ValuesSequence
         * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns The default type url
         */
        public static getTypeUrl(typeUrlPrefix?: string): string;
    }

    namespace ValuesSequence {

        /** Properties of a BinaryValue. */
        interface IBinaryValue {

            /** BinaryValue arr */
            arr?: (Uint8Array|null);

            /** BinaryValue objLocation */
            objLocation?: (string[]|null);
        }

        /** Represents a BinaryValue. */
        class BinaryValue implements IBinaryValue {

            /**
             * Constructs a new BinaryValue.
             * @param [properties] Properties to set
             */
            constructor(properties?: json_ipc.ValuesSequence.IBinaryValue);

            /** BinaryValue arr. */
            public arr: Uint8Array;

            /** BinaryValue objLocation. */
            public objLocation: string[];

            /**
             * Creates a new BinaryValue instance using the specified properties.
             * @param [properties] Properties to set
             * @returns BinaryValue instance
             */
            public static create(properties?: json_ipc.ValuesSequence.IBinaryValue): json_ipc.ValuesSequence.BinaryValue;

            /**
             * Encodes the specified BinaryValue message. Does not implicitly {@link json_ipc.ValuesSequence.BinaryValue.verify|verify} messages.
             * @param message BinaryValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: json_ipc.ValuesSequence.IBinaryValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified BinaryValue message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.BinaryValue.verify|verify} messages.
             * @param message BinaryValue message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: json_ipc.ValuesSequence.IBinaryValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a BinaryValue message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns BinaryValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): json_ipc.ValuesSequence.BinaryValue;

            /**
             * Decodes a BinaryValue message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns BinaryValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): json_ipc.ValuesSequence.BinaryValue;

            /**
             * Verifies a BinaryValue message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a BinaryValue message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns BinaryValue
             */
            public static fromObject(object: { [k: string]: any }): json_ipc.ValuesSequence.BinaryValue;

            /**
             * Creates a plain object from a BinaryValue message. Also converts values to other types if specified.
             * @param message BinaryValue
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: json_ipc.ValuesSequence.BinaryValue, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this BinaryValue to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for BinaryValue
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a TransferredObj. */
        interface ITransferredObj {

            /** TransferredObj indexInPassed */
            indexInPassed?: (number|null);

            /** TransferredObj objLocation */
            objLocation?: (string[]|null);
        }

        /** Represents a TransferredObj. */
        class TransferredObj implements ITransferredObj {

            /**
             * Constructs a new TransferredObj.
             * @param [properties] Properties to set
             */
            constructor(properties?: json_ipc.ValuesSequence.ITransferredObj);

            /** TransferredObj indexInPassed. */
            public indexInPassed: number;

            /** TransferredObj objLocation. */
            public objLocation: string[];

            /**
             * Creates a new TransferredObj instance using the specified properties.
             * @param [properties] Properties to set
             * @returns TransferredObj instance
             */
            public static create(properties?: json_ipc.ValuesSequence.ITransferredObj): json_ipc.ValuesSequence.TransferredObj;

            /**
             * Encodes the specified TransferredObj message. Does not implicitly {@link json_ipc.ValuesSequence.TransferredObj.verify|verify} messages.
             * @param message TransferredObj message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: json_ipc.ValuesSequence.ITransferredObj, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified TransferredObj message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.TransferredObj.verify|verify} messages.
             * @param message TransferredObj message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: json_ipc.ValuesSequence.ITransferredObj, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a TransferredObj message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns TransferredObj
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): json_ipc.ValuesSequence.TransferredObj;

            /**
             * Decodes a TransferredObj message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns TransferredObj
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): json_ipc.ValuesSequence.TransferredObj;

            /**
             * Verifies a TransferredObj message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a TransferredObj message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns TransferredObj
             */
            public static fromObject(object: { [k: string]: any }): json_ipc.ValuesSequence.TransferredObj;

            /**
             * Creates a plain object from a TransferredObj message. Also converts values to other types if specified.
             * @param message TransferredObj
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: json_ipc.ValuesSequence.TransferredObj, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this TransferredObj to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for TransferredObj
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }

        /** Properties of a Value. */
        interface IValue {

            /** Value json */
            json?: (string|null);

            /** Value binaryInJson */
            binaryInJson?: (json_ipc.ValuesSequence.IBinaryValue[]|null);

            /** Value transferredInJson */
            transferredInJson?: (json_ipc.ValuesSequence.ITransferredObj[]|null);

            /** Value arr */
            arr?: (json_ipc.ValuesSequence.IBinaryValue|null);

            /** Value transferred */
            transferred?: (json_ipc.ValuesSequence.ITransferredObj|null);
        }

        /** Represents a Value. */
        class Value implements IValue {

            /**
             * Constructs a new Value.
             * @param [properties] Properties to set
             */
            constructor(properties?: json_ipc.ValuesSequence.IValue);

            /** Value json. */
            public json: string;

            /** Value binaryInJson. */
            public binaryInJson: json_ipc.ValuesSequence.IBinaryValue[];

            /** Value transferredInJson. */
            public transferredInJson: json_ipc.ValuesSequence.ITransferredObj[];

            /** Value arr. */
            public arr?: (json_ipc.ValuesSequence.IBinaryValue|null);

            /** Value transferred. */
            public transferred?: (json_ipc.ValuesSequence.ITransferredObj|null);

            /**
             * Creates a new Value instance using the specified properties.
             * @param [properties] Properties to set
             * @returns Value instance
             */
            public static create(properties?: json_ipc.ValuesSequence.IValue): json_ipc.ValuesSequence.Value;

            /**
             * Encodes the specified Value message. Does not implicitly {@link json_ipc.ValuesSequence.Value.verify|verify} messages.
             * @param message Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encode(message: json_ipc.ValuesSequence.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.Value.verify|verify} messages.
             * @param message Value message or plain object to encode
             * @param [writer] Writer to encode to
             * @returns Writer
             */
            public static encodeDelimited(message: json_ipc.ValuesSequence.IValue, writer?: $protobuf.Writer): $protobuf.Writer;

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @param reader Reader or buffer to decode from
             * @param [length] Message length if known beforehand
             * @returns Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decode(reader: ($protobuf.Reader|Uint8Array), length?: number): json_ipc.ValuesSequence.Value;

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @param reader Reader or buffer to decode from
             * @returns Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            public static decodeDelimited(reader: ($protobuf.Reader|Uint8Array)): json_ipc.ValuesSequence.Value;

            /**
             * Verifies a Value message.
             * @param message Plain object to verify
             * @returns `null` if valid, otherwise the reason why it is not
             */
            public static verify(message: { [k: string]: any }): (string|null);

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @param object Plain object
             * @returns Value
             */
            public static fromObject(object: { [k: string]: any }): json_ipc.ValuesSequence.Value;

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @param message Value
             * @param [options] Conversion options
             * @returns Plain object
             */
            public static toObject(message: json_ipc.ValuesSequence.Value, options?: $protobuf.IConversionOptions): { [k: string]: any };

            /**
             * Converts this Value to JSON.
             * @returns JSON object
             */
            public toJSON(): { [k: string]: any };

            /**
             * Gets the default type url for Value
             * @param [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns The default type url
             */
            public static getTypeUrl(typeUrlPrefix?: string): string;
        }
    }
}
