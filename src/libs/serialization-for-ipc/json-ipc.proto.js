/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.json_ipc = (function() {

    /**
     * Namespace json_ipc.
     * @exports json_ipc
     * @namespace
     */
    var json_ipc = {};

    json_ipc.ValuesSequence = (function() {

        /**
         * Properties of a ValuesSequence.
         * @memberof json_ipc
         * @interface IValuesSequence
         * @property {Array.<json_ipc.ValuesSequence.IValue>|null} [values] ValuesSequence values
         */

        /**
         * Constructs a new ValuesSequence.
         * @memberof json_ipc
         * @classdesc Represents a ValuesSequence.
         * @implements IValuesSequence
         * @constructor
         * @param {json_ipc.IValuesSequence=} [properties] Properties to set
         */
        function ValuesSequence(properties) {
            this.values = [];
            if (properties)
                for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                    if (properties[keys[i]] != null)
                        this[keys[i]] = properties[keys[i]];
        }

        /**
         * ValuesSequence values.
         * @member {Array.<json_ipc.ValuesSequence.IValue>} values
         * @memberof json_ipc.ValuesSequence
         * @instance
         */
        ValuesSequence.prototype.values = $util.emptyArray;

        /**
         * Creates a new ValuesSequence instance using the specified properties.
         * @function create
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {json_ipc.IValuesSequence=} [properties] Properties to set
         * @returns {json_ipc.ValuesSequence} ValuesSequence instance
         */
        ValuesSequence.create = function create(properties) {
            return new ValuesSequence(properties);
        };

        /**
         * Encodes the specified ValuesSequence message. Does not implicitly {@link json_ipc.ValuesSequence.verify|verify} messages.
         * @function encode
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {json_ipc.IValuesSequence} message ValuesSequence message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValuesSequence.encode = function encode(message, writer) {
            if (!writer)
                writer = $Writer.create();
            if (message.values != null && message.values.length)
                for (var i = 0; i < message.values.length; ++i)
                    $root.json_ipc.ValuesSequence.Value.encode(message.values[i], writer.uint32(/* id 1, wireType 2 =*/10).fork()).ldelim();
            return writer;
        };

        /**
         * Encodes the specified ValuesSequence message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.verify|verify} messages.
         * @function encodeDelimited
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {json_ipc.IValuesSequence} message ValuesSequence message or plain object to encode
         * @param {$protobuf.Writer} [writer] Writer to encode to
         * @returns {$protobuf.Writer} Writer
         */
        ValuesSequence.encodeDelimited = function encodeDelimited(message, writer) {
            return this.encode(message, writer).ldelim();
        };

        /**
         * Decodes a ValuesSequence message from the specified reader or buffer.
         * @function decode
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @param {number} [length] Message length if known beforehand
         * @returns {json_ipc.ValuesSequence} ValuesSequence
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValuesSequence.decode = function decode(reader, length) {
            if (!(reader instanceof $Reader))
                reader = $Reader.create(reader);
            var end = length === undefined ? reader.len : reader.pos + length, message = new $root.json_ipc.ValuesSequence();
            while (reader.pos < end) {
                var tag = reader.uint32();
                switch (tag >>> 3) {
                case 1: {
                        if (!(message.values && message.values.length))
                            message.values = [];
                        message.values.push($root.json_ipc.ValuesSequence.Value.decode(reader, reader.uint32()));
                        break;
                    }
                default:
                    reader.skipType(tag & 7);
                    break;
                }
            }
            return message;
        };

        /**
         * Decodes a ValuesSequence message from the specified reader or buffer, length delimited.
         * @function decodeDelimited
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
         * @returns {json_ipc.ValuesSequence} ValuesSequence
         * @throws {Error} If the payload is not a reader or valid buffer
         * @throws {$protobuf.util.ProtocolError} If required fields are missing
         */
        ValuesSequence.decodeDelimited = function decodeDelimited(reader) {
            if (!(reader instanceof $Reader))
                reader = new $Reader(reader);
            return this.decode(reader, reader.uint32());
        };

        /**
         * Verifies a ValuesSequence message.
         * @function verify
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {Object.<string,*>} message Plain object to verify
         * @returns {string|null} `null` if valid, otherwise the reason why it is not
         */
        ValuesSequence.verify = function verify(message) {
            if (typeof message !== "object" || message === null)
                return "object expected";
            if (message.values != null && message.hasOwnProperty("values")) {
                if (!Array.isArray(message.values))
                    return "values: array expected";
                for (var i = 0; i < message.values.length; ++i) {
                    var error = $root.json_ipc.ValuesSequence.Value.verify(message.values[i]);
                    if (error)
                        return "values." + error;
                }
            }
            return null;
        };

        /**
         * Creates a ValuesSequence message from a plain object. Also converts values to their respective internal types.
         * @function fromObject
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {Object.<string,*>} object Plain object
         * @returns {json_ipc.ValuesSequence} ValuesSequence
         */
        ValuesSequence.fromObject = function fromObject(object) {
            if (object instanceof $root.json_ipc.ValuesSequence)
                return object;
            var message = new $root.json_ipc.ValuesSequence();
            if (object.values) {
                if (!Array.isArray(object.values))
                    throw TypeError(".json_ipc.ValuesSequence.values: array expected");
                message.values = [];
                for (var i = 0; i < object.values.length; ++i) {
                    if (typeof object.values[i] !== "object")
                        throw TypeError(".json_ipc.ValuesSequence.values: object expected");
                    message.values[i] = $root.json_ipc.ValuesSequence.Value.fromObject(object.values[i]);
                }
            }
            return message;
        };

        /**
         * Creates a plain object from a ValuesSequence message. Also converts values to other types if specified.
         * @function toObject
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {json_ipc.ValuesSequence} message ValuesSequence
         * @param {$protobuf.IConversionOptions} [options] Conversion options
         * @returns {Object.<string,*>} Plain object
         */
        ValuesSequence.toObject = function toObject(message, options) {
            if (!options)
                options = {};
            var object = {};
            if (options.arrays || options.defaults)
                object.values = [];
            if (message.values && message.values.length) {
                object.values = [];
                for (var j = 0; j < message.values.length; ++j)
                    object.values[j] = $root.json_ipc.ValuesSequence.Value.toObject(message.values[j], options);
            }
            return object;
        };

        /**
         * Converts this ValuesSequence to JSON.
         * @function toJSON
         * @memberof json_ipc.ValuesSequence
         * @instance
         * @returns {Object.<string,*>} JSON object
         */
        ValuesSequence.prototype.toJSON = function toJSON() {
            return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
        };

        /**
         * Gets the default type url for ValuesSequence
         * @function getTypeUrl
         * @memberof json_ipc.ValuesSequence
         * @static
         * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
         * @returns {string} The default type url
         */
        ValuesSequence.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
            if (typeUrlPrefix === undefined) {
                typeUrlPrefix = "type.googleapis.com";
            }
            return typeUrlPrefix + "/json_ipc.ValuesSequence";
        };

        ValuesSequence.BinaryValue = (function() {

            /**
             * Properties of a BinaryValue.
             * @memberof json_ipc.ValuesSequence
             * @interface IBinaryValue
             * @property {Uint8Array|null} [arr] BinaryValue arr
             * @property {Array.<string>|null} [objLocation] BinaryValue objLocation
             */

            /**
             * Constructs a new BinaryValue.
             * @memberof json_ipc.ValuesSequence
             * @classdesc Represents a BinaryValue.
             * @implements IBinaryValue
             * @constructor
             * @param {json_ipc.ValuesSequence.IBinaryValue=} [properties] Properties to set
             */
            function BinaryValue(properties) {
                this.objLocation = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * BinaryValue arr.
             * @member {Uint8Array} arr
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @instance
             */
            BinaryValue.prototype.arr = $util.newBuffer([]);

            /**
             * BinaryValue objLocation.
             * @member {Array.<string>} objLocation
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @instance
             */
            BinaryValue.prototype.objLocation = $util.emptyArray;

            /**
             * Creates a new BinaryValue instance using the specified properties.
             * @function create
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {json_ipc.ValuesSequence.IBinaryValue=} [properties] Properties to set
             * @returns {json_ipc.ValuesSequence.BinaryValue} BinaryValue instance
             */
            BinaryValue.create = function create(properties) {
                return new BinaryValue(properties);
            };

            /**
             * Encodes the specified BinaryValue message. Does not implicitly {@link json_ipc.ValuesSequence.BinaryValue.verify|verify} messages.
             * @function encode
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {json_ipc.ValuesSequence.IBinaryValue} message BinaryValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BinaryValue.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.arr != null && Object.hasOwnProperty.call(message, "arr"))
                    writer.uint32(/* id 1, wireType 2 =*/10).bytes(message.arr);
                if (message.objLocation != null && message.objLocation.length)
                    for (var i = 0; i < message.objLocation.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.objLocation[i]);
                return writer;
            };

            /**
             * Encodes the specified BinaryValue message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.BinaryValue.verify|verify} messages.
             * @function encodeDelimited
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {json_ipc.ValuesSequence.IBinaryValue} message BinaryValue message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            BinaryValue.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a BinaryValue message from the specified reader or buffer.
             * @function decode
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {json_ipc.ValuesSequence.BinaryValue} BinaryValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BinaryValue.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.json_ipc.ValuesSequence.BinaryValue();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.arr = reader.bytes();
                            break;
                        }
                    case 2: {
                            if (!(message.objLocation && message.objLocation.length))
                                message.objLocation = [];
                            message.objLocation.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a BinaryValue message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {json_ipc.ValuesSequence.BinaryValue} BinaryValue
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            BinaryValue.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a BinaryValue message.
             * @function verify
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            BinaryValue.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.arr != null && message.hasOwnProperty("arr"))
                    if (!(message.arr && typeof message.arr.length === "number" || $util.isString(message.arr)))
                        return "arr: buffer expected";
                if (message.objLocation != null && message.hasOwnProperty("objLocation")) {
                    if (!Array.isArray(message.objLocation))
                        return "objLocation: array expected";
                    for (var i = 0; i < message.objLocation.length; ++i)
                        if (!$util.isString(message.objLocation[i]))
                            return "objLocation: string[] expected";
                }
                return null;
            };

            /**
             * Creates a BinaryValue message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {json_ipc.ValuesSequence.BinaryValue} BinaryValue
             */
            BinaryValue.fromObject = function fromObject(object) {
                if (object instanceof $root.json_ipc.ValuesSequence.BinaryValue)
                    return object;
                var message = new $root.json_ipc.ValuesSequence.BinaryValue();
                if (object.arr != null)
                    if (typeof object.arr === "string")
                        $util.base64.decode(object.arr, message.arr = $util.newBuffer($util.base64.length(object.arr)), 0);
                    else if (object.arr.length >= 0)
                        message.arr = object.arr;
                if (object.objLocation) {
                    if (!Array.isArray(object.objLocation))
                        throw TypeError(".json_ipc.ValuesSequence.BinaryValue.objLocation: array expected");
                    message.objLocation = [];
                    for (var i = 0; i < object.objLocation.length; ++i)
                        message.objLocation[i] = String(object.objLocation[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a BinaryValue message. Also converts values to other types if specified.
             * @function toObject
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {json_ipc.ValuesSequence.BinaryValue} message BinaryValue
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            BinaryValue.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.objLocation = [];
                if (options.defaults)
                    if (options.bytes === String)
                        object.arr = "";
                    else {
                        object.arr = [];
                        if (options.bytes !== Array)
                            object.arr = $util.newBuffer(object.arr);
                    }
                if (message.arr != null && message.hasOwnProperty("arr"))
                    object.arr = options.bytes === String ? $util.base64.encode(message.arr, 0, message.arr.length) : options.bytes === Array ? Array.prototype.slice.call(message.arr) : message.arr;
                if (message.objLocation && message.objLocation.length) {
                    object.objLocation = [];
                    for (var j = 0; j < message.objLocation.length; ++j)
                        object.objLocation[j] = message.objLocation[j];
                }
                return object;
            };

            /**
             * Converts this BinaryValue to JSON.
             * @function toJSON
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            BinaryValue.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for BinaryValue
             * @function getTypeUrl
             * @memberof json_ipc.ValuesSequence.BinaryValue
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            BinaryValue.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/json_ipc.ValuesSequence.BinaryValue";
            };

            return BinaryValue;
        })();

        ValuesSequence.TransferredObj = (function() {

            /**
             * Properties of a TransferredObj.
             * @memberof json_ipc.ValuesSequence
             * @interface ITransferredObj
             * @property {number|null} [indexInPassed] TransferredObj indexInPassed
             * @property {Array.<string>|null} [objLocation] TransferredObj objLocation
             */

            /**
             * Constructs a new TransferredObj.
             * @memberof json_ipc.ValuesSequence
             * @classdesc Represents a TransferredObj.
             * @implements ITransferredObj
             * @constructor
             * @param {json_ipc.ValuesSequence.ITransferredObj=} [properties] Properties to set
             */
            function TransferredObj(properties) {
                this.objLocation = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * TransferredObj indexInPassed.
             * @member {number} indexInPassed
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @instance
             */
            TransferredObj.prototype.indexInPassed = 0;

            /**
             * TransferredObj objLocation.
             * @member {Array.<string>} objLocation
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @instance
             */
            TransferredObj.prototype.objLocation = $util.emptyArray;

            /**
             * Creates a new TransferredObj instance using the specified properties.
             * @function create
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {json_ipc.ValuesSequence.ITransferredObj=} [properties] Properties to set
             * @returns {json_ipc.ValuesSequence.TransferredObj} TransferredObj instance
             */
            TransferredObj.create = function create(properties) {
                return new TransferredObj(properties);
            };

            /**
             * Encodes the specified TransferredObj message. Does not implicitly {@link json_ipc.ValuesSequence.TransferredObj.verify|verify} messages.
             * @function encode
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {json_ipc.ValuesSequence.ITransferredObj} message TransferredObj message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransferredObj.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.indexInPassed != null && Object.hasOwnProperty.call(message, "indexInPassed"))
                    writer.uint32(/* id 1, wireType 0 =*/8).uint32(message.indexInPassed);
                if (message.objLocation != null && message.objLocation.length)
                    for (var i = 0; i < message.objLocation.length; ++i)
                        writer.uint32(/* id 2, wireType 2 =*/18).string(message.objLocation[i]);
                return writer;
            };

            /**
             * Encodes the specified TransferredObj message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.TransferredObj.verify|verify} messages.
             * @function encodeDelimited
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {json_ipc.ValuesSequence.ITransferredObj} message TransferredObj message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            TransferredObj.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a TransferredObj message from the specified reader or buffer.
             * @function decode
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {json_ipc.ValuesSequence.TransferredObj} TransferredObj
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransferredObj.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.json_ipc.ValuesSequence.TransferredObj();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.indexInPassed = reader.uint32();
                            break;
                        }
                    case 2: {
                            if (!(message.objLocation && message.objLocation.length))
                                message.objLocation = [];
                            message.objLocation.push(reader.string());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a TransferredObj message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {json_ipc.ValuesSequence.TransferredObj} TransferredObj
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            TransferredObj.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a TransferredObj message.
             * @function verify
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            TransferredObj.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.indexInPassed != null && message.hasOwnProperty("indexInPassed"))
                    if (!$util.isInteger(message.indexInPassed))
                        return "indexInPassed: integer expected";
                if (message.objLocation != null && message.hasOwnProperty("objLocation")) {
                    if (!Array.isArray(message.objLocation))
                        return "objLocation: array expected";
                    for (var i = 0; i < message.objLocation.length; ++i)
                        if (!$util.isString(message.objLocation[i]))
                            return "objLocation: string[] expected";
                }
                return null;
            };

            /**
             * Creates a TransferredObj message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {json_ipc.ValuesSequence.TransferredObj} TransferredObj
             */
            TransferredObj.fromObject = function fromObject(object) {
                if (object instanceof $root.json_ipc.ValuesSequence.TransferredObj)
                    return object;
                var message = new $root.json_ipc.ValuesSequence.TransferredObj();
                if (object.indexInPassed != null)
                    message.indexInPassed = object.indexInPassed >>> 0;
                if (object.objLocation) {
                    if (!Array.isArray(object.objLocation))
                        throw TypeError(".json_ipc.ValuesSequence.TransferredObj.objLocation: array expected");
                    message.objLocation = [];
                    for (var i = 0; i < object.objLocation.length; ++i)
                        message.objLocation[i] = String(object.objLocation[i]);
                }
                return message;
            };

            /**
             * Creates a plain object from a TransferredObj message. Also converts values to other types if specified.
             * @function toObject
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {json_ipc.ValuesSequence.TransferredObj} message TransferredObj
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            TransferredObj.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults)
                    object.objLocation = [];
                if (options.defaults)
                    object.indexInPassed = 0;
                if (message.indexInPassed != null && message.hasOwnProperty("indexInPassed"))
                    object.indexInPassed = message.indexInPassed;
                if (message.objLocation && message.objLocation.length) {
                    object.objLocation = [];
                    for (var j = 0; j < message.objLocation.length; ++j)
                        object.objLocation[j] = message.objLocation[j];
                }
                return object;
            };

            /**
             * Converts this TransferredObj to JSON.
             * @function toJSON
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            TransferredObj.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for TransferredObj
             * @function getTypeUrl
             * @memberof json_ipc.ValuesSequence.TransferredObj
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            TransferredObj.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/json_ipc.ValuesSequence.TransferredObj";
            };

            return TransferredObj;
        })();

        ValuesSequence.Value = (function() {

            /**
             * Properties of a Value.
             * @memberof json_ipc.ValuesSequence
             * @interface IValue
             * @property {string|null} [json] Value json
             * @property {Array.<json_ipc.ValuesSequence.IBinaryValue>|null} [binaryInJson] Value binaryInJson
             * @property {Array.<json_ipc.ValuesSequence.ITransferredObj>|null} [transferredInJson] Value transferredInJson
             * @property {json_ipc.ValuesSequence.IBinaryValue|null} [arr] Value arr
             * @property {json_ipc.ValuesSequence.ITransferredObj|null} [transferred] Value transferred
             */

            /**
             * Constructs a new Value.
             * @memberof json_ipc.ValuesSequence
             * @classdesc Represents a Value.
             * @implements IValue
             * @constructor
             * @param {json_ipc.ValuesSequence.IValue=} [properties] Properties to set
             */
            function Value(properties) {
                this.binaryInJson = [];
                this.transferredInJson = [];
                if (properties)
                    for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
                        if (properties[keys[i]] != null)
                            this[keys[i]] = properties[keys[i]];
            }

            /**
             * Value json.
             * @member {string} json
             * @memberof json_ipc.ValuesSequence.Value
             * @instance
             */
            Value.prototype.json = "";

            /**
             * Value binaryInJson.
             * @member {Array.<json_ipc.ValuesSequence.IBinaryValue>} binaryInJson
             * @memberof json_ipc.ValuesSequence.Value
             * @instance
             */
            Value.prototype.binaryInJson = $util.emptyArray;

            /**
             * Value transferredInJson.
             * @member {Array.<json_ipc.ValuesSequence.ITransferredObj>} transferredInJson
             * @memberof json_ipc.ValuesSequence.Value
             * @instance
             */
            Value.prototype.transferredInJson = $util.emptyArray;

            /**
             * Value arr.
             * @member {json_ipc.ValuesSequence.IBinaryValue|null|undefined} arr
             * @memberof json_ipc.ValuesSequence.Value
             * @instance
             */
            Value.prototype.arr = null;

            /**
             * Value transferred.
             * @member {json_ipc.ValuesSequence.ITransferredObj|null|undefined} transferred
             * @memberof json_ipc.ValuesSequence.Value
             * @instance
             */
            Value.prototype.transferred = null;

            /**
             * Creates a new Value instance using the specified properties.
             * @function create
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {json_ipc.ValuesSequence.IValue=} [properties] Properties to set
             * @returns {json_ipc.ValuesSequence.Value} Value instance
             */
            Value.create = function create(properties) {
                return new Value(properties);
            };

            /**
             * Encodes the specified Value message. Does not implicitly {@link json_ipc.ValuesSequence.Value.verify|verify} messages.
             * @function encode
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {json_ipc.ValuesSequence.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encode = function encode(message, writer) {
                if (!writer)
                    writer = $Writer.create();
                if (message.json != null && Object.hasOwnProperty.call(message, "json"))
                    writer.uint32(/* id 1, wireType 2 =*/10).string(message.json);
                if (message.binaryInJson != null && message.binaryInJson.length)
                    for (var i = 0; i < message.binaryInJson.length; ++i)
                        $root.json_ipc.ValuesSequence.BinaryValue.encode(message.binaryInJson[i], writer.uint32(/* id 2, wireType 2 =*/18).fork()).ldelim();
                if (message.transferredInJson != null && message.transferredInJson.length)
                    for (var i = 0; i < message.transferredInJson.length; ++i)
                        $root.json_ipc.ValuesSequence.TransferredObj.encode(message.transferredInJson[i], writer.uint32(/* id 3, wireType 2 =*/26).fork()).ldelim();
                if (message.arr != null && Object.hasOwnProperty.call(message, "arr"))
                    $root.json_ipc.ValuesSequence.BinaryValue.encode(message.arr, writer.uint32(/* id 4, wireType 2 =*/34).fork()).ldelim();
                if (message.transferred != null && Object.hasOwnProperty.call(message, "transferred"))
                    $root.json_ipc.ValuesSequence.TransferredObj.encode(message.transferred, writer.uint32(/* id 5, wireType 2 =*/42).fork()).ldelim();
                return writer;
            };

            /**
             * Encodes the specified Value message, length delimited. Does not implicitly {@link json_ipc.ValuesSequence.Value.verify|verify} messages.
             * @function encodeDelimited
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {json_ipc.ValuesSequence.IValue} message Value message or plain object to encode
             * @param {$protobuf.Writer} [writer] Writer to encode to
             * @returns {$protobuf.Writer} Writer
             */
            Value.encodeDelimited = function encodeDelimited(message, writer) {
                return this.encode(message, writer).ldelim();
            };

            /**
             * Decodes a Value message from the specified reader or buffer.
             * @function decode
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @param {number} [length] Message length if known beforehand
             * @returns {json_ipc.ValuesSequence.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decode = function decode(reader, length) {
                if (!(reader instanceof $Reader))
                    reader = $Reader.create(reader);
                var end = length === undefined ? reader.len : reader.pos + length, message = new $root.json_ipc.ValuesSequence.Value();
                while (reader.pos < end) {
                    var tag = reader.uint32();
                    switch (tag >>> 3) {
                    case 1: {
                            message.json = reader.string();
                            break;
                        }
                    case 2: {
                            if (!(message.binaryInJson && message.binaryInJson.length))
                                message.binaryInJson = [];
                            message.binaryInJson.push($root.json_ipc.ValuesSequence.BinaryValue.decode(reader, reader.uint32()));
                            break;
                        }
                    case 3: {
                            if (!(message.transferredInJson && message.transferredInJson.length))
                                message.transferredInJson = [];
                            message.transferredInJson.push($root.json_ipc.ValuesSequence.TransferredObj.decode(reader, reader.uint32()));
                            break;
                        }
                    case 4: {
                            message.arr = $root.json_ipc.ValuesSequence.BinaryValue.decode(reader, reader.uint32());
                            break;
                        }
                    case 5: {
                            message.transferred = $root.json_ipc.ValuesSequence.TransferredObj.decode(reader, reader.uint32());
                            break;
                        }
                    default:
                        reader.skipType(tag & 7);
                        break;
                    }
                }
                return message;
            };

            /**
             * Decodes a Value message from the specified reader or buffer, length delimited.
             * @function decodeDelimited
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
             * @returns {json_ipc.ValuesSequence.Value} Value
             * @throws {Error} If the payload is not a reader or valid buffer
             * @throws {$protobuf.util.ProtocolError} If required fields are missing
             */
            Value.decodeDelimited = function decodeDelimited(reader) {
                if (!(reader instanceof $Reader))
                    reader = new $Reader(reader);
                return this.decode(reader, reader.uint32());
            };

            /**
             * Verifies a Value message.
             * @function verify
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {Object.<string,*>} message Plain object to verify
             * @returns {string|null} `null` if valid, otherwise the reason why it is not
             */
            Value.verify = function verify(message) {
                if (typeof message !== "object" || message === null)
                    return "object expected";
                if (message.json != null && message.hasOwnProperty("json"))
                    if (!$util.isString(message.json))
                        return "json: string expected";
                if (message.binaryInJson != null && message.hasOwnProperty("binaryInJson")) {
                    if (!Array.isArray(message.binaryInJson))
                        return "binaryInJson: array expected";
                    for (var i = 0; i < message.binaryInJson.length; ++i) {
                        var error = $root.json_ipc.ValuesSequence.BinaryValue.verify(message.binaryInJson[i]);
                        if (error)
                            return "binaryInJson." + error;
                    }
                }
                if (message.transferredInJson != null && message.hasOwnProperty("transferredInJson")) {
                    if (!Array.isArray(message.transferredInJson))
                        return "transferredInJson: array expected";
                    for (var i = 0; i < message.transferredInJson.length; ++i) {
                        var error = $root.json_ipc.ValuesSequence.TransferredObj.verify(message.transferredInJson[i]);
                        if (error)
                            return "transferredInJson." + error;
                    }
                }
                if (message.arr != null && message.hasOwnProperty("arr")) {
                    var error = $root.json_ipc.ValuesSequence.BinaryValue.verify(message.arr);
                    if (error)
                        return "arr." + error;
                }
                if (message.transferred != null && message.hasOwnProperty("transferred")) {
                    var error = $root.json_ipc.ValuesSequence.TransferredObj.verify(message.transferred);
                    if (error)
                        return "transferred." + error;
                }
                return null;
            };

            /**
             * Creates a Value message from a plain object. Also converts values to their respective internal types.
             * @function fromObject
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {Object.<string,*>} object Plain object
             * @returns {json_ipc.ValuesSequence.Value} Value
             */
            Value.fromObject = function fromObject(object) {
                if (object instanceof $root.json_ipc.ValuesSequence.Value)
                    return object;
                var message = new $root.json_ipc.ValuesSequence.Value();
                if (object.json != null)
                    message.json = String(object.json);
                if (object.binaryInJson) {
                    if (!Array.isArray(object.binaryInJson))
                        throw TypeError(".json_ipc.ValuesSequence.Value.binaryInJson: array expected");
                    message.binaryInJson = [];
                    for (var i = 0; i < object.binaryInJson.length; ++i) {
                        if (typeof object.binaryInJson[i] !== "object")
                            throw TypeError(".json_ipc.ValuesSequence.Value.binaryInJson: object expected");
                        message.binaryInJson[i] = $root.json_ipc.ValuesSequence.BinaryValue.fromObject(object.binaryInJson[i]);
                    }
                }
                if (object.transferredInJson) {
                    if (!Array.isArray(object.transferredInJson))
                        throw TypeError(".json_ipc.ValuesSequence.Value.transferredInJson: array expected");
                    message.transferredInJson = [];
                    for (var i = 0; i < object.transferredInJson.length; ++i) {
                        if (typeof object.transferredInJson[i] !== "object")
                            throw TypeError(".json_ipc.ValuesSequence.Value.transferredInJson: object expected");
                        message.transferredInJson[i] = $root.json_ipc.ValuesSequence.TransferredObj.fromObject(object.transferredInJson[i]);
                    }
                }
                if (object.arr != null) {
                    if (typeof object.arr !== "object")
                        throw TypeError(".json_ipc.ValuesSequence.Value.arr: object expected");
                    message.arr = $root.json_ipc.ValuesSequence.BinaryValue.fromObject(object.arr);
                }
                if (object.transferred != null) {
                    if (typeof object.transferred !== "object")
                        throw TypeError(".json_ipc.ValuesSequence.Value.transferred: object expected");
                    message.transferred = $root.json_ipc.ValuesSequence.TransferredObj.fromObject(object.transferred);
                }
                return message;
            };

            /**
             * Creates a plain object from a Value message. Also converts values to other types if specified.
             * @function toObject
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {json_ipc.ValuesSequence.Value} message Value
             * @param {$protobuf.IConversionOptions} [options] Conversion options
             * @returns {Object.<string,*>} Plain object
             */
            Value.toObject = function toObject(message, options) {
                if (!options)
                    options = {};
                var object = {};
                if (options.arrays || options.defaults) {
                    object.binaryInJson = [];
                    object.transferredInJson = [];
                }
                if (options.defaults) {
                    object.json = "";
                    object.arr = null;
                    object.transferred = null;
                }
                if (message.json != null && message.hasOwnProperty("json"))
                    object.json = message.json;
                if (message.binaryInJson && message.binaryInJson.length) {
                    object.binaryInJson = [];
                    for (var j = 0; j < message.binaryInJson.length; ++j)
                        object.binaryInJson[j] = $root.json_ipc.ValuesSequence.BinaryValue.toObject(message.binaryInJson[j], options);
                }
                if (message.transferredInJson && message.transferredInJson.length) {
                    object.transferredInJson = [];
                    for (var j = 0; j < message.transferredInJson.length; ++j)
                        object.transferredInJson[j] = $root.json_ipc.ValuesSequence.TransferredObj.toObject(message.transferredInJson[j], options);
                }
                if (message.arr != null && message.hasOwnProperty("arr"))
                    object.arr = $root.json_ipc.ValuesSequence.BinaryValue.toObject(message.arr, options);
                if (message.transferred != null && message.hasOwnProperty("transferred"))
                    object.transferred = $root.json_ipc.ValuesSequence.TransferredObj.toObject(message.transferred, options);
                return object;
            };

            /**
             * Converts this Value to JSON.
             * @function toJSON
             * @memberof json_ipc.ValuesSequence.Value
             * @instance
             * @returns {Object.<string,*>} JSON object
             */
            Value.prototype.toJSON = function toJSON() {
                return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
            };

            /**
             * Gets the default type url for Value
             * @function getTypeUrl
             * @memberof json_ipc.ValuesSequence.Value
             * @static
             * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
             * @returns {string} The default type url
             */
            Value.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
                if (typeUrlPrefix === undefined) {
                    typeUrlPrefix = "type.googleapis.com";
                }
                return typeUrlPrefix + "/json_ipc.ValuesSequence.Value";
            };

            return Value;
        })();

        return ValuesSequence;
    })();

    return json_ipc;
})();

export default $root;
