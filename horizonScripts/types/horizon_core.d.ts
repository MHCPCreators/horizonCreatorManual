declare module 'horizon/core' { /**
  * (c) Meta Platforms, Inc. and affiliates. Confidential and proprietary.
  *
  * @format
  */
 import * as i18n_utils from 'HorizonI18nUtils';
 /**
  * An interface representing a class.
  */
 export interface Class<TConstructorParameters extends any[] = any[], TClassInstance = unknown> {
     /**
      * Creates a new instance of the class.
      *
      * @param args - The arguments for creating the instance.
      * @returns The new class instance.
      */
     new (...args: TConstructorParameters): TClassInstance;
 }
 /**
  * The version number of the Horizon TypeScript API.
  */
 export declare const ApiVersion = "2.0.0";
 /**
  * A list of property types available for a Typescript {@link Component}.
  * You can pass these variable types to an instance of a Typescript
  * component when attached to an entity.
  */
 export declare const PropTypes: {
     /**
      * The property is a TypeScript Number.
      */
     Number: "number";
     /**
      * The property is a TypeScript String.
      */
     String: "string";
     /**
      * The property is a TypeScript Boolean.
      */
     Boolean: "boolean";
     /**
      * The property is a Horizon {@link Vec3}.
      */
     Vec3: "Vec3";
     /**
      * The property is a Horizon {@link Color}.
      */
     Color: "Color";
     /**
      * The property is a Horizon {@link Entity}.
      */
     Entity: "Entity";
     /**
      * The property is a Horizon {@link Quaternion}.
      */
     Quaternion: "Quaternion";
     /**
      * The property is a {@link Player}.
      */
     Player: "Player";
     /**
      * The property is a Horizon {@link Asset}.
      */
     Asset: "Asset";
     /**
      * The property is an array of TypeScript Numbers.
      */
     NumberArray: "Array<number>";
     /**
      * The property is a array of TypeScript Strings.
      */
     StringArray: "Array<string>";
     /**
      * The property is an array of TypeScript Booleans.
      */
     BooleanArray: "Array<boolean>";
     /**
      * The property is an array of Horizon {@link Vec3}s.
      */
     Vec3Array: "Array<Vec3>";
     /**
      * The property is an array of Horizon {@link Color}s.
      */
     ColorArray: "Array<Color>";
     /**
      * The property is an array of Horizon {@link Entity}s.
      */
     EntityArray: "Array<Entity>";
     /**
      * The property is an array of Horizon {@link Quaternion}s.
      */
     QuaternionArray: "Array<Quaternion>";
     /**
      * The property is an array of Horizon {@link Player}s.
      */
     PlayerArray: "Array<Player>";
     /**
      * The property is an array of Horizon {@link Asset}s.
      */
     AssetArray: "Array<Asset>";
 };
 /**
  * Used to validate the type of a built-in variable.
  */
 export declare type BuiltInVariableType = PropTypeFromEnum<AllPropTypes>;
 declare type StringifiedBuiltInVariable<T extends BuiltInVariableType> = T extends number ? typeof PropTypes.Number : T extends string ? typeof PropTypes.String : T extends boolean ? typeof PropTypes.Boolean : T extends Vec3 ? typeof PropTypes.Vec3 : T extends Color ? typeof PropTypes.Color : T extends Entity ? typeof PropTypes.Entity : T extends Quaternion ? typeof PropTypes.Quaternion : T extends Player ? typeof PropTypes.Player : T extends Asset ? typeof PropTypes.Asset : T extends Array<number> ? typeof PropTypes.NumberArray : T extends Array<string> ? typeof PropTypes.StringArray : T extends Array<boolean> ? typeof PropTypes.BooleanArray : T extends Array<Vec3> ? typeof PropTypes.Vec3Array : T extends Array<Color> ? typeof PropTypes.ColorArray : T extends Array<Entity> ? typeof PropTypes.EntityArray : T extends Array<Quaternion> ? typeof PropTypes.QuaternionArray : T extends Array<Player> ? typeof PropTypes.PlayerArray : T extends Array<Asset> ? typeof PropTypes.AssetArray : never;
 /**
  * Indicates whether a method or object operates in local or global scope.
  */
 export declare enum Space {
     /**
      * The method operates in a global scope.
      */
     World = 0,
     /**
      * The method operates in a local scope.
      */
     Local = 1
 }
 /**
  * The entity visibility options for a set of players.
  */
 export declare enum PlayerVisibilityMode {
     /**
      * The entity is visible to the specified players.
      */
     VisibleTo = 0,
     /**
      * The entity is not visible to the specified players.
      */
     HiddenFrom = 1
 }
 /**
  * Asserts that an expression is true.
  * @param condition - The expression that must be true to avoid an error.
  */
 export declare function assert(condition: boolean): void;
 /**
  * Represents a readable property.
  *
  * @remarks
  * You cannot get the property value directly; you must use `get`.
  * Using `get` typically results in a bridge call and might result in lower performance.
  * Therefore, we recommend caching these values when possible.
  */
 export interface ReadableHorizonProperty<T> {
     /**
      * Gets the property value.
      * @returns the property value
      */
     get(): T;
 }
 /**
  * Represents a writable property.
  *
  * @remarks
  * You cannot set the property value directly; you must use `set`.
  * Using `set` typically results in a bridge call and might result in lower performance.
  * Therefore, we recommend caching these values when possible.
  */
 export interface WritableHorizonProperty<T, U = never> {
     /**
      * Sets the value(s) of the property
      * @param value - the new property value
      * @param values - the new property values
      */
     set(value: T, ...values: [U?]): void;
 }
 /**
  * Represents a property in Horizon Worlds.
  */
 export declare class HorizonProperty<T> implements ReadableHorizonProperty<T>, WritableHorizonProperty<T> {
     /**
      * Gets the property.
      */
     getter: () => T;
     /**
      * Sets the property.
      */
     setter: (value: T) => void;
     /**
      * Creates a HorizonProperty instance.
      * @param getter - The function that returns the property value.
      * @param setter - The function that sets the property value.
      */
     constructor(getter: () => T, setter: (value: T) => void);
     /**
      * Gets the property value. Calls are cached per frame.
      *
      * @remarks
      * Mutating the state snapshot doesn't change the underlying value.
      * You must call {@link set} set to do this.
      *
      * @returns The current value of the property.
      */
     get(): T;
     /**
      * Sets the property value.
      * @remarks There's no guarantee that this is a synchronous operation.
      * @param value - The property value to set.
      */
     set(value: T): void;
 }
 declare class HorizonSetProperty<T> implements Iterable<T>, ReadableHorizonProperty<T[]>, WritableHorizonProperty<T[]> {
     constructor(getter: () => T[], setter: (value: T[]) => void);
     [Symbol.iterator](): Iterator<T>;
     get(): T[];
     set(value: T[]): void;
     length(): number;
     contains(value: T): boolean;
     clear(): void;
     add(value: T): void;
     remove(value: T): void;
 }
 /**
  * The type of data that can be passed via local events.
  * This is not restrictive in any way because the data remains in the same VM.
  */
 declare type LocalEventData = object;
 /**
  * The type of data that can be passed via network events.
  * This data must be serializable because it needs to be sent over the network.
  */
 declare type NetworkEventData = SerializableState;
 /**
  * Represents an event sent between TypeScript event listeners on the same
  * client in Horizon Worlds. These events support arbitrary data.
  *
  * @remarks When sent between event listeners on the same client (locally),
  * LocalEvent outperforms {@link CodeBlockEvent} because it doesn't use the
  * legacy messaging system used by Code Block scripting.
  *
  * For events sent over a network, you can use {@link NetworkEvent}.
  */
 export declare class LocalEvent<TPayload extends LocalEventData = Record<string, never>> {
     /**
      * The name of the event. If a name is not provided, a randomly generated name is assigned.
      */
     name: string;
     /**
      * Creates a local event with the specified name.
      *
      * @remarks If a name is not provided, the event becomes unique and must be referenced by its
      * object instance. This is useful if your event is used in an asset to avoid collision in a
      * world.
      *
      * @param name - The name of the event.
      */
     constructor(name?: string);
 }
 /**
  * Represents an event sent over a network. These events support any type of
  * data that can be serialized through JSON.stringify().
  *
  * @remarks When sent over the network, NetworkEvent outperforms
  * {@link CodeBlockEvent} because it doesn't use the legacy messaging system
  * used by Code Block scripting.
  *
  * For events sent between event listeners on the same client (locally), you
  * can use {@link LocalEvent}.
  */
 export declare class NetworkEvent<TPayload extends NetworkEventData = Record<string, never>> {
     /**
      * The name of the event.
      */
     name: string;
     /**
      * Creates a NetworkEvent with the specified name.
      * @param name - The name of the event.
      */
     constructor(name: string);
 }
 declare type ConstrainedPropTypes<T extends BuiltInVariableType[]> = {
     [key in keyof T]: StringifiedBuiltInVariable<T[key]>;
 };
 /**
  * Represents an event sent locally or over a network within the Code Block
  * scripting system. These events only supports predefined serializable types
  * and are primarily used to interact with scripting events from a world.
  *
  * @remarks A CodeBlockEvent is a legacy event that doesn't perform as well as
  * {@link LocalEvent} or {@link NetworkEvent}. We recommend that you only use
  * a CodeBlockEvent to interact with world scripting events.
  */
 export declare class CodeBlockEvent<T extends BuiltInVariableType[]> {
     /**
      * The name of the event.
      */
     name: string;
     /**
      * A list of possible types of the event.
      */
     expectedTypes: ConstrainedPropTypes<T> | [];
     /**
      * Creates a CodeBlockEvent.
      * @param name - The name of the event.
      * @param expectedTypes - The list of possible types of the event.
      * @remarks Each of these types defines the parameters for the event and must be of type {@link PropType}.
      */
     constructor(name: string, expectedTypes: ConstrainedPropTypes<T> | []);
 }
 /**
  * Represents what is returned from subscribing to an event.
  */
 export interface EventSubscription {
     /**
      * Disconnect from an event listener so that you no longer receive events.
      */
     disconnect: () => void;
 }
 /**
  * The Comparable interface defines a set of methods for comparing values of the same type,
  * including {@link Comparable.equals | equals()} and {@link Comparable.equalsApprox | equalsApprox()} methods.
  *
  * @typeParam T - The type of objects to which this object can be compared.
  */
 export interface Comparable<T> {
     /**
      * Whether the two values are equal.
      * @param val - The value to compare to the current value.
      */
     equals(val: T): boolean;
     /**
      * Whether two values are within epsilon of each other.
      * @param val - The value to compare to the current value.
      * @param epsilon - The difference between the two values when they are equal.
      */
     equalsApprox(val: T, epsilon?: number): boolean;
 }
 /**
  * Represents a 3D vector.
  *
  * @remarks This is the main class for creating and updating 3D points and directions in Horizon Worlds.
  *
  * For information on rotating 3D vectors, see the {@link Quaternion} class.
  */
 export declare class Vec3 implements Comparable<Vec3> {
     /**
      * The magnitude of the 3D vector along the X axis.
      */
     x: number;
     /**
      * The magnitude of the 3D vector along the Y axis.
      */
     y: number;
     /**
      * The magnitude of the 3D vector along the Z axis.
      */
     z: number;
     /**
      * Creates a 3D vector.
      * @param x - The magnitude of the 3D vector along the X axis.
      * @param y - The magnitude of the 3D vector along the Y axis.
      * @param z - The magnitude of the 3D vector along the Z axis.
      */
     constructor(x: number, y: number, z: number);
     /**
      * Clones a 3D vector's values into a mutable Vec3.
      * @returns A mutable Vec3 with the same x,y,z values.
      */
     clone(): Vec3;
     /**
      * Determines whether the current 3D vector is equal to a given 3D vector.
      *
      * @remarks
      * 3D vectors are equal if they have the same x, y, and z components.
      *
      * @param vec - The 3D vector to compare.
      * @returns true if the 3D vectors are equal; false otherwise.
      */
     equals(vec: Vec3): boolean;
     /**
      * Determines whether the current 3D vector is relatively equal to a given 3D vector.
      *
      * @remarks The vectors are relatively equal if the difference between their
      * x, y, and z components doesn't exceed the value provided by the epsilon paramter.
      *
      * @param vec - The 3D vector to compare.
      * @param epsilon - The maxium difference to consider equal.
      * @returns true if the 3D vectors are relatively equal; false otherwise.
      */
     equalsApprox(vec: Vec3, epsilon?: number): boolean;
     /**
      * Gets the magnitude of a 3D vector.
      *
      * @remarks The magnitude of a 3D vector is its length.
      *
      * @returns The magnitude of the 3D vector.
      */
     magnitude(): number;
     /**
      * Gets the squared magnitude of a 3D vector.
      * @returns
      */
     magnitudeSquared(): number;
     /**
      * Gets the distance between the current 3D vector and another 3D vector.
      * @param vec - The 3D vector to compare.
      * @returns The distance between the 3D vectors.
      */
     distance(vec: Vec3): number;
     /**
      * Gets the squared distance between the current 3D vector and another 3D vector.
      * @param vec - The 3D vector to compare.
      * @returns The squared distance between the 3D vectors.
      */
     distanceSquared(vec: Vec3): number;
     /**
      * Gets a string representation of the x, y, and z values for the 3D vector.
      *
      * @returns The x, y, and z values.
      */
     toString(): string;
     /**
      * Creates a copy of the specified 3D vector with the same x, y, and z values.
      * @param vec - The 3D vector to copy.
      * @returns A new 3D vector.
      */
     copy(vec: Vec3): this;
     /**
      * Adds the current 3D vector to another 3D vector and returns the result.
      * @param vec - The 3D vector to add.
      * @returns A new 3D vector.
      */
     add(vec: Vec3): Vec3;
     /**
      * Subtracts a 3D vector from the current 3D vector and returns the result.
      * @param vec - The 3D vector to subtract.
      * @returns A new 3D vector.
      */
     sub(vec: Vec3): Vec3;
     /**
      * Multiplies the current 3D vector by scalar and returns the result.
      * @param scalar - The scalar to multiply.
      * @returns A new 3D vector.
      */
     mul(scalar: number): Vec3;
     /**
      * Creates a 3D vector by multiplying the current 3D vector's components by another 3D vector's components.
      *
      * @remarks The vector components are multiplied as follows (a.x*b.x, a.y*b.y, a.z*b.z).
      *
      * @param vec - The additional 3D vector to multiply.
      * @returns A new 3D vector.
      */
     componentMul(vec: Vec3): Vec3;
     /**
      * Divides the current 3D vector by a scalar and returns the result.
      * @param scalar - The scalar to use as the divisor.
      * @returns A new 3D vector.
      */
     div(scalar: number): Vec3;
     /**
      * Divides the current 3D vector's components by another 3D vector's components and returns the results.
      * @remarks The division is performed as follows (a.x/b.x, a.y/b.y, a.z/b.z).
      * @param vec - The 3D vector to use as the divisor.
      * @returns A new 3D vector.
      */
     componentDiv(vec: Vec3): Vec3;
     /**
      * Normalizes the 3D vector (changes its magnitude to 1).
      *
      * @returns A new 3D vector.
      */
     normalize(): Vec3;
     /**
      * Gets the dot product of the current 3D vector and another 3D vector.
      * @param vec - The additional 3D vector to compare.
      * @returns The dot product of the 3D vectors.
      */
     dot(vec: Vec3): number;
     /**
      * Gets the cross product of the current 3D vector and another 3D vector.
      * @param vec - The additional 3D vector to compare.
      * @returns The cross product of the 3D vectors.
      */
     cross(vec: Vec3): Vec3;
     /**
      * Reflects the current 3D vector off a surface defined by a normal and returns the result.
      *
      * @param normal - The normal vector that defines the reflecting surface. This value should be normalized.
      * @returns A new 3D vector that defines the reflection.
      */
     reflect(normal: Vec3): Vec3;
     /**
      * Adds a 3D vector to the current 3D vector, modifying the original 3D vector.
      * @param vec - The 3D vector to add.
      */
     addInPlace(vec: Vec3): this;
     /**
      * Subtracts a 3D vector from the current 3D vector, modifying the original 3D vector.
      * @param vec - The 3D vector to subtract.
      */
     subInPlace(vec: Vec3): this;
     /**
      * Multiplies the current 3D vector by a scalar value, modifying the original 3D vector.
      * @param scalar - The value to scale the 3D vector by.
      */
     mulInPlace(scalar: number): this;
     /**
      * Muliplies the current 3D vector by another 3D vector, modifying the original 3D vector.
      * @param vec - The 3D vector to multiply.
      */
     componentMulInPlace(vec: Vec3): this;
     /**
      * Divides the current 3D vector by a scalar value, modifying the original 3D vector.
      * @param scalar - The scalar value to divide by.
      */
     divInPlace(scalar: number): this;
     /**
      * Divides the current 3D Vector by another 3D vector, modifying the original 3D vector.
      * @param vec - The 3D vector to divide by.
      */
     componentDivInPlace(vec: Vec3): this;
     /**
      * Normalizes the 3D vector (changes its magnitude to 1).
      */
     normalizeInPlace(): this;
     /**
      * Gets the cross product of the current 3D vector and another 3D vector, and modifies the current vector with the result.
      *
      * @param vec - The additional 3D vector to compute the cross product with.
      */
     crossInPlace(vec: Vec3): this;
     /**
      * Reflects the current 3D vector off a surface defined by a normal and modifies the orginal vector with the result.
      *
      * @param normal - The normal vector that defines the reflecting surface. This value should be normalized.
      */
     reflectInPlace(normal: Vec3): this;
     /**
      * A zero 3D vector: Vec3(0, 0, 0).
      */
     static get zero(): Vec3;
     /**
      * A one 3D vector: Vec3(1, 1, 1).
      */
     static get one(): Vec3;
     /**
      * A forward 3D vector: Vec3(0, 0, 1).
      */
     static get forward(): Vec3;
     /**
      * An up 3D vector: Vec3(0, 1, 0).
      */
     static get up(): Vec3;
     /**
      * A left 3D vector: Vec3(-1, 0, 0).
      */
     static get left(): Vec3;
     /**
      * A right 3D vector: Vec3(1, 0, 0).
      */
     static get right(): Vec3;
     /**
      * A backward 3D vector: Vec3(0, 0, -1).
      */
     static get backward(): Vec3;
     /**
      * A down 3D vector: Vec3(0, -1, 0).
      */
     static get down(): Vec3;
     /**
      * Determines whether two 3D vectors are equal.
      *
      * @remarks
      * 3D vectors are equal if they have the same x, y, and z components.
      *
      * To determine whether the vectors are within a given range of each other,
      * see {@link Vec3.equalsApprox}.
      *
      * @param vecA - The first 3D vector to compare.
      * @param vecB - The second 3D vector to compare.
      * @returns `true` if the 3D vectors are equal; `false` otherwise.
      */
     static equals(vecA: Vec3, vecB: Vec3): boolean;
     /**
      * Determines whether two 3D vectors are relatively equal.
      *
      * @remarks The vectors are relatively equal if the difference between their
      * x, y, and z components doesn't exceed the value provided in the epsilon paramter.
      *
      * To determine whether the vectors are equal, see {@link Vec3.equals}.
      *
      * @param vecA - The first 3D vector to compare.
      * @param vecB - The second 3D vector to compare.
      * @param epsilon - The maxium difference to consider equal.
      * @returns `true` if the 3D vectors are relatively equal; `false` otherwise.
      */
     static equalsApprox(vecA: Vec3, vecB: Vec3, epsilon?: number): boolean;
     /**
      * Adds two 3D vectors and returns the result in a new or an existing 3D vector.
      * @param vecA - The first 3D vector to add.
      * @param vecB - The second 3D vector to add.
      * @param outVec - The resulting 3D vector. If not provided, a new 3D vector is created and returned.
      * @returns The new 3D vector that is the sum, if `outVec` is not provided.
      */
     static add(vecA: Vec3, vecB: Vec3, outVec?: Vec3): Vec3;
     /**
      * Subtracts a 3D vector from another and returns the result in a new or an existing 3D vector.
      * @param vecA - The 3D vector to substract from.
      * @param vecB - The 3D vector to subtract.
      * @param outVec - The resulting 3D vector. If not provided, a new 3D vector is created and returned.
      * @returns A new 3D vector, if `outVec` is not provided.
      */
     static sub(vecA: Vec3, vecB: Vec3, outVec?: Vec3): Vec3;
     /**
      * Performs a scalar multiplication on a 3D vector and returns the result in a new or an existing 3D vector.
      * @param vec - The 3D vector to scale.
      * @param scalar - The value to scale the 3D vector by.
      * @param outVec - The resulting 3D vector. If not provided, a new 3D vector is created and returned.
      * @returns A new 3D vector, if `outVec` is not provided.
      */
     static mul(vec: Vec3, scalar: number, outVec?: Vec3): Vec3;
     /**
      * Performs a scalar division on a 3D vector and returns the result in a new or an existing 3D vector.
      * @param vec - The 3D vector to scale.
      * @param scalar - The value to scale the 3D vector by.
      * @param outVec - The resulting 3D vector. If not provided, a new 3D vector is created and returned.
      * @returns A new 3D vector, if `outVec` is not provided.
      */
     static div(vec: Vec3, scalar: number, outVec?: Vec3): Vec3;
     /**
      * Normalizes a 3D vector (changes the magnitude to 1) and returns the result in a new or an existing 3D vector.
      * @param vec - The 3D vector to normalize.
      * @param outVec - The resulting 3D vector. If not provided, a new 3D vector is created and returned.
      * @returns A new 3D vector, if `outVec` is not provided.
      */
     static normalize(vec: Vec3, outVec?: Vec3): Vec3;
     /**
      * Gets the cross product of two 3D vectors and returns the result in a new or an existing 3D vector.
      * @param vecA - The left side 3D vector of the cross product.
      * @param vecB - The right side 3D vector of the cross product.
      * @param outVec - The resulting 3D vector. If not provided, a new 3D vector is created and returned.
      * @returns A new 3D vector, if `outVec` is not provided.
      */
     static cross(vecA: Vec3, vecB: Vec3, outVec?: Vec3): Vec3;
     /**
      * Gets the dot product of the two 3D vectors.
      * @param vecA - The first 3D vector of the dot product.
      * @param vecB - The second 3D vector of the dot product.
      * @returns The dot product of the 3D vectors.
      */
     static dot(vecA: Vec3, vecB: Vec3): number;
     /**
      * Performs a lerp (linear interpolation) between two 3D vectors.
      * @param vecA - The first vec3 to lerp.
      * @param vecB - The second vec3 to lerp.
      * @param amount - The gradient to use for interpolation (clamped 0 to 1)
      * @param outVec - The new 3D vector as a result of the operation. If not supplied, a new 3D vector is created and returned.
      * @returns A new 3D vector, if `outVec` is not supplied.
      */
     static lerp(vecA: Vec3, vecB: Vec3, amount: number, outVec?: Vec3): Vec3;
 }
 /**
  * Represents an RGB color.
  */
 export declare class Color implements Comparable<Color> {
     /**
      * The red component of the RGB color.
      */
     r: number;
     /**
      * The green component of the RGB color.
      */
     g: number;
     /**
      * The blue component of the RGB color.
      */
     b: number;
     /**
      * Creates an RGB color object.
      * @param r - The red component of the RGB color as a float from 0 to 1.
      * @param g - The green component of the RGB color as a float from 0 to 1.
      * @param b - The blue component of the RGB color as a float from 0 to 1.
      */
     constructor(r: number, g: number, b: number);
     /**
      * Gets a string listing the RGB color components.
      * @returns A list of the components.
      */
     toString(): string;
     /**
      * Clones the current RGB color's values into a mutable RGB color object.
      * @returns a mutable RGB color with the same r, g, b values.
      */
     clone(): Color;
     /**
      * Converts an RGB color to an HSV (hue, saturation, value) 3D vector.
      * @returns A 3D vector, where x is the hue, y is the saturation, and z is the value of the color.
      */
     toHSV(): Vec3;
     /**
      * Converts an RGB color to a Hex color code.
      * @returns The hex color code of the color.
      */
     toHex(): `#${string}`;
     /**
      * Converts a hex code string to a Color.
      * @param hex - A six-character hex code string prefixed with #, ie: "#ff0000".
      * @returns A Color representing the hex value.
      */
     static fromHex(hex: string): Color;
     /**
      * Gets the values of the current RGB color object as a 3D vector.
      */
     toVec3(): Vec3;
     /**
      * Determines whether the current RGB color is the same as the specified RGB color.
      * @param color - The RGB color to compare.
      * @returns `true` if the r, g, b values are equal; `false` otherwise.
      */
     equals(color: Color): boolean;
     /**
      * Determines whether the current RGB color is approxiamately the same as the specified RGB color.
      * @param color - The RGB color to compare.
      * @param epsilon - The maxium difference in value to be considered equal.
      * @returns `true` if the colors are approximately equal; `false` othewise.
      */
     equalsApprox(color: Color, epsilon?: number): boolean;
     /**
      * Sets the current RGB color to the specified RGB color.
      * @param color - The specified RGB color.
      */
     copy(color: Color): this;
     /**
      * Creates an RGB color by adding an RGB color to the current RGB color.
      * @param color - The RGB color to add.
      * @returns A new RGB color.
      */
     add(color: Color): Color;
     /**
      * Adds an RGB color to the current RGB color, modifying the original color in place.
      * @param color - The RGB color to add.
      */
     addInPlace(color: Color): this;
     /**
      * Creates an RGB color by subtracting an RGB color from the current RGB color.
      * @param color - The color to subtract.
      * @returns A new RGB color.
      */
     sub(color: Color): Color;
     /**
      * Subtracts an RGB color from the current RGB color, modifying the original RGB color in place.
      * @param color - The RGB color to subtract.
      */
     subInPlace(color: Color): this;
     /**
      * Creates an RGB color by multiplying a scalar with each component of the current RGB color.
      * @param scalar - The scalar to multiply.
      * @returns A new RGB color.
      */
     mul(scalar: number): Color;
     /**
      * Performs a scalar multiplication on the current RGB color, modifying the original RGB color in place.
      * @param scalar - The value to scale the color by.
      */
     mulInPlace(scalar: number): this;
     /**
      * Creates an RGB color by multiplying each component of the current RGB color with the input RGB color's component.
      * @param color - The RGB color to multiply.
      * @returns A new RGB color.
      */
     componentMul(color: Color): Color;
     /**
      * Multiplies the current RGB color's components by the specified RGB color's components, modifying the original RGB color in place.
      * @param color - The RGB color to multiply by.
      */
     componentMulInPlace(color: Color): this;
     /**
      * Creates an RGB color by dividing each component of the current color by a scalar value.
      * @param scalar - The scalar to divide by.
      * @returns A new RGB color.
      */
     div(scalar: number): Color;
     /**
      * Divides an RGB color's components by a scalar value, modifying the original RGB color in place.
      * @param scalar - The value to scale the color by.
      */
     divInPlace(scalar: number): this;
     /**
      * Creates a red RGB color.
      */
     static get red(): Color;
     /**
      * Creates a green RGB color.
      */
     static get green(): Color;
     /**
      * Creates a blue RGB color.
      */
     static get blue(): Color;
     /**
      * Creates a white RGB color.
      */
     static get white(): Color;
     /**
      * Creates a black RGB color.
      */
     static get black(): Color;
     /**
      * Determines whether two RGB colors are equal.
      * @param colorA - The first RGB color to compare.
      * @param colorB - The second RGB color to compare.
      * @returns `true` if the RGB colors are equal, `false` otherwise.
      */
     static equals(colorA: Color, colorB: Color): boolean;
     /**
      * Determines whether two RGB colors are approximately equal.
      * @param colorA - The first RGB color to compare.
      * @param colorB - The second RGB color to compare.
      * @param epsilon - The maximum difference in value to be considered equal.
      * @returns `true` if the two RGB colors are approximatel equal, `false` otherwise.
      */
     static equalsApprox(colorA: Color, colorB: Color, epsilon?: number): boolean;
     /**
      * Adds two RGB colors, returning a new RGB color.
      * @param colorA - The first RGB color to add.
      * @param colorB - The second color to add.
      * @param outColor - The RGB color as a result of the operation. If not supplied, a new RGB color is created and returned.
      * @returns A new RGB color, if `outColor` is not supplied.
      */
     static add(colorA: Color, colorB: Color, outColor?: Color): Color;
     /**
      * Subtracts an RGB color from another RGB color, returning a new RGB color.
      * @param colorA - The RGB color to subtract from.
      * @param colorB - The RGB color to subtract.
      * @param outColor - The new color as a result of the operation. If not supplied, a new 3D vector is created and returned.
      * @returns A new RGB color, if `outColor` is not supplied.
      */
     static sub(colorA: Color, colorB: Color, outColor?: Color): Color;
     /**
      * Performs a scalar multiplication on an RGB color, returning a new RGB color.
      * @param color - The RGB color to scale.
      * @param scalar - The value to scale the RGB color by.
      * @param outColor - The new color as a result of the operation. If not supplied, a new 3D vector is created and returned.
      * @returns A new RGB color.
      */
     static mul(color: Color, scalar: number, outColor?: Color): Color;
     /**
      * Performs scalar division on an RGB color, returning a new RGB color.
      * @param color - The RGB color to scale.
      * @param scalar - The value to scale the RGB color by.
      * @param outColor - The new color as a result of the operation. If not supplied, a new 3D vector is created and returned.
      * @returns A new RGB color.
      */
     static div(color: Color, scalar: number, outColor?: Color): Color;
     /**
      * Creates a new RGB color from an HSV value.
      * @param hsv - The HSV color value to convert to RGB.
      * @returns A new RGB color.
      */
     static fromHSV(hsv: Vec3): Color;
 }
 /**
  * Defines the orientation of the x, y, z axis in space.
  */
 export declare enum EulerOrder {
     /**
      * The orientation is XYZ.
      */
     XYZ = "XYZ",
     /**
      * The orientation is YXZ.
      */
     YXZ = "YXZ",
     /**
      * The orientation is ZXY.
      */
     ZXY = "ZXY",
     /**
      * The orientation is ZYX.
      */
     ZYX = "ZYX",
     /**
      * The orientation is YZX.
      */
     YZX = "YZX",
     /**
      * The orientation is XZY.
      */
     XZY = "XZY"
 }
 /**
  * Clamps a value between a minimum value and a maximum value.
  * @param value - The value to clamp.
  * @param min - The minimum value.
  * @param max - The maxium value.
  * @returns The clamped value.
  */
 export declare function clamp(value: number, min: number, max: number): number;
 /**
  * Converts radians to degrees.
  * @param radians - The value in radians.
  * @returns The value in degrees.
  */
 export declare function radiansToDegrees(radians: number): number;
 /**
  * Converts degrees to radians.
  * @param degrees - The value in degrees.
  * @returns The value in radians.
  */
 export declare function degreesToRadians(degrees: number): number;
 /**
  * Represents a quaternion (a four-element vector defining the orientation of a 3D point in space).
  */
 export declare class Quaternion implements Comparable<Quaternion> {
     /**
      * The x component of the quaternion.
      */
     x: number;
     /**
      * The y component of the quaternion.
      */
     y: number;
     /**
      * The z component of the quaternion.
      */
     z: number;
     /**
      * The w component of the quaternion.
      */
     w: number;
     /**
      * Creates a quaternion.
      * @param x - The x component of the quaternion.
      * @param y - The y component of the quaternion.
      * @param z - The z component of the quaternion.
      * @param w - The w component of the quaternion.
      */
     constructor(x: number, y: number, z: number, w: number);
     /**
      * Gets a human-readable represention of the quaternion.
      * @returns a string representation of the quaternion.
      */
     toString(): string;
     /**
      * Creates a copy of the quaternion.
      * @returns The new quaternion.
      */
     clone(): Quaternion;
     /**
      * Converts the quaternion to an Euler angle in degrees.
      * @param order - The order of the resulting Vec3 defaults to XYZ.
      * @returns A Vec3 that represents the Euler angle (in degrees).
      */
     toEuler: (order?: EulerOrder) => Vec3;
     /**
      * Determines whether the quaternion is equal to another quaternion. A quaternion is equal to another
      * quaternion if its components are equal or if the negation of its components are equal.
      * @param quat - The quaternion to compare.
      * @returns True if the quaternion is equal to the other quaternion; otherwise, false.
      */
     equals(quat: Quaternion): boolean;
     /**
      * Determines whether the current quaternion is approximately equal to another quaternion. A quaternion is equal
      * to another quaternion if its components are equal or if the negation of its components are equal.
      * @param quat - The other quaternion.
      * @param epsilon - The maxium difference in values to consider approximately equal.
      * @returns true if the quaternion is approximately equal to the other quaternion; otherwise, false.
      */
     equalsApprox(quat: Quaternion, epsilon?: number): boolean;
     /**
      * Gets the axis of the rotation represented by the quaternion.
      * @returns The vector that represents the axis.
      */
     axis(): Vec3;
     /**
      * Gets the angle, in radians, of rotation represented by the quaternion.
      * @returns The angle in radians.
      */
     angle(): number;
     /**
      * Updates the values of the quaternion with the values of another quaterium.
      * @param quat - The quaternion to copy.
      * @returns The updated quaternion.
      */
     copy(quat: Quaternion): this;
     /**
      * Creates a quaternion that's the inverse of the current quaternion.
      * @returns The new quaternion.
      */
     inverse(): Quaternion;
     /**
      * Updates the current quaternion with its inverse values.
      * @returns The updated quaternion.
      */
     inverseInPlace(): this;
     /**
      * Gets a normalized copy of the current quaternion.
      * @returns The new quaternion.
      */
     normalize(): Quaternion;
     /**
      * Updates the current quaterion with its normalized values.
      * @returns The updated quaternion
      */
     normalizeInPlace(): this;
     /**
      * Gets a conjugated copy of the current quaternion.
      * @returns The new quaternion.
      */
     conjugate(): Quaternion;
     /**
      * Updates the current quaternion with its conjugated values.
      * @returns The updated quaterion.
      */
     conjugateInPlace(): this;
     /**
      * Multiplies the current quaternion by another quaternion and returns the result
      * as a new quaternion.
      * @param quat - The quaternion to use as the multiplier.
      * @returns The new quaternion.
      */
     mul(quat: Quaternion): Quaternion;
     /**
      * Updates the current quaternion by multiplying it by another quaternion.
      * @param quat - The quaternion to use as the multiplier.
      * @returns The current quaternion.
      */
     mulInPlace(quat: Quaternion): this;
     /**
      * Creates a zero element quaternion.
      * @returns The new quaternion.
      */
     static get zero(): Quaternion;
     /**
      * Creates a unit quaternion [0,0,0,1].
      * @returns The new quaternion.
      */
     static get one(): Quaternion;
     /**
      * Creates a quaternion representing a rotation around the X-axis. Axis is not normalized.
      * @returns The new quaternion.
      */
     static get i(): Quaternion;
     /**
      * Creates a quaternion representing a rotation around the Y-axis. The axis is not normalized.
      * @returns The new quaternion.
      */
     static get j(): Quaternion;
     /**
      * Creates a quaternion representing a rotation around the Z-axis. The axis is not normalized.
      * @returns The Z quaternion.
      */
     static get k(): Quaternion;
     /**
      * Determines whether two quaternions are equal.
      * A quaternion is equal to another quaternion if its components are equal or if the negation of its components are equal.
      * @param quatA - The first quaternion to compare.
      * @param quatB - The second quaternion to compare.
      * @returns true if the quaternions are equal; otherwise, false.
      */
     static equals(quatA: Quaternion, quatB: Quaternion): boolean;
     /**
      * Compares the approximate equality between two quaternions.
      * A quaternion is equal to another quaternion if its components are equal or if the negation of its components are equal.
      * @param quatA - The first quaternion to compare.
      * @param quatB - The second quaternion to compare.
      * @param epsilon - The maxium difference in values to consider approximately equal.
      * @returns true if the quaternions are approximately equal; otherwise, false.
      */
     static equalsApprox(quatA: Quaternion, quatB: Quaternion, epsilon?: number): boolean;
     /**
      * Creates a quaternion from a Euler angle.
      * @param euler - The Euler angle in degrees.
      * @param order - The order of the Euler angle. The default order is XYZ.
      */
     static fromEuler(euler: Vec3, order?: EulerOrder): Quaternion;
     /**
      * Creates a quaternion using forward and up 3D vectors.
      * @param forward - The forward direction of rotation; must be orthogonal to up.
      * @param up - The up direction of rotation; must be orthogonal to forward. The
      * default value is Vec3.up.

      * @param outQuat - The quaternion to perform the operation on. If not supplied,
      * a new quaternion is created and returned.
      * @returns The quaternion aimed at the provided 3D vectors.
      */
     static lookRotation(forward: Vec3, up?: Vec3, outQuat?: Quaternion): Quaternion;
     /**
      * Peforms slerp (spherical linear interpolation) between two quaternions.
      * @param left - The leftmost quaternion.
      * @param right - The rightmost quaternion.
      * @param amount - Defines the gradient to use for interpolation, clamped 0 to 1.
      * @param outQuat - The quaternion to perform the operation on. If this isn't supplied,
      * a new quaternion is created and returned.
      * @returns A new interpolated quaternion.
      */
     static slerp(left: Quaternion, right: Quaternion, amount: number, outQuat?: Quaternion): Quaternion;
     /**
      * Gets a quaternion that is the product of two quaternions.
      * @param quatA - The first quaternion to multiply.
      * @param quatB - The second uaternion to multiply.
      * @param outQuat - The quaternion to perform the operation on. If this isn't supplied,
      * a new quaternion is created and returned.
      * @returns A new quaternion.
      */
     static mul(quatA: Quaternion, quatB: Quaternion, outQuat?: Quaternion): Quaternion;
     /**
      * Creates a copy of a 3D vector and then rotates the copy by a quaternion.
      * @param quat - The quaternion to use for the rotation.
      * @param vec - 3D vector to copy.
      * @returns The new rotated 3D vector.
      */
     static mulVec3: (quat: Quaternion, vec: Vec3) => Vec3;
     /**
      * Creates a quaternion that is the conjugation of a quaternion.
      * @param quat - The quaternion to conjugate.
      * @param outQuat - The quaternion to perform the operation on. If this isn't supplied,
      * a new quaternion is created and returned.
      * @returns The new quaternion.
      */
     static conjugate(quat: Quaternion, outQuat?: Quaternion): Quaternion;
     /**
      * Gets a new quaternion that is the inverse of the specified quaternion.
      * @param quat - The specified quaternion.
      * @returns The new quaternion.
      */
     static inverse(quat: Quaternion): Quaternion;
     /**
      * Gets a new quaternion that is the normalized version of the specified quaternion.
      * @param quat - The specified quaternion.
      * @param outQuat - The quaternion to perform the operation on. If this isn't supplied,
      * a new quaternion is created and returned.
      * @returns The new normalized quaternion.
      */
     static normalize(quat: Quaternion, outQuat?: Quaternion): Quaternion;
     /**
      * Creates a quaternion from a 3D vector, where w is 0.
      * @param vec - The 3D vector to create the quaternion from.
      * @returns The new quaternion.
      */
     static fromVec3(vec: Vec3): Quaternion;
     /**
      * Creates a quaternion from an axis angle.
      * @param axis - The axis to rotate around.
      * @param angle - The angle, in radians of rotation.
      * @returns The new quaternion.
      */
     static fromAxisAngle: (axis: Vec3, angle: number) => Quaternion;
 }
 /**
  * A transform for an entity.
  */
 export declare class Transform {
     private _entity;
     /**
      * Constructs a new instance of the `Transform` class.
      *
      * @param entity - The entity to transform.
      */
     constructor(entity: Entity);
     /**
      * The position of the entity in the world.
      */
     position: HorizonProperty<Vec3>;
     /**
      * The scale of the entity in the world in the world.
      */
     scale: ReadableHorizonProperty<Vec3>;
     /**
      * The rotation component of the entity.
      */
     rotation: HorizonProperty<Quaternion>;
     /**
      * The local position of the entity relative to its parent.
      */
     localPosition: HorizonProperty<Vec3>;
     /**
      * Represents the local scale of the entity relative to its parent.
      */
     localScale: HorizonProperty<Vec3>;
     /**
      * Represents the rotation component of the entity relative to its parent.
      */
     localRotation: HorizonProperty<Quaternion>;
 }
 /**
  * Represents an entity in a world.
  */
 export declare class Entity {
     /**
      * The ID of the entity in the world.
      */
     readonly id: bigint;
     /**
      * The transform of the entity, which contains position, rotation, and
      * scale information.
      */
     readonly transform: Transform;
     /**
      * Creates an entity in the world.
      *
      * @param id - The ID of the entity to create.
      *
      * @returns The new entity.
      */
     constructor(id: bigint);
     /**
      * Gets a human-readable representation of the entity.
      *
      * @returns A string representing the entity.
      */
     toString(): string;
     /**
      * The human readable name of the entity.
      */
     name: ReadableHorizonProperty<string>;
     /**
      * The parent of the entity.
      */
     parent: ReadableHorizonProperty<Entity | null>;
     /**
      * The child entities of the entity.
      */
     children: ReadableHorizonProperty<Entity[]>;
     /**
      * The current position of the entity in the world.
      */
     position: HorizonProperty<Vec3>;
     /**
      * The current scale of the entity in the world.
      */
     scale: HorizonProperty<Vec3>;
     /**
      * The rotation component of the entity.
      */
     rotation: HorizonProperty<Quaternion>;
     /**
      * The color of the entity.
      */
     color: HorizonProperty<Color>;
     /**
      * The forward vector of the entity.
      */
     forward: ReadableHorizonProperty<Vec3>;
     /**
      * The up vector of the entity.
      */
     up: ReadableHorizonProperty<Vec3>;
     /**
      * The right vector of the entity.
      */
     right: ReadableHorizonProperty<Vec3>;
     /**
      * Indicates whether players with permission can see the entity. true if players
      * with permission can see the entity; false if no players can see the entity.
      *
      * @remarks
      *
      * You can set which players have permission using
      * {@link Entity.setVisibilityForPlayers}. It's important to note that if any
      * parent entity has its visibility set to false, the child entity will also be
      * invisible regardless of its own visibility setting.
      *
      * @example
      * ```
      * const wasVisible: boolean = cubeEntity.visible.get();
      * cubeEntity.visible.set(!wasVisible);
      * ```
      */
     visible: HorizonProperty<boolean>;
     /**
      * Indicates whether the entity is collidable. true if the entity is collidable;
      * otherwise, false.
      */
     collidable: HorizonProperty<boolean>;
     /**
      * Determines whether grabbing and physics is calculated. If simulated is off, then objects aren't
      * grabbable and aren't affected by physics.
      */
     simulated: HorizonProperty<boolean>;
     /**
      * The interaction mode for the entity, such as whether it's grabble or supports physics.
      */
     interactionMode: HorizonProperty<EntityInteractionMode>;
     /**
      * The {@link Player} that owns the entity.
      *
      * @remarks When changing entity ownership to a new player, you must transfer
      * the state of the entity as well or the state will be lost. You can use the
      * {@link Component.transferOwnership} and {@link Component.receiveOwnership}
      * methods to transfer an entity's state to a new owner. For more information,
      * see {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/local-scripting/maintaining-local-state-on-ownership-change | Maintaining local state on ownership change}.
      *
      * If ownership for a {@link Entity.parent} entity changes, the ownership change doesn't
      * automatically apply to any {@link Entity.children}.
      */
     owner: HorizonProperty<Player>;
     /**
      * Use tags to annotate entities with user-defined labels that identify and match objects.
      *
      * @remarks
      * You can have up to five tags per entity. Each tag can be up to 20 characters long.
      * Tags are case sensitive. Avoid using special characters. There is no check for duplicate tags.
      * Tags set or modified in TypeScript only presist for the session; they are not be stored in the
      * entity.
      *
      * @privateremarks
      * Tags are stored as a concatenated string due to entity states not supporting arrays yet.
      * We should migrate the gameplayTags field to an array as soon as that is possible.
      *
      * @example
      * ```
      * entity.tags.set(['tag1', 'tag2']);
      * const tags: Array<string> = entity.tags.get();
      * const containsTag1: boolean = entity.tags.contains('tag1');
      * entity.tags.remove('tag1');
      * entity.tags.clear();
      * ```
      */
     tags: HorizonSetProperty<string>;
     /**
      * Returns a list of all script component instances attached to the entity and executing
      * in the same context as the entity.
      *
      * @remarks This method only returns script component instances if they're executing in
      * the same context as the entity, such as on the same server or on a particular client.
      *
      * Avoid using this method in {@link Component.prestart} as other script component
      * instances may not be instantiated.
      *
      * @param type - The type of components to return. Otherwise, if not provided, this method
      * returns components of any type.
      * @returns The script component instances of the specified type that are attached to
      * the entity.
      */
     getComponents<T extends Component<unknown, SerializableState> = Component>(type?: (new () => T) | null): T[];
     /**
      * Indicates whether the entity exists in the world. true if the entity exists in the
      * world; otherwise, it does not exist in the world.
      *
      * @returns A boolean that indicates whether the entity exists in the world.
      */
     exists(): boolean;
     /**
      * Cast an entity as its more specific subclass.
      *
      * @param entityClass - The subclass to cast entity to.
      */
     as<T extends Entity>(entityClass: Class<[bigint], T>): T;
     /**
      * Makes an Entity visible or hidden only for a set of players within a world instance.
      * @param players - An array of Player objects to set the visibility mode for.
      * @param mode - Indicates whether the entity is visible only to the specified players.
      *
      * @remarks
      * Even if a player's visibility is enabled with this method, they won't be able to
      * see the entity unless its `visible` property is set to `true`.
      *
      * @example
      * cubeEntity.setVisibilityForPlayers([myPlayer], PlayerVisibilityMode.VisibleTo);
      */
     setVisibilityForPlayers(players: Array<Player>, mode: PlayerVisibilityMode): void;
     /**
      * Makes the entity visible to all players in the world instance, which resets any
      * changes made by calls to the {@link setVisibilityForPlayers} method.
      *
      * @remarks If a player joins your world instance after an object's visibility is
      * changed with the resetVisibilityForPlayers method, the object becomes
      * invisible to the new player. To ensure all new players can see the object upon
      * joining the world instance, you must use the resetVisibilityForPlayers method.
      * If a parent entity has its visibility set to false, the child entity also becomes
      * invisible regardless of its own visibility setting.
      *
      * @example
      * cubeEntity.resetPlayerVisibilityList();
      */
     resetVisibilityForPlayers(): void;
     /**
      * Indicates whether the entity is visible to the player.
      *
      * @param player - The player to check the view permission for.
      *
      * @returns `true` if the player has permission to view the entity, `false` otherwise.
      *
      * @remarks
      * The return value isn't affected by the `visible` property. For a player to
      * view an entity, the entity must be visible (the `visible` property on the
      * entity is `true`), and the user must have permission to view the entity
      * (this function returns `true`).
      *
      * @example
      * ```
      * const playerHasViewPermission: boolean = cubeEntity.isVisibleTo(player);
      * const isTrulyVisible: boolean = playerHasViewPermission && cubeEntity.visible.get();
      * ```
      */
     isVisibleToPlayer(player: Player): boolean;
     /**
      * Rotates an entity to look at a point.
      *
      * @param target - The target for the entity to look at.
      * @param up - The up direction of the rotation. The default value is
      * {@link Vec3.up}.
      */
     lookAt(target: Vec3, up?: Vec3): void;
     /**
      * Moves every client instance of the entity relative to another entity.
      *
      * @param target - The entity to move towards.
      * @param relativePosition - The position for the client entity to move,
      * relative to the target entity.
      * @param space - Indicates whether relativePosition is a world or local
      * position.
      *
      * @remarks
      * We recommend that you use this operation in an update loop instead of in a
      * one-off call. Make sure that the client or server owns both the source and
      * target, as the operation might not work properly if they are owned by
      * different clients or servers.
      *
      */
     moveRelativeTo(target: Entity, relativePosition: Vec3, space?: Space): void;
     /**
      * Moves every client instance of the entity relative to a player.
      *
      * @param player - The entity to move towards.
      * @param bodyPart - The body part of the player.
      * @param relativePosition - The position for the client entity to move,
      * relative to the target entity.
      * @param space - Indicates whether the relativePosition is a world or a local
      * position.
      *
      * @remarks
      * We recommend that you use this operation in an update loop instead of in a
      * one-off call. Make sure that the client or server owns both the source and
      * target, as the operation might not work properly if they are owned by
      * different clients or servers.
      */
     moveRelativeToPlayer(player: Player, bodyPart: PlayerBodyPartType, relativePosition: Vec3, space?: Space): void;
     /**
      * Rotates every client instance of the entity relative to another entity.
      *
      * @param target - The entity to rotate around.
      * @param relativeRotation - The rotation relative to the target.
      * @param space - Indicates whether relativeRotation is a world or a local
      * rotation.
      *
      * @remarks
      * We recommend that you use this operation in an update loop instead of in a
      * one-off call. Make sure that the client or server owns both the source and
      * target, as the operation might not work properly if they are owned by
      * different clients or servers.
      */
     rotateRelativeTo(target: Entity, relativeRotation: Quaternion, space?: Space): void;
     /**
      * Rotates every client instance of the entity relative to a player.
      *
      * @param player - The player for the entity to rotate around.
      * @param bodyPart - The body part of the player.
      * @param relativeRotation - The rotation relative to the player.
      * @param space - Indicates whether the relativeRotation is a world or a local
      * rotation.
      *
      * @remarks
      * We recommend that you use this operation in an update loop instead of in a
      * one-off call. Make sure that the client or server owns both the source and
      * target, as the operation might not work properly if they are owned by
      * different clients or servers.
      */
     rotateRelativeToPlayer(player: Player, bodyPart: PlayerBodyPartType, relativeRotation: Quaternion, space?: Space): void;
 }
 /**
  * A Spawn Point gizmo, which you can use to teleport players to a
  * location in a world using a fade-out/fade-in transition.
  *
  * @remarks
  * For more information about using the Spawn Point gizmo, see
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/tutorials/multiplayer-lobby-tutorial/module-5-entering-the-match | Spawn Points}
  * guide.
  */
 export declare class SpawnPointGizmo extends Entity {
     /**
      * Creates a human-readable representation of the SpawnPointGizmo.
      *
      * @returns A string representation of the `SpawnPointGizmo`.
      */
     toString(): string;
     /**
      * The gravity for players spawned using this gizmo.
      *
      * @remarks
      * Range = (0, 9.81)
      */
     gravity: HorizonProperty<number>;
     /**
      * The speed for players spawned using this gizmo.
      *
      * @remarks
      * Range = (0, 45)
      */
     speed: HorizonProperty<number>;
     /**
      * Teleports a player to the spawn point.
      *
      * @param player - The player to teleport.
      */
     teleportPlayer(player: Player): void;
 }
 /**
  * Represents a text label in the world.
  */
 export declare class TextGizmo extends Entity {
     /**
      * Creates a human-readable representation of the entity.
      * @returns A string representation of the `TextGizmo`.
      */
     toString(): string;
     /**
      * The content to display in the text label.
      *
      * Note: if the content was previously set with `localizableText`, the getter
      * of this property will return the localized string in the language of the
      * local player. Do not use the returned text in attributes shared with other
      * players. Other player might use differnet languages, and only
      * LocalizableText object will be localized.
      */
     text: HorizonProperty<string>;
 }
 /**
  * Represents a Trigger in the world.
  */
 export declare class TriggerGizmo extends Entity {
     /**
      * Creates a human-readable representation of the entity.
      * @returns A string representation
      */
     toString(): string;
     /**
      * Whether the Trigger is enabled.
      */
     enabled: WritableHorizonProperty<boolean>;
 }
 /**
  * The settings for {@link ParticleGizmo.start | playing} a particle effect.
  *
  * @remarks
  * fromStart - true to play the effect from the beginning even if already playing.
  * Otherwise, the effect doesn't play if already playing.
  *
  * players - The array of players to apply the change to.
  *
  * oneShot - If true, the effect emits a new particle that plays until its
  * full duration completes. This does not interfere with other play interactions.
  */
 export declare type ParticleFXPlayOptions = {
     fromStart?: boolean;
     players?: Array<Player>;
     oneShot?: boolean;
 };
 /**
  * The settings for {@link ParticleGizmo.stop | ending} particle effect playback.
  *
  * @remarks
  * players - The array of players to apply the change to.
  */
 export declare type ParticleFXStopOptions = {
     players?: Array<Player>;
 };
 /**
  * Represents a particle effect in the world.
  */
 export declare class ParticleGizmo extends Entity {
     /**
      * Creates a human-readable representation of the entity.
      * @returns A string representation of the entity.
      */
     toString(): string;
     /**
      * Plays the particle effect.
      *
      * @param options - Controls how the effect is played.
      */
     play(options?: ParticleFXPlayOptions): void;
     /**
      * Stops the particle effect.
      *
      * @param options - The options that control how the effect is stopped.
      */
     stop(options?: ParticleFXStopOptions): void;
 }
 /**
  * Represents a trail in the world.
  */
 export declare class TrailGizmo extends Entity {
     /**
      * Creates a human-readable representation of the entity.
      * @returns A string representation of the entity.
      */
     toString(): string;
     /**
      * Plays the trail effect.
      */
     play(): void;
     /**
      * Stops the trail effect.
      */
     stop(): void;
     /**
      * The width of the trail, in meters.
      */
     width: HorizonProperty<number>;
     /**
      * The length of the trail, in meters.
      */
     length: HorizonProperty<number>;
 }
 /**
  * Determines whether sound from an {@link AudioGizmo} is audible to specific
  * players.
  */
 export declare enum AudibilityMode {
     /**
      * The sound is audible.
      */
     AudibleTo = 0,
     /**
      * The sound is inaudible.
      */
     InaudibleTo = 1
 }
 /**
  * Provides {@link AudioGizmo} playback options for a set of players.
  *
  * @param fade - The duration, in seconds, that it takes for the audio to fade in or fade out.
  * @param players - Only plays the audio for the specified players.
  * @param audibilityMode - Indicates whether the audio is audible to the specified players.
  * See {@link AudibilityMode} for more information.
  *
  * @remarks
  * fade - The duration, in seconds, that it takes for the audio to fade in or fade out.
  *
  * players - Only plays the audio for the specified players.
  *
  * audibilityMode - Indicates whether the audio is audible to the specified players.
  * See {@link AudibilityMode} for more information.
  */
 export declare type AudioOptions = {
     fade: number;
     players?: Array<Player>;
     audibilityMode?: AudibilityMode;
 };
 /**
  * Represents an audio gizmo in the world.
  */
 export declare class AudioGizmo extends Entity {
     /**
      * Creates a human-readable representation of the audio gizmo.
      *
      * @returns A string representation of the audio gizmo.
      */
     toString(): string;
     /**
      * The audio volume, which ranges from 0 (no sound) to 1 (full volume).
      */
     volume: WritableHorizonProperty<number, AudioOptions>;
     /**
      * The audio pitch in semitones, which ranges from -12 to 12.
      */
     pitch: WritableHorizonProperty<number>;
     /**
      * Plays an AudioGizmo sound.
      *
      * @param audioOptions - Controls how the audio is played.
      *
      * @example
      * ```
      * const soundGizmo = this.props.sfx.as(hz.AudioGizmo);
      * const audioOptions: AudioOptions = {fade: 1, players: [player1, player2]};
      * soundGizmo.play(audioOptions);
      * ```
      */
     play(audioOptions?: AudioOptions): void;
     /**
      * Pauses an AudioGizmo sound.
      *
      * @param audioOptions - Controls how the audio is paused.
      *
      * @example
      * ```
      * const soundGizmo = this.props.sfx.as(hz.AudioGizmo);
      * const audioOptions: AudioOptions = {fade: 1, players: [player1, player2]};
      * soundGizmo.pause(audioOptions);
      * ```
      */
     pause(audioOptions?: AudioOptions): void;
     /**
      * Stops an AudioGizmo sound.
      *
      * @param audioOptions - Controls how the audio is played.
      *
      * @example
      * ```
      * const soundGizmo = this.props.sfx.as(hz.AudioGizmo);
      * const audioOptions: AudioOptions = {fade: 1, players: [player1, player2]};
      * soundGizmo.stop(audioOptions);
      * ```
      */
     stop(audioOptions?: AudioOptions): void;
 }
 /**
  * Options for launching a projectile.
  *
  * @param speed - speed in meters per second. Defaults to 20m/s
  * @param duration - max lifetime of projectile in seconds. Defaults to infinity
  */
 export declare type LaunchProjectileOptions = {
     speed: number;
     duration?: number;
 };
 /**
  * Represents a projectile launcher in the world.
  */
 export declare class ProjectileLauncherGizmo extends Entity {
     /**
      * Creates a human-readable representation of the entity.
      * @returns A string representation
      */
     toString(): string;
     /**
      * The gravity applied to the projectile.
      */
     projectileGravity: WritableHorizonProperty<number>;
     /**
      * Launches a projectile.
      *
      * @deprecated use `launch` instead.
      *
      * @param speed - Optional. The speed at which the projectile will launch from the launcher.
      */
     launchProjectile(speed?: number): void;
     /**
      * Launches a projectile with options.
      *
      * @param options - Optional options for launching projectile
      */
     launch(options?: LaunchProjectileOptions): void;
 }
 /**
  * Represents an achievement gizmo in the world.
  */
 export declare class AchievementsGizmo extends Entity {
     /**
      * Creates a human-readable representation of the entity.
      * @returns A string representation
      */
     toString(): string;
     /**
      * Displays the achievements.
      *
      * @param achievementScriptIDs - List of achievement script IDs.
      */
     displayAchievements(achievementScriptIDs: Array<string>): void;
 }
 /**
  * Indicates how to display time in a world using the monetary gizmo.
  */
 export declare enum MonetizationTimeOption {
     /**
      * The time is displayed in seconds.
      */
     Seconds = "SECONDS",
     /**
      * The time is displayed in hours.
      */
     Hours = "HOURS",
     /**
      * The time is displayed in days.
      */
     Days = "DAYS"
 }
 /**
  * Represents the IWP (in-world purchase) seller gizmo in the world.
  */
 export declare class IWPSellerGizmo extends Entity {
     /**
      * Creates a human-readable representation of the entity.
      * @returns A string representation
      */
     toString(): string;
     /**
      * Indicates whether the player owns a specific item.
      *
      * @param player - The player to query.
      * @param item - The item to query.
      * @returns true if player owns the item, false otherwise.
      */
     playerOwnsItem(player: Player, item: string): boolean;
     /**
      * Indicates whether a player used a specific item.
      *
      * @param player - The player to query.
      * @param item - The item to query.
      * @returns true if player consumed the item, false otherwise.
      */
     playerHasConsumedItem(player: Player, item: string): boolean;
     /**
      * Gets the number of the items that the player owns.
      *
      * @param player - The player to query.
      * @param item - The item to query.
      * @returns The number of the items the player owns.
      */
     quantityPlayerOwns(player: Player, item: string): number;
     /**
      * Gets the time since a player consumed the item.
      *
      * @param player - The player that consumed the item.
      * @param item - The item the player consumed.
      * @param timeOption - The time units since the player purchased the item and
      * the item was consumed.
      * @returns The number of timeOption units since player consumed the item.
      */
     timeSincePlayerConsumedItem(player: Player, item: string, timeOption: MonetizationTimeOption): number;
     /**
      * Consumes a specific item owned by the player.
      *
      * @param player - The player that owns the item.
      * @param item - The item the player owns.
      */
     consumeItemForPlayer(player: Player, item: string): void;
 }
 /**
  * The type of layer in the world.
  */
 export declare enum LayerType {
     /**
      * The layer for players.
      */
     Player = 0,
     /**
      * The layer is for objects.
      */
     Objects = 1,
     /**
      * The layer is for both players and objects.
      */
     Both = 2
 }
 /**
  * The target type during a raycast collision.
  */
 export declare enum RaycastTargetType {
     /**
      * A player.
      */
     Player = 0,
     /**
      * An entity.
      */
     Entity = 1,
     /**
      * A static object.
      */
     Static = 2
 }
 declare type BaseRaycastHit = {
     /**
      * The distance between the raycast position and the hit point.
      */
     distance: number;
     /**
      * The position of the raycast hit.
      */
     hitPoint: Vec3;
     /**
      * The normal of the raycast hit.
      */
     normal: Vec3;
 };
 declare type StaticRaycastHit = BaseRaycastHit & {
     /**
      * The type of target a raycast has hit
      */
     targetType: RaycastTargetType.Static;
 };
 declare type EntityRaycastHit = BaseRaycastHit & {
     /**
      * The type of target a raycast has hit
      */
     targetType: RaycastTargetType.Entity;
     /**
      * The actual entity in the world the raycast has hit.
      */
     target: Entity;
 };
 declare type PlayerRaycastHit = BaseRaycastHit & {
     /**
      * The type of target a raycast has hit
      */
     targetType: RaycastTargetType.Player;
     /**
      * The actual player in the world the raycast has hit.
      */
     target: Player;
 };
 /**
  * The result of a {@link RaycastGizmo.raycast | raycast} collision.
  */
 export declare type RaycastHit = StaticRaycastHit | EntityRaycastHit | PlayerRaycastHit;
 /**
  * Represents a Raycast gizmo in the world.
  *
  * @remarks
  * A Raycast gizmo projects an invisible beam into a world to return information
  * about any objects it collides with.
  */
 export declare class RaycastGizmo extends Entity {
     /**
      * Creates a human-readable representation of the RaycastGizmo.
      * @returns A string representation of the RaycastGizmo.
      */
     toString(): string;
     /**
      * Casts a ray from the Raycast gizmo using the given origin and direction
      * and then retrieves collision information.
      *
      * @param origin - The starting point of the ray.
      * @param direction - The direction for the ray to travel.
      * @param options - The options for configuring the raycast operation.
      *
      * @returns The collision information.
      */
     raycast(origin: Vec3, direction: Vec3, options?: {
         layerType?: LayerType;
         maxDistance?: number;
     }): RaycastHit | null;
 }
 /**
  * Represents a dynamic lighting gizmo in the world, which provides lighting that's
  * calculated in real-time.
  */
 export declare class DynamicLightGizmo extends Entity {
     /**
      * Creates a human-readable representation of the DynamicLightGizmo.
      * @returns A string representation of the DynamicLightGizmo.
      */
     toString(): string;
     /**
      * Indicates whether the entity has a dynamic light effect on it. true to
      * enable dynamic lighting; otherwise, false.
      */
     enabled: HorizonProperty<boolean>;
     /**
      * The light intensity. 0 for least intense and 10 for most intense.
      */
     intensity: HorizonProperty<number>;
     /**
      * The light falloff distance. 0 for the least distance and 100 for the greatest
      * distance.
      */
     falloffDistance: HorizonProperty<number>;
     /**
      * The light spread. 0 for the least light spread (none) and 100 for the
      * greatest light spread.
      */
     spread: HorizonProperty<number>;
 }
 /**
  * Represents an AI Agent gizmo, which can use locomotion and pathfinding capabilities,
  * and optionally be embodied by an avatar.
  *
  * @remarks
  * For more information about using AI agents, see {@link NavMeshAgent} and the
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/desktop-editor/npcs/nav-mesh-agents | Nav Mesh Agents} guide.
  */
 export declare class AIAgentGizmo extends Entity {
     /**
      * Creates a human-readable representation of the AIAgentGizmo.
      * @returns A string representation of the AIAgentGizmo.
      */
     toString(): string;
 }
 /**
  * Indicates how physics is applied to an object in the world.
  */
 export declare enum PhysicsForceMode {
     /**
      * Add a continuous force to an object, using its mass. The acceleration = `Force * Time ^ 2 / Mass`.
      */
     Force = 0,
     /**
      * Add an instant force impulse to an object, using its mass. The acceleration = `Force * Time / Mass`.
      */
     Impulse = 1,
     /**
      * Add an instant velocity change to an object, ignoring its mass. The acceleration = `Force * Time`.
      */
     VelocityChange = 2
 }
 /**
  * The spring physics settings for an entity. Spring physics moves an entity
  * as if it were attached to a spring.
  *
  * @remarks
  * For more information, see {@link PhysicalEntity.springPushTowardPosition}
  * and {@link PhysicalEntity.springSpinTowardRotation}.
  *
  * stiffness: The stiffness of the spring, which controls the amount of
  * force applied to the object.
  *
  * damping: The damping ratio of the string, which reduces oscillation.
  *
  * axisIndependent: true if the object's motion is parallel to the
  * push direction; false otherwise.
  */
 export declare type SpringOptions = {
     stiffness: number;
     damping: number;
     axisIndependent: boolean;
 };
 /**
  * Defines the default values for spring physics when using the
  * {@link SpringOptions} type.
  *
  * @remarks
  * stiffness: 2
  *
  * damping: 0.5
  *
  * axisIndependent: true
  */
 export declare const DefaultSpringOptions: SpringOptions;
 /**
  * Represents an entity influenced by physical effects such as gravity, in the world.
  */
 export declare class PhysicalEntity extends Entity {
     /**
      * Gets a string representation of the entity.
      * @returns The human readable string representation of this entity.
      */
     toString(): string;
     /**
      * Whether the entity has a gravity effect on it.
      * If `true`, gravity has an effect, otherwise gravity does not have an effect.
      */
     gravityEnabled: WritableHorizonProperty<boolean>;
     /**
      * `true` if the physics system is blocked from interacting with the entity; `false` otherwise.
      */
     locked: HorizonProperty<boolean>;
     /**
      * The velocity of an object in world space, in meters per second.
      */
     velocity: ReadableHorizonProperty<Vec3>;
     /**
      * The angular velocity of an object in world space.
      */
     angularVelocity: ReadableHorizonProperty<Vec3>;
     /**
      * Applies a force at a world space point. Adds to the current velocity.
      * @param vector - The force vector.
      * @param mode - The amount of force to apply.
      */
     applyForce(vector: Vec3, mode: PhysicsForceMode): void;
     /**
      * Applies a local force at a world space point. Adds to the current velocity.
      * @param vector - The force vector.
      * @param mode - The amount of force to apply.
      */
     applyLocalForce(vector: Vec3, mode: PhysicsForceMode): void;
     /**
      * Applies a force at a world space point using a specified position as the center of force.
      * @param vector - The force vector.
      * @param position - The position of the center of the force vector.
      * @param mode - The amount of force to apply.
      */
     applyForceAtPosition(vector: Vec3, position: Vec3, mode: PhysicsForceMode): void;
     /**
      * Applies torque to the entity.
      * @param vector - The force vector.
      */
     applyTorque(vector: Vec3): void;
     /**
      * Applies a local torque to the entity.
      * @param vector - The force vector.
      */
     applyLocalTorque(vector: Vec3): void;
     /**
      * Sets the velocity of an entity to zero.
      */
     zeroVelocity(): void;
     /**
      * Pushes a physical entity toward a target position as if it's attached to a spring.
      * This should be called every frame and requires the physical entity's motion type to be interactive.
      *
      * @param position - The target position, or 'origin' of the spring
      * @param options - Additional optional arguments to control the spring's behavior.
      *
      * @example
      * ```
      * var physEnt = this.props.obj1.as(hz.PhysicalEntity);
      * this.connectLocalBroadcastEvent(hz.World.onUpdate, (data: { deltaTime: number }) => {
      *  physEnt.springPushTowardPosition(this.props.obj2.position.get(), {stiffness: 5, damping: 0.2});
      * })
      * ```
      */
     springPushTowardPosition(position: Vec3, options?: Partial<SpringOptions>): void;
     /**
      * Spins a physical entity toward a target rotation as if it's attached to a spring.
      * This should be called every frame and requires the physical entity's motion type to be interactive.
      *
      * @param rotation - The target quaternion rotation.
      * @param options - Additional optional arguments to control the spring's behavior.
      *
      * @example
      * ```
      * var physEnt = this.props.obj1.as(hz.PhysicalEntity);
      * this.connectLocalBroadcastEvent(hz.World.onUpdate, (data: { deltaTime: number }) => {
      *  physEnt.springSpinTowardRotation(this.props.obj2.rotation.get(), {stiffness: 10, damping: 0.5, axisIndependent: false});
      * })
      * ```
      */
     springSpinTowardRotation(rotation: Quaternion, options?: Partial<SpringOptions>): void;
 }
 /**
  * Represents an entity that a player can grab.
  */
 export declare class GrabbableEntity extends Entity {
     /**
      * Creates a human-readable representation of the GrabbableEntity.
      * @returns A string representation of the GrabbableEntity.
      */
     toString(): string;
     /**
      * Forces the player to hold the entity and attach it to a hand they control.
      * @param player - The player that grabs the entity.
      * @param hand - The player's hand that is grabbing the entity.
      * @param allowRelease - true if the player can release the entity
      * when they are holding it; otherwise, fals.
      */
     forceHold(player: Player, hand: Handedness, allowRelease: boolean): void;
     /**
      * Forces the player to release the entity.
      */
     forceRelease(): void;
     /**
      * Specifies the players that can grab the entity.
      * @param players - An array of players that can grab the entity.
      */
     setWhoCanGrab(players: Array<Player>): void;
 }
 /**
  * The location of an attachment point on a player.
  */
 export declare enum AttachablePlayerAnchor {
     /**
      * The attachment is at the head.
      */
     Head = "Head",
     /**
      * The attachment is at the torso.
      */
     Torso = "Torso"
 }
 /**
  * Represents an entity that can be attached to other entities.
  */
 export declare class AttachableEntity extends Entity {
     /**
      * Creates a human-readable representation of the object.
      * @returns A string representation of the object
      */
     toString(): string;
     /**
      * Attaches the entity to a player.
      * @param player - The player to attach the entity to.
      * @param anchor - The attachment point to use.
      */
     attachToPlayer(player: Player, anchor: AttachablePlayerAnchor): void;
     /**
      * Releases an attachment to a player.
      */
     detach(): void;
     /**
      * The socket attachment position offset applied to the `AttachableEntity` when using Anchor attachment mode.
      */
     socketAttachmentPosition: HorizonProperty<Vec3>;
     /**
      * The socket attachment rotation offset applied to the `AttachableEntity` when using Anchor attachment mode.
      */
     socketAttachmentRotation: HorizonProperty<Quaternion>;
 }
 /**
  * Represents an entity that that can be animated by a transform.
  */
 export declare class AnimatedEntity extends Entity {
     /**
      * Creates a human-readable representation of the AnimatedEntity.
      * @returns A string representation of the AnimatedEntity.
      */
     toString(): string;
     /**
      * Starts the animation for the entity.
      */
     play(): void;
     /**
      * Pauses the animation.
      */
     pause(): void;
     /**
      * Stop the animation.
      */
     stop(): void;
 }
 /**
  * The type of body part of a player.
  */
 export declare enum PlayerBodyPartType {
     /**
      * The body part is a head.
      */
     Head = 0,
     /**
      * The body part is a foot.
      */
     Foot = 1,
     /**
      * The body part is a torso.
      */
     Torso = 2,
     /**
      * The body part is a left hand.
      */
     LeftHand = 3,
     /**
      * The body part is a right hand.
      */
     RightHand = 4
 }
 /**
  * Indicates whether a player is left or right-handed.
  */
 export declare enum Handedness {
     /**
      * The player is left-handed.
      */
     Left = 0,
     /**
      * The player is right-handed.
      */
     Right = 1
 }
 /**
  * The strength of a haptic pulse.
  */
 export declare enum HapticStrength {
     /**
      * The player is not touching the controller, so no haptic pulse will be fired.
      */
     VeryLight = 0,
     /**
      * The player is touching the controller and should fire a light haptic.
      */
     Light = 1,
     /**
      * The player is touching the controller and should fire a medium haptic.
      */
     Medium = 2,
     /**
      * The player is touching the controller and should fire a strong haptic.
      */
     Strong = 3
 }
 /**
  * The sharpness of the haptic pulse.
  */
 export declare enum HapticSharpness {
     /**
      * The pulse is sharp.
      */
     Sharp = 0,
     /**
      * The pulse is medium.
      */
     Coarse = 1,
     /**
      * The pulse is soft.
      */
     Soft = 2
 }
 /**
  * The options for interacting with an entity.
  */
 export declare enum EntityInteractionMode {
     /**
      * The entity can be grabbed.
      */
     Grabbable = "Grabbable",
     /**
      * The entity supports physics and can be moved by script.
      */
     Physics = "Physics",
     /**
      * The entity can be grabbed and supports physics.
      */
     Both = "Both",
     /**
      * The entity cannot be grabbed, and does not support physics.
      * @privateRemarks
      * Or is there a different description? Any error thrown?
      */
     Invalid = "Invalid"
 }
 /**
  * Represents a player body part.
  */
 export declare class PlayerBodyPart {
     /**
      * The player that owns the body part.
      */
     protected readonly player: Player;
     /**
      * The type of the body part.
      */
     protected readonly type: PlayerBodyPartType;
     /**
      * Creates a `PlayerBodyPart`.
      * @param player - The player that owns the body part.
      * @param type - The type of the body part.
      */
     constructor(player: Player, type: PlayerBodyPartType);
     /**
      * The position of the body part relative to the player.
      */
     position: ReadableHorizonProperty<Vec3>;
     /**
      * The position of the body part relative to the player's torso.
      */
     localPosition: ReadableHorizonProperty<Vec3>;
     /**
      * The rotation of the body part relative to the player's body.
      */
     rotation: ReadableHorizonProperty<Quaternion>;
     /**
      * The local rotation of the body part relative to the player's torso.
      */
     localRotation: ReadableHorizonProperty<Quaternion>;
     /**
      * The forward direction of the body part.
      */
     forward: ReadableHorizonProperty<Vec3>;
     /**
      * The up direction of the body part.
      */
     up: ReadableHorizonProperty<Vec3>;
     /**
      * Gets the world or the local position of the body part.
      *
      * @param space - Indicates whether to get the world or local position
      * of the body part.
      * @returns The position of the body part in this space.
      */
     getPosition(space: Space): Vec3;
     /**
      * Gets the rotation or the local rotation of the body part.
      *
      * @param space - Indicates whether to get the world or local rotation of the body part.
      * @returns The rotation of the body part in this space.
      */
     getRotation(space: Space): Quaternion;
 }
 /**
  * A player's hand.
  */
 export declare class PlayerHand extends PlayerBodyPart {
     /**
      * The player handedness.
      */
     protected readonly handedness: Handedness;
     /**
      * Contructs a new `PlayerHand`.
      *
      * @param player - The player associated with the hand.
      * @param handedness - The player's handedness.
      */
     constructor(player: Player, handedness: Handedness);
     /**
      * Plays haptic feedback on the specified hand.
      *
      * @param duration - The duration of the feedback in MS.
      * @param strength - The strength of feedback to play.
      * @param sharpness - The sharpness of the feedback.
      */
     playHaptics(duration: number, strength: HapticStrength, sharpness: HapticSharpness): void;
 }
 /**
  * The VoIP (Voice over Internet Protocol) settings for the player.
  *
  * @remarks
  * Default: Players can hear normally.
  *
  * Global: All players can hear.
  *
  * Nearby: Only nearby players can hear.
  *
  * Extended: Players who are further away than normal can hear.
  *
  * Whisper: Only players next to the current player (closer than nearby) can hear.
  *
  * Mute: Only the current player can hear.
  *
  * Environment: The default VoIP settings for the world.
  */
 export declare const VoipSettingValues: {
     /**
      * Users can hear normally.
      */
     readonly Default: "Default";
     /**
      * All users can hear.
      */
     readonly Global: "Global";
     /**
      * Only nearby users can hear.
      */
     readonly Nearby: "Nearby";
     /**
      * Users who are further away than normal can hear.
      */
     readonly Extended: "Extended";
     /**
      * Only users next to you (closer than nearby) can hear.
      */
     readonly Whisper: "Whisper";
     /**
      * No one but you can hear.
      */
     readonly Mute: "Mute";
     /**
      * The world's default VoIP settings.
      */
     readonly Environment: "Environment";
 };
 /**
  * The player's in-game voice chat setting.
  */
 export declare type VoipSetting = keyof typeof VoipSettingValues;
 /**
  * The type of device the player is using.
  */
 export declare enum PlayerDeviceType {
     /**
      * The player is using a VR device.
      */
     VR = "VR",
     /**
      * The player is using a mobile device.
      */
     Mobile = "Mobile",
     /**
      * The player is using an desktop device.
      */
     Desktop = "Desktop"
 }
 /**
  * The type of grip animation assigned to an avatar when holding an object.
  */
 export declare enum AvatarGripPose {
     /**
      * The Default grip type.
      */
     Default = "Default",
     /**
      * Held in a pistol grip.
      */
     Pistol = "Pistol",
     /**
      * Held in a shotgun grip.
      */
     Shotgun = "Shotgun",
     /**
      * Held in a rifle grip.
      */
     Rifle = "Rifle",
     /**
      * Held in an RPG grip.
      */
     RPG = "RPG",
     /**
      * Held in a sword grip.
      */
     Sword = "Sword",
     /**
      * Held in a torch grip.
      */
     Torch = "Torch",
     /**
      * Held in a shield grip.
      */
     Shield = "Shield",
     /**
      * Held in a fishing grip.
      */
     Fishing = "Fishing",
     /**
      * Generic grip for carrying lighter objects
      */
     CarryLight = "CarryLight",
     /**
      * Generic grip for carrying heavier objects
      */
     CarryHeavy = "CarryHeavy"
 }
 /**
  * Defines the currently available avatar grip pose animations.
  */
 export declare enum AvatarGripPoseAnimationNames {
     /**
      * Fire animation for the player.
      */
     Fire = "Fire",
     /**
      * Reload animation for the player.
      */
     Reload = "Reload",
     /**
      * Puts the player into a "Ready to throw" animation.
      */
     ReadyThrow = "ReadyThrow",
     /**
      * Puts the player into a "Charging up throw" animation.
      */
     ChargeThrow = "ChargeThrow",
     /**
      * Throw animation for the player.
      */
     Throw = "Throw",
     /**
      * Cancels the "ReadyThrow" or "ChargeThrow" animations.
      */
     CancelThrow = "CancelThrow"
 }
 /**
  * AnimationCallbackReason can return a number, which corresponds to one of these built-in animation reasons
  */
 export declare enum AnimationCallbackReasons {
     /**
      * The animation has started playing
      */
     Starting = 0,
     /**
      * The animation has started to stop
      */
     Stopping = 1
 }
 /**
  * a type containing all the different possible reasons why an animation callback may be called.
  */
 export declare type AnimationCallbackReason = AnimationCallbackReasons;
 /**
  * A callback used to signal changes in the pressed state of a player input
  * @param animation - The animation assset that triggered this callback.
  * @param reason - The reason why this callback has been triggered.  See AnimationCallbackReason
  */
 export declare type AnimationCallback = (animation: Asset, reason: AnimationCallbackReason) => void;
 /**
  * An optional list of options to supply when triggering a non-looping animation on an avatar
  * @param playRate - (Number) a speed multiplier used to control how fast this animation should play.  If unset, defaults to 1.0
  * @param looping - (boolean) if true, the animation will play repeatedly, otherwise it'll play just once. fadeoutDuration has no affect if looping is set to true. If unset, defaults to false
  * @param fadeInDuration - (Number) how long should it take for this animation to blend in?   If unset, defaults to 0.0 (snaps instantly)
  * @param fadeoutDuration - (Number) how long should it take for this animation to blend out once it has completed?   If unset, defaults to 0.0 (snaps instantly)
  * @param callback - (AnimationCallback) A callback that's triggered whenever an AnimationCallbackReason occurs
  */
 export declare type PlayAnimationOptions = {
     playRate?: number;
     looping?: boolean;
     fadeInDuration?: number;
     fadeOutDuration?: number;
     callback?: AnimationCallback;
 };
 /**
  * An optional list of options to supply when stopping an animation on an avatar
  * @param fadeOutDuration - (Number) how long should it take for this animation to blend out?  Defaults to 0.0 (snaps instantly)
  * @param callback - (AnimationCallback) A callback that's triggered whenever a AnimationCallbackReason occurs
  */
 export declare type StopAnimationOptions = {
     fadeOutDuration?: number;
 };
 /**


 /**
  * Options to specify when enabling {@link Player.setAimAssistTarget | Aim Assist}.
  *
  * @remarks
  * assistanceStrength - The intensity of the pulling force towards
  * the Aim Assist target, in degrees of camera rotation per second. The default
  * value is 10.
  *
  * targetSize - The size of the target used to determine whether the
  * assistance forces apply, in meters. A bigger target causes the
  * assistance to apply when the aiming reticle (center of the screen) is
  * farther away from the center of the target. The default value is 4.
  *
  * noInputGracePeriod - The duration in seconds after which the aim
  * assistance stops being applied when no input is received. 0 = infinite. The
  * default value is 1.
  */
 export declare type AimAssistOptions = {
     /**
      * The intensity of the pulling force towards the Aim Assist target, in degrees of camera rotation per second.
      * Default value is 10.
      */
     assistanceStrength?: number;
     /**
      * The size of the target used to decide whether the assistance forces apply, in meters. A bigger target will cause the assistance to kick-in when the aiming reticle (center of the screen) is farther away from the center of the target.
      * Default value is 4.
      */
     targetSize?: number;
     /**
      * The duration in seconds after which the aim assistance stops being applied when no input is received. 0 = infinite.
      * Default value is 1.
      */
     noInputGracePeriod?: number;
 };
 /**
  * Represents a player in the world.
  */
 export declare class Player {
     /**
      * The player's ID.
      */
     readonly id: number;
     /**
      * Creates a player in the world.
      * @param id - The ID of the player.
      * @returns The new player.
      */
     constructor(id: number);
     /**
      * Creates a human-readable representation of the player.
      * @returns A string representation of the player.
      */
     toString(): string;
     /**
      * The player's head.
      */
     head: PlayerBodyPart;
     /**
      * The player's torso.
      */
     torso: PlayerBodyPart;
     /**
      * The player's foot.
      */
     foot: PlayerBodyPart;
     /**
      * The player's left hand.
      */
     leftHand: PlayerHand;
     /**
      * The player's right hand.
      */
     rightHand: PlayerHand;
     /**
      * The player's position relative to the world origin.
      */
     position: HorizonProperty<Vec3>;
     /**
      * The player's rotation relative to the world origin.
      */
     rotation: ReadableHorizonProperty<Quaternion>;
     /**
      * The player's forward direction relative to the world origin.
      */
     forward: ReadableHorizonProperty<Vec3>;
     /**
      * The player's up direction relative to the world origin.
      */
     up: ReadableHorizonProperty<Vec3>;
     /**
      * The player's name displayed in the game.
      */
     name: ReadableHorizonProperty<string>;
     /**
      * The index in the list of all players in the world.
      * @remarks
      * When joing a world, each player is assigned an index, which ranges from 0 (the first player)
      * to `Max Players - 1`. Use the index value to keep track of players and get a Player object using
      * {@link world.getPlayerFromIndex}.
      */
     index: ReadableHorizonProperty<number>;
     /**
      * The player's velocity relative to the origin, in meters per second, due to physics and not
      * locomotion input.
      */
     velocity: HorizonProperty<Vec3>;
     /**
      * The player's gravity before simulation.
      */
     gravity: HorizonProperty<number>;
     /**
      * Indicates whether the player is grounded (touching a floor).
      * If a player is grounded then gravity has no effect on their velocity.
      * @returns true if the player is grounded; otherwise, false.
      */
     isGrounded: ReadableHorizonProperty<boolean>;
     /**
      * The speed at which the player moves.
      * @privateRemarks
      * What are the units? Range?
      */
     locomotionSpeed: WritableHorizonProperty<number>;
     /**
      * The speed applied to a player when they jump, in meters per second.
      * Setting this to 0 effectively disables a player's ability to jump.
      *
      * @remarks
      *
      * Default value is 4.3.
      * jumpSpeed must be a value between 0 and 45.
      * `jumpSpeed.set` can be called on any player from any context, but
      * `jumpSpeed.get` will throw an error unless it's called from a
      * local script attached to an object owned by the player in question.
      */
     jumpSpeed: HorizonProperty<number>;
     /**
      * Gets the type of device the player is using.
      *
      * @remarks New device types may be added in the future, so you should handle
      * this property with a switch statement.
      */
     deviceType: ReadableHorizonProperty<PlayerDeviceType>;
     /**
      * Indicates whether a player is in build mode.
      *
      * @remarks Build mode means the player is editing the world. The alternative,
      * preview mode, is when they're playing the world.
      */
     isInBuildMode: ReadableHorizonProperty<boolean>;
     /**
      * Applies a force vector to the player.
      * @param force - The force vector applied to the player's body.
      * @privateRemarks
      * Do we have any units? Ranges? Usage guidelines?
      */
     applyForce(force: Vec3): void;
     /**
      * Specifies whether physical hands can collide with objects.
      * @param collideWithDynamicObjects - Indicates whether physical hands can collide with dynamic objects.
      * @param collideWithStaticObjects - Indicates whether physical hands can collide with static objects.
      */
     configurePhysicalHands(collideWithDynamicObjects: boolean, collideWithStaticObjects: boolean): void;
     /**
      * Sets the VOIP setting for the player.
      * @param setting - The VOIP setting to use.
      */
     setVoipSetting(setting: VoipSetting): void;
     /**
      * Indicates whether a player has completed an achievement.
      * @param achievementScriptID - The scriptID of the achievement. This can be accessed
      * and set on the Achievements page in the VR creator UI.
      * @returns `true` if the player has the achievement, `false` otherwise.
      *
      * @example
      * var WonAGameAchievementScriptID = "wonAGame"
      * var hasAchievement = player.hasCompletedAchievement(WonAGameAchievementScriptID)
      */
     hasCompletedAchievement(achievementScriptID: string): boolean;
     /**
      * Specifies whether the player's achievement is complete.
      * @param achievementScriptID - The scriptID of the achievement. This can be accessed/set on the Achievements page in the VR creator UI.
      * @param complete - `true` sets the achievement to complete; `false` sets the achievement to incomplete.
      *
      * @example
      * ```
      * var WonAGameAchievementScriptID = "wonAGame"
      * player.setAchievementComplete(WonAGameAchievementScriptID, true)
      * ```
      */
     setAchievementComplete(achievementScriptID: string, complete: boolean): void;
     /**
      * Enables Aim Assistance on a target. This generates a force pulling the cursor
      * towards a target when the aim cursor approaches it.
      *
      * @remarks This method must be called on a local player and has no effect on VR
      * players.
      *
      * @param target - The target that receives Aim Assistance.
      * @param options - The options to use when applying Aim Assistance.
      */
     setAimAssistTarget(target: Player | Entity | Vec3, options?: AimAssistOptions): void;
     /**
      * Disables the Aim Assistance by clearing the current target.
      * This method must be called on a local player.
      * This method has no effect on VR players.
      */
     clearAimAssistTarget(): void;
     /**
      * Triggers a one shot {@link AvatarGripPose} animation by name.
      * @param avatarGripPoseAnimationName - The avatar grip pose animation to play.
      *
      * @example
      * ```
      * player.playAvatarGripPoseAnimationByName(AvatarGripPoseAnimationNames.Fire)
      * ```
      */
     playAvatarGripPoseAnimationByName(avatarGripPoseAnimationName: string): void;
     /**
      * Overrides the existing HWXS avatar grip type, which is determined by the currently held grabbable.
      * @param avatarGripPose - The new pose to apply. This persists until cleared or another grip override is set.
      * For information on clearing an override, see {@link clearAvatarGripPoseOverride}.
      */
     setAvatarGripPoseOverride(avatarGripPose: AvatarGripPose): void;
     /**
      * Clears any override on an avatar grip pose, reverting it to the pose of the currently held grabbable.
      * @remarks For information on overriding an avatar grip pose, see {@link setAvatarGripPoseOverride}.
      */
     clearAvatarGripPoseOverride(): void;
     /**
      * Play an animation asset on this player's avatar once
      * @param asset - (Asset) The animation asset to play on the avatar
      * @param options - (PlayAnimationOptions) Optional options to control how the animation is handled
      */
     playAvatarAnimation(animation: Asset, options?: PlayAnimationOptions): void;
     /**
      * stops any previous avatar animation asset that was triggered
      * @param options - (StopAnimationOptions) Optional options to control how the animation is handled
      */
     stopAvatarAnimation(options?: StopAnimationOptions): void;
     /**

     /**
      * Removes focus from any in-world UI the player's camera is currently focused on. This
      * method only effects desktop and mobile.
      */
     unfocusUI(): void;
     /**
      * Enables {@link FocusedInteraction | Focused Interaction} mode for the player.
      *
      * @remarks
      * This method must be called on a local player and has no effect
      * on VR players.
      *
      * Focused Interaction mode replaces on-screen controls on web and mobile with
      * touch and mouse input that includes direct input access.
      *
      * {@link Player.exitFocusedInteractionMode} disables Focused Interaction mode.
      *
      * When Focused Interaction mode is enabled, you can recieve input data from the
      * {@link PlayerControls.onFocusedInteractionInputStarted},
      * {@link PlayerControls.onFocusedInteractionInputMoved}, and
      * {@link PlayerControls.onFocusedInteractionInputEnded} events.
      *
      * For more information, see the {@link https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-use-focused-interaction | Focused Interaction guide}.
      */
     enterFocusedInteractionMode(): void;
     /**
      * Disables {@link FocusedInteraction | Focused Interaction} mode for the player.
      *
      * @remarks
      * This method must be called on a local player and has no effect
      * on VR players.
      *
      * {@link Player.enterFocusedInteractionMode} enables Focused Interaction mode.
      *
      * When Focused Interaction mode is enabled, you can recieve input data from the
      * {@link PlayerControls.onFocusedInteractionInputStarted},
      * {@link PlayerControls.onFocusedInteractionInputMoved}, and
      * {@link PlayerControls.onFocusedInteractionInputEnded} events.
      *
      * For more information, see the {@link https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-use-focused-interaction | Focused Interaction guide}.
      */
     exitFocusedInteractionMode(): void;
     /**
      * The player's focused interaction.
      */
     focusedInteraction: FocusedInteraction;
     /**
      * Attempts throws the item held in the specified hand.
      * @param options - Options to adjust the throwing speed, yaw, pitch, and animation.
      */
     throwHeldItem(options?: Partial<ThrowOptions>): void;
 }
 /**
  * Options for customising the effect of calling the {@link Player.throwHeldItem} method.
  *
  * @remarks
  * `speed`: The speed of the object when launched.
  *
  * `pitch`: The pitch of the throwing force.
  *
  * `yaw`: The yaw of the throwing force.
  *
  * `playThrowAnimation`: `true` to play the throwing animation on web & mobile; `false`
  * otherwise. This value does not affect VR.
  *
  * `hand`: The hand to use for throwing.
  */
 export declare type ThrowOptions = {
     speed?: number | null;
     pitch?: number | null;
     yaw?: number | null;
     playThrowAnimation?: boolean | null;
     hand?: Handedness | null;
 };
 /**
  * The default values for the {@link ThrowOptions} type, which defines
  * the throwing behaviour when using the {@link Player.throwHeldItem} API.
  *
  * @remarks
  * speed: 20
  *
  * pitch: 10
  *
  * yaw: 0
  *
  * playThrowAnimation: true
  *
  * hand: {@link Handedness.Right}
  */
 export declare const DefaultThrowOptions: ThrowOptions;
 /**
  * Options for setting up and customizing visual feedback when players interact
  * with the world in Focused Interaction mode on web and mobile.
  *
  * @remarks
  * Focused Interaction mode replaces on-screen controls on web and mobile with
  * touch and mouse input that includes direct input access.
  *
  * You can enable and disable Focused Interaction mode with the
  * {@link Player.enterFocusedInteractionMode} and
  * {@link Player.exitFocusedInteractionMode} methods.
  *
  * When Focused Interaction mode is enabled, you can subscribe to the
  * {@link PlayerControls.onFocusedInteractionInputStarted},
  * {@link PlayerControls.onFocusedInteractionInputMoved}, and
  * {@link PlayerControls.onFocusedInteractionInputEnded} events.
  *
  * For more information, see the
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-use-focused-interaction | Focused Interaction guide}.
  */
 export declare class FocusedInteraction {
     /**
      * The current player.
      */
     protected readonly player: Player;
     /**
      * Creates a new Focused Interaction instance.
      */
     constructor(player: Player);
     /**
      * Toggle and customize the visual feedback to display when players use tap input
      * during {@link FocusedInteraction | Focused Interaction mode}.
      *
      * @param isEnabled - true to enable visual feedback for tap input;
      * false to disable it.
      * @param tapOptions - The options to customize the tap visuals.
      */
     setTapOptions(isEnabled: boolean, tapOptions?: Partial<FocusedInteractionTapOptions>): void;
     /**
      * Toggle and customize visual feedback trails that are displayed when players use
      * drag input during {@link FocusedInteraction | Focused Interaction mode}.
      *
      * @param isEnabled - true to enable trails; false to disable them.
      * @param trailOptions - Options to customize trail visuals.
      */
     setTrailOptions(isEnabled: boolean, trailOptions?: Partial<FocusedInteractionTrailOptions>): void;
 }
 /**
  * The {@link FocusedInteraction} options for visuals that are displayed when players
  * use tap input.
  *
  * @remarks See {@link DefaultFocusedInteractionTapOptions} for the default
  * values for this type.
  *
  * @param duration - The duration of the tap routine in seconds, between 0 and 2.
  * @param startScale - The starting scale of the tap visual, between 0 and 5.
  * @param endScale - The ending scale of the tap visual, between 0 and 5.
  * @param startRotation - The starting rotation of the tap visual.
  * @param endRotation - The ending rotation of the tap visual.
  * @param startColor - The starting color of the tap visual.
  * @param endColor - The ending color of the tap visual.
  * @param startOpacity - The starting opacity of the tap visual.
  * @param endOpacity - The ending opacity of the tap visual.
  */
 export declare type FocusedInteractionTapOptions = {
     duration: number;
     startScale: number;
     endScale: number;
     startRotation: number;
     endRotation: number;
     startColor: Color;
     endColor: Color;
     startOpacity: number;
     endOpacity: number;
 };
 /**
  * The default values for the {@link FocusedInteractionTapOptions} type, which defines
  * the {@link FocusedInteraction | visual} options when players use tap input.
  *
  * @remarks
  * duration: 0.5
  *
  * startScale: 0.4
  *
  * endScale: 1
  *
  * startRotation: 0
  *
  * endRotation: 0
  *
  * startColor: Color.white
  *
  * endColor: Color.white
  *
  * startOpacity: 0.4
  *
  * endOpacity: 0
  */
 export declare const DefaultFocusedInteractionTapOptions: FocusedInteractionTapOptions;
 /**
  * The {@link FocusedInteraction} options for visual trails that are displayed
  * when players use swipe and drag input.
  *
  * @param length - The length of the trail, between 0 and 5.
  * @param startWidth - The starting width of the trail, between 0 and 2.
  * @param endWidth - The end width of the trail, between 0 and 2.
  * @param startColor - The starting color of the trail.
  * @param endColor - The end color of the trail.
  * @param startOpacity - The starting opacity of the trail.
  * @param endOpacity - The end opacity of the trail.
  */
 export declare type FocusedInteractionTrailOptions = {
     length: number;
     startWidth: number;
     endWidth: number;
     startColor: Color;
     endColor: Color;
     startOpacity: number;
     endOpacity: number;
 };
 /**
  * The default values for the {@link FocusedInteractionTrailOptions} type, which
  * displays visual trails when players use swipe and drag input.
  *
  * @remarks
  * length: 0.25
  *
  * startWidth: 1
  *
  * endWidth: 0.1
  *
  * startColor: Color.white
  *
  * endColor: Color.white
  *
  * startOpacity: 0.4
  *
  * endOpacity: 0
  */
 export declare const DefaultFocusedInteractionTrailOptions: FocusedInteractionTrailOptions;
 /**
  * The additional options for the {@link Asset.fetchAsData} method.
  *
  * @remarks
  * Type parameters:
  *
  * `skipCache` - Indicates whether to ignore the local cache when fetching the asset data and
  * to instead fetch the data from the server. This option is only useful when fetching the latest
  * version of an asset while the world instance is live and the asset was previously updated in the
  * same world instance. Otherwise, you should not enable this option because retrieving unnecessary
  * data from the server will degrade performance when the cached data is already up to date.
  *
  * @typeParam skipCache - Indicates whether to ignore the local cache when fetching the asset data and
  * to instead fetch the data from the server. This option is only useful when fetching the latest
  * version of an asset while the world instance is live and the asset was previously updated in the
  * same world instance. Otherwise, you should not enable this option because retrieving unnecessary
  * data from the server will degrade performance when the cached data is already up to date.
  */
 export declare type FetchAsDataOptions = {
     skipCache: boolean;
 };
 /**
  * Defines the default values for the {@link Asset.FetchAsDataOptions} type.
  *
  * @remarks
  * Values:
  *
  * `skipCache: false`
  */
 export declare const DefaultFetchAsDataOptions: FetchAsDataOptions;
 /**
  * Represents an asset in Horizon Worlds.
  *
  * @remarks You can use assets along with the {@link World.deleteAsset} and
  * {@link World.spawnAsset} methods to instantiate and destroy objects at runtime. For
  * more information, see
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/asset-spawning/introduction-to-asset-spawning | Introduction to Asset Spawning}.
  */
 export declare class Asset {
     /**
      * The ID of the asset.
      */
     readonly id: bigint;
     /**
      * The version of the asset.
      */
     readonly versionId: bigint;
     /**
      * Creates an instance of {@link Asset}.
      * @param id - The ID of the asset.
      * @param versionId - The version of the asset.
      * @returns a new instance of the asset with the specified ID and version.
      */
     constructor(id: bigint, versionId?: bigint);
     /**
      * Creates an instance of {@link Asset} with the given ID.
      * @param assetClass - The class to instantiate for this asset.
      * @returns The new object.
      */
     as<T extends Asset>(assetClass: Class<[bigint, bigint], T>): T;
     /**
      * Creates a human-readable representation of the object.
      * @returns A string representation of the object
      */
     toString(): string;
     /**
      * Specifies data to serialize as JSON.
      *
      * @returns A valid object that can be serialized as JSON.
      */
     toJSON(): {
         id: bigint;
         versionId: bigint;
         _hzType: string;
     };
     /**
      * Retrieves the raw content of the asset, such as a text asset.
      *
      * @remarks Use this method to retrieve large amounts of data to populate the world. Not
      * all assets can be parsed as data. Before calling this function, you must upload the
      * asset to the asset library.
      *
      * The first time you fetch the asset content, it is loaded locally in the cache. This
      * increases the speed of additional fetch attempts, which retrieve the data from the
      * cache by default. In rare cases, the asset is updated outside of the world instance
      * while the instance is running. In that case, you may want to ignore the cache and
      * retrieve the updated data directly from the server.
      *
      * In the options parameter, this method provides an optional `skipCache` setting, which
      * enables you to ignore the local cache when retrieving the asset content. You should
      * not enable this feature unless the content was already updated while the world
      * instance is live; otherwise, it will degrade the performance of your world.
      *
      * @param options - The optional settings for the asset.
      *
      * @returns An AssetContentData object that stores the raw asset content and can
      * return it in formats that are easier to use.
      */
     fetchAsData(options?: Partial<FetchAsDataOptions>): Promise<AssetContentData>;
 }
 /**
  * Parses and stores the raw content of an asset.
  *
  * @remarks Not all assets can be retrieved as raw data. The asset is stored as a string
  * currently. If you are using this as a JSON regularly, we currently recommend that you
  * cache the JSON. Otherwise you should cache the object itself.
  */
 export declare class AssetContentData {
     private readonly assetContentData;
     /**
      * Constructs a new instance of this class.
      * @param assetContentData - The content of the Asset.
      */
     constructor(assetContentData: Array<string>);
     /**
      * Parse the raw contents of the asset and returns it as a JSON object.
      * template T Provides an interface type for the JSON object to return.
      * For example "interface JSONData \{ a: string; b: string; \}". Leave this as empty if you
      * want a generic JSON object.
      *
      * @returns A generic JSON object or a JSON object that uses a specific interface type.
      * returns null if the content doesn't use JSON or the provided generic type.
      */
     asJSON<T = JSON>(): T | null;
     /**
      * Gets the content of the Asset as a string.
      * @returns The raw content of the Asset as a string.
      */
     asText(): string;
 }
 /**
  * The available spawn states for the asset of an entity.
  */
 export declare enum SpawnState {
     /**
      * The asset data is not yet available.
      */
     NotReady = 0,
     /**
      * The asset data is available, but not loaded.
      */
     Unloaded = 1,
     /**
      * The asset data is being loaded.
      */
     Loading = 2,
     /**
      * The asset spawn operition is paused.
      */
     Paused = 3,
     /**
      * The load is complete and ready to be enabled,
      * but does not yet count towards capacity.
      */
     Loaded = 4,
     /**
      * The spawn is complete and the asset and ready for use.
      */
     Active = 5,
     /**
      * The spawned asset is in the process of unloading.
      */
     Unloading = 6,
     /**
      * The spawn controller is disposed and is not longer available for use.
      */
     Disposed = 7
 }
 /**
  * The possible errors encounted during asset spawning.
  */
 export declare enum SpawnError {
     /**
      * No error since the last attempt to spawn.
      */
     None = 0,
     /**
      * The spawn failed due to capacity limitations.
      */
     ExceedsCapacity = 1,
     /**
      * The spawn was cancelled by the user.
      */
     Cancelled = 2,
     /**
      * The specified asset ID was invalid
      * or that type of asset cannot be spawned.
      */
     InvalidAsset = 3,
     /**
      * The asset contains content which is not
      * approved for spawning in this world.
      */
     UnauthorizedContent = 4,
     /**
      * One of more of the request parameters is not valid.
      */
     InvalidParams = 5,
     /**
      * An unexpected error.
      */
     Unknown = 6
 }
 /**
  * The base class for a {@link SpawnController | spawn controller}.
  */
 export declare class SpawnControllerBase {
     /**
      * The ID of the asset that is currently being spawned. This is
      * a protected version of the {@link spawnID} property.
      */
     protected _spawnId: number;
     /**
      * The ID of the asset that is currently being spawned.
      */
     get spawnId(): number;
     /**
      * A list of entities contained in a spawned asset.
      */
     readonly rootEntities: ReadableHorizonProperty<Entity[]>;
     /**
      * The current spawn state of the spawn controller asset.
      */
     readonly currentState: ReadableHorizonProperty<SpawnState>;
     /**
      * The spawn state the spawn controller asset is attempting to reach.
      */
     readonly targetState: ReadableHorizonProperty<SpawnState>;
     /**
      * An error associated with the spawn operation.
      */
     readonly spawnError: ReadableHorizonProperty<SpawnError>;
     /**
      * Loads asset data if it's not previously loaded and then spawns the asset.
      *
      * @returns A promise that indicates whether the operation succeeded.
      */
     spawn(): Promise<void>;
     /**
      * Preloads the asset data for a spawn controller.
      *
      * @returns A promise that indicates whether the operation succeeded.
      */
     load(): Promise<void>;
     /**
      * Pauses the spawning process for a spawn controller.
      *
      * @returns A promise that indicates whether the operation succeeded.
      */
     pause(): Promise<void>;
     /**
      * Unloads the spawn controller asset data. If the spawn controller
      * isn't needed after the data is unloaded, call {@link dispose}.
      *
      * @returns A promise that indicates whether the operation succeeded.
      */
     unload(): Promise<void>;
     /**
      * Unloads the asset data of a spawn controller, and performs cleanup on
      * the spawn controller object.
      *
      * @remarks
      * This method is equivalent to {@link unload}, except afterwards the spawn controller
      * is no longer available for use and all of its methods throw errors. Call
      * `dispose` in order to clean up resources that are no longer needed.
      *
      * @returns A promise that indicates whether the dispose operation succeeded.
      */
     dispose(): Promise<unknown>;
 }
 /**
  * Represents a controller used to spawn assets.
  */
 export declare class SpawnController extends SpawnControllerBase {
     /**
      * The asset that is currently being spawned.
      */
     readonly asset: Asset;
     /**
      * Creates a controller for spawning an asset.
      *
      * @param asset - The asset to spawn.
      * @param position - The position of the asset in the world.
      * @param rotation - The rotation of the asset in the world.
      * @param scale - The scale of the asset in the world.
      */
     constructor(asset: Asset, position: Vec3, rotation: Quaternion, scale: Vec3);
 }
 declare enum WorldUpdateType {
     Update = 0,
     PrePhysicsUpdate = 1
 }
 /**
  * The sound and display settings for a popup message.
  *
  * @remarks
  * position: The offset of the popup message relative to the player's local position.
  *
  * fontSize: The size of the popup message.
  *
  * fontColor: The font color of the popup message.
  *
  * backgroundColor: The background color of the popup message.
  *
  * playSound: true to play the standard popup sound when displaying the popup
  * message; false otherwsie.
  *
  * showTimer: true to display the timer when displaying the popup message; false
  * otherwise.
  */
 export declare type PopupOptions = {
     position: Vec3;
     fontSize: number;
     fontColor: Color;
     backgroundColor: Color;
     playSound: boolean;
     showTimer: boolean;
 };
 /**
  * The default options for showing a popup when using the {@link PopupOptions}
  * type.
  *
  * @remarks
  * position: new Vec3(0, -0.5, 0)
  *
  * fontSize: 5
  *
  * fontColor: Color.black
  *
  * backgroundColor: Color.white
  *
  * playSound: true
  *
  * showTimer: false
  */
 export declare const DefaultPopupOptions: PopupOptions;
 /**
  * The location where a tooltip is anchored.
  */
 export declare enum TooltipAnchorLocation {
     /**
      * The tooltip is anchored at the left wrist.
      */
     LEFT_WRIST = "LEFT_WRIST",
     /**
      * The tooltip is anchored at the right wrist.
      */
     RIGHT_WRIST = "RIGHT_WRIST",
     /**
      * The tooltip is anchored at the torso.
      */
     TORSO = "TORSO"
 }
 /**
  * The settings for displaying a tooltip message.
  *
  * @remarks
  * tooltipAnchorOffset - The offset of the tooltip relative to the anchor
  * location.
  *
  * displayTooltipLine - true to display a line that connects the tooltip
  * to its attachment point; false otherwise.
  *
  * tooltipLineAttachmentProperties - The attachment point and offset of
  * the line that connects to the tooltip.
  *
  * playSound - true to play a sound when displaying the tooltip; false
  * otherwise.
  */
 export declare type TooltipOptions = {
     tooltipAnchorOffset?: Vec3;
     displayTooltipLine?: boolean;
     tooltipLineAttachmentProperties?: TooltipLineAttachmentProperties;
     playSound?: boolean;
 };
 /**
  * Determines how the line attached to a tooltip is displayed.
  *
  * @remarks
  * `lineAttachmentEntity` - The entity to attach to the line
  * (defaults to the anchor attachment point). You can also set this
  * to a `PlayerBodyPartType`.
  *
  * `lineAttachmentLocalOffset` - Adds a local `Vec3` offset on
  * the attachment point of the line.
  *
  * `lineAttachmentRounded` - `true` to round off the start and end edges
  * of the line; `false` otherwise.
  *
  * `lineChokeStart` - The distance where the line should start rendering,
  * after the attachment point.
  *
  * `lineChokeEnd` - The distance where the line should stop rendering,
  * before the line hits the tooltip.
  */
 export declare type TooltipLineAttachmentProperties = {
     lineAttachmentEntity?: Entity | PlayerBodyPartType;
     lineAttachmentLocalOffset?: Vec3;
     lineAttachmentRounded?: boolean;
     lineChokeStart?: number;
     lineChokeEnd?: number;
 };
 /**
  * The default values for showing a tooltip using the {@link TooltipOptions}
  * type.
  *
  * @remarks
  * tooltipAnchorOffset: 0, 0.4f, 0
  *
  * displayTooltipLine: true
  *
  * playSound: true
  */
 export declare const DefaultTooltipOptions: TooltipOptions;
 /**
  * Defines the valid matching operations that are available when using {@link World.getEntitiesWithTags | getEntitiesWithTags()}
  * to find world entities.
  */
 export declare enum EntityTagMatchOperation {
     /**
      * A single match encountered in an {@link Entity.tags | Entity's tags} results in that entity being included in the result. The match must be exact.
      */
     HasAnyExact = 0,
     /**
      * All of the sought tags must be present in an {@link Entity.tags | Entity's tags} for that entity to be included in the result. The match must be exact.
      */
     HasAllExact = 1
 }
 declare type PersistentSerializableStateNode = Vec3 | Entity | Quaternion | Color | number | boolean | string | bigint | null;
 declare type TransientSerializableStateNode = Player;
 /**
  * A state that can persist across sessions within persistent variables
  * for each player. Used with the {@link World.persistentStorage | getPlayerVariable}
  * and {@link World.persistentStorage | setPlayerVariable} methods.
  */
 export declare type PersistentSerializableState = {
     [key: string]: PersistentSerializableState;
 } | PersistentSerializableState[] | PersistentSerializableStateNode;
 /**
  * The entity state to transfer when entity ownership changes.
  *
  * @remarks
  * This type is used to transfer the state of an entity when its ownership
  * changes from one player to another. The state of an entity isn't
  * automatically transferred when its ownership changes. To transfer the state, you
  * can pass it to the new owner using SerializableState through the
  * {@link Component.transferOwnership} and {@link Component.receiveOwnership}
  * methods.
  *
  * For more information, see
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/local-scripting/maintaining-local-state-on-ownership-change | Maintaining local state on ownership change}.
  *
  * @privateRemarks
  * Be very, very careful if you are considering exposing the actual JSON
  * serialized state of this kind of object to the creator. The moment you
  * do so, some creator will begin using it and depending on its internal
  * implementation details, forever locking you in to support that specific
  * format of serializing this data.
  */
 export declare type SerializableState = {
     [key: string]: SerializableState;
 } | SerializableState[] | PersistentSerializableStateNode | TransientSerializableStateNode;
 /**
  * Represents a world.
  */
 export declare class World {
     private _localPlayer?;
     /**
      * The event broadcast on every frame.
      * @param deltaTime - The duration, in seconds, since the last update.
      */
     static readonly onUpdate: LocalEvent<{
         deltaTime: number;
     }>;
     /**
      * The event broadcast on every frame before physics.
      * @param deltaTime - The duration, in seconds, since the last update.
      */
     static readonly onPrePhysicsUpdate: LocalEvent<{
         deltaTime: number;
     }>;
     /**
      * Creates a human-readable representation of the world.
      * @returns A string representation of the world.
      */
     toString(): string;
     /**
      * Returns the current world ID.
      * @returns The world ID as a bigint
      */
     id: ReadableHorizonProperty<bigint>;
     /**
      * Resets the world's state.
      * This sets all entities back to their initial position, cancels all event and event listeners, and restarts scripts in the world.
      */
     reset(): void;
     /**
      * Gets the player corresponding to the server Horizon Worlds client.
      * @remarks This is particularly useful for Local Scripting to figure out if
      * a script is executing on some client other than the server. Note that a
      * server player is not physically present in the world and does not support
      * a number of standard features (such as name.get() or being moved) that normal
      * players do.
      * @returns The server player.
      */
     getServerPlayer(): Player;
     /**
      * Gets the player corresponding to the local Horizon Worlds client running
      * on some player's machine where this script is currently executing.
      * @remarks This is particularly useful for Local Scripting to figure out which
      * player's machine a local script is executing on. Note that if the local script
      * is executing on the server, this will return the server player.
      * @returns The local player.
      */
     getLocalPlayer(): Player;
     /**
      * Gets the player corresponding to the specified player index.
      * @param playerIndex - The index of the player. Retrievable with `player.index.get()`.
      * @returns The player corresponding to that index, or null if no player exists at that index.
      */
     getPlayerFromIndex(playerIndex: number): Player | null;
     /**
      * Gets all players currently in the world, not including the server player.
      * @returns An array of players in the world.
      */
     getPlayers(): Player[];
     /**
      * Gets all world entities containing the provided tags using the provided match operation.
      *
      * @remarks This is an expensive operation and should be used carefully.
      * @privateRemarks As is, this is a naive implementation with arbitrary limits. As the API matures we should consider alternative
      * data structures and algorithms for efficient search of entities with given tags.
      * @param tags - An array of tag names to match against. The comparison is case sensitive.
      * @param matchOperation - The match operation to run when searching for entities with given tags.
      * Defaults to {@link EntityTagMatchOperation.HasAnyExact}.
      * @returns An array of all of the entities matching the tags and operation.
      *
      * @example
      * ```
      * entityA.tags.set(['tag1', 'tag2', 'tag3']);
      * entityB.tags.set(['tag2', 'tag3', 'tag4']);
      * entitiesWithAnytags = this.world.getEntitiesWithTags(['tag1', 'tag2'], EntityTagMatchOperation.MatchAny); // returns entityA & entityB
      * entitiesWithAlltags = this.world.getEntitiesWithTags(['tag3', 'tag4'], EntityTagMatchOperation.MatchAll); // returns entityB
      * ```
      */
     getEntitiesWithTags(tags: string[], matchOperation?: EntityTagMatchOperation): Entity[];
     /**
      * Asynchronously spawns an asset.
      * @param asset - The asset to spawn.
      * @param position - The position where the asset is spawned.
      * @param rotation - The rotation of the spawned asset. If invalid, is replace with `Quaternion.one` (no rotation).
      * @param scale - The scale of the spawned asset.
      * @returns A promise resolving to all of the root entities within the asset.
      */
     spawnAsset(asset: Asset, position: Vec3, rotation?: Quaternion, scale?: Vec3): Promise<Entity[]>;
     /**
      * Removes a previously spawned asset from the world.
      * @param entity - The previously spawned entity.
      * @param fullDelete - if `true`, the entity must be the root object, thus deleting all sub-objects.
      * @returns A promise that resolves when the entity has been deleted.
      */
     deleteAsset(entity: Entity, fullDelete?: boolean): Promise<undefined>;
     /**
      * Called on every frame.
      * @param updateType - The type of update.
      * @param deltaTime - The duration, in seconds, since the last frame.
      */
     update(updateType: WorldUpdateType, deltaTime: number): undefined;
     /**
      * The matchmaking system for queueing players into the world.
      *
      * @remarks
      * `allowPlayerJoin` - Indicates whether players can join the world.
      */
     matchmaking: {
         /**
          * Indicates whether more players can join the world.
          *
          * @param allow - `true`, to allow more players to join the world; `false` to prevent additional
          * players from joining the world. The default value is `true`.
          */
         allowPlayerJoin(allow: boolean): Promise<void>;
     };
     /**
      * The leaderboards for the players in the world.
      */
     leaderboards: ILeaderboards;
     /**
      * A persistent storage object, which contains a set of functions that interact with player variables.
      *
      * For information about using player variables, see the
      * {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/getting-started/object-type-persistent-variables | Persistent Variables} guide.
      */
     persistentStorage: IPersistentStorage;
     /**
      * Basic UI functions for displaying popups and tooltips.
      *
      * @remarks For an example, see the {@link https://developers.meta.com/horizon-worlds/learn/documentation/tutorials/multiplayer-lobby-tutorial/module-4-starting-the-game#display-a-countdown-timer | Lobby tutorial}.
      */
     ui: IUI;
 }
 /**
  * The leaderboards for the players in the world.
  */
 export interface ILeaderboards {
     /**
      * Sets the leaderboard score for a player.
      * @param leaderboardName - The name of the leader board.
      * @param player - The player for whom the score is updated.
      * @param score - The new score.
      * @param override - If `true`, overrides the previous score; otherwise the previous score is retained.
      */
     setScoreForPlayer(leaderboardName: string, player: Player, score: number, override: boolean): void;
 }
 /**
  * A persistent storage object, which contains a set of functions that interact with player variables.
  *
  * For information about using player variables, see the
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/getting-started/object-type-persistent-variables | Persistent Variables} guide.
  */
 export interface IPersistentStorage {
     /**
      * Gets the value of a persistent player variable.
      * @param player - The player for whom to get the value.
      * @param key - The name of the variable to get.
      * @returns The value of the variable as some PersistentSerializableState, defaulting to number.
      */
     getPlayerVariable<T extends PersistentSerializableState = number>(player: Player, key: string): T extends number ? T : T | null;
     /**
      * Sets a persistent player variable
      * @param player - The player for whom to set the value.
      * @param key - The name of the variable to set.
      * @param value - The value to assign to the variable.
      */
     setPlayerVariable<T extends PersistentSerializableState>(player: Player, key: string, value: T): void;
 }
 /**
  * Basic UI functions for displaying popups and tooltips.
  *
  * @remarks For an example, see the {@link https://developers.meta.com/horizon-worlds/learn/documentation/tutorials/multiplayer-lobby-tutorial/module-4-starting-the-game#display-a-countdown-timer | Lobby tutorial}.
  */
 export interface IUI {
     /**
      * Shows a popup modal to all players.
      * @param text - The text to display in the popup.
      * @param displayTime - The duration, in seconds, to display the popup.
      * @param options - The configuration, such as color or position, for the popup.
      */
     showPopupForEveryone(text: string | i18n_utils.LocalizableText, displayTime: number, options?: Partial<PopupOptions>): void;
     /**
      * Shows a popup modal to a player.
      * @param player - The player to whom the popup is to displayed.
      * @param text - The text to display in the popup.
      * @param displayTime - The duration, in seconds, to display the popup.
      * @param options - The configuration, such as color or position, for the popup.
      */
     showPopupForPlayer(player: Player, text: string | i18n_utils.LocalizableText, displayTime: number, options?: Partial<PopupOptions>): void;
     /**
      * Shows a tooltip modal to a specific player
      * @param player - the player this tooltip displays for
      * @param tooltipAnchorLocation - the anchor point that is used to determine the tooltip display location
      * @param tooltipText - the message the tooltip displays
      * @param options - configuration for the tooltip (display line, play sounds, attachment entity, etc)
      */
     showTooltipForPlayer(player: Player, tooltipAnchorLocation: TooltipAnchorLocation, tooltipText: string | i18n_utils.LocalizableText, options?: Partial<TooltipOptions>): void;
     /**
      * Dismisses any active tooltip for the target player
      * @param player - the player that has their tooltip dismissed
      * @param playSound - determines if a default "close sound" should play when the tooltip is closed
      */
     dismissTooltip(player: Player, playSound?: boolean): void;
 }
 declare type PropTypeFromEnum<T> = T extends typeof PropTypes.Number ? number : T extends typeof PropTypes.String ? string : T extends typeof PropTypes.Boolean ? boolean : T extends typeof PropTypes.Vec3 ? Vec3 : T extends typeof PropTypes.Color ? Color : T extends typeof PropTypes.Entity ? Entity : T extends typeof PropTypes.Quaternion ? Quaternion : T extends typeof PropTypes.Player ? Player : T extends typeof PropTypes.Asset ? Asset : T extends typeof PropTypes.NumberArray ? Array<number> : T extends typeof PropTypes.StringArray ? Array<string> : T extends typeof PropTypes.BooleanArray ? Array<boolean> : T extends typeof PropTypes.Vec3Array ? Array<Vec3> : T extends typeof PropTypes.ColorArray ? Array<Color> : T extends typeof PropTypes.EntityArray ? Array<Entity> : T extends typeof PropTypes.QuaternionArray ? Array<Quaternion> : T extends typeof PropTypes.PlayerArray ? Array<Player> : T extends typeof PropTypes.AssetArray ? Array<Asset> : never;
 declare type AllPropTypes = (typeof PropTypes)[keyof typeof PropTypes];
 declare type NonNullablePropTypes = Exclude<AllPropTypes, NullablePropTypes>;
 declare type NullablePropTypes = typeof PropTypes.Entity | typeof PropTypes.Player | typeof PropTypes.Asset;
 /**
  * The properties for initializing a component.
  *
  * @remarks Used to provide input for instances in the UI.
  */
 export declare type PropsFromDefinitions<T> = {
     [K in keyof T]: T[K] extends never ? never : T[K] extends {
         type: NullablePropTypes;
         default?: never;
     } ? Readonly<PropTypeFromEnum<T[K]['type']>> | undefined : T[K] extends {
         type: NonNullablePropTypes;
         default?: PropTypeFromEnum<NonNullablePropTypes>;
     } ? Readonly<PropTypeFromEnum<T[K]['type']>> : never;
 };
 declare type GetPropsFromComponentOrPropsDefinition<T> = T extends ComponentWithoutConstructor<infer _U> ? PropsFromDefinitions<PropsDefinitionFromComponent<T>> : PropsFromDefinitions<T>;
 declare type ComponentWithoutConstructor<TPropsDefinition> = {
     propsDefinition?: TPropsDefinition;
 };
 /**
  * The base type of a {@link Component | component} that takes a prop definition. This
  * can be used to set default props for a base component.
  */
 export declare type ComponentWithConstructor<TPropsDefinition, S extends SerializableState = SerializableState> = ComponentWithoutConstructor<TPropsDefinition> & {
     new (): Component<ComponentWithConstructor<TPropsDefinition, S>, S>;
 };
 /**
  * A helper utility that derives prop types from a component class type.
  */
 export declare type PropsDefinitionFromComponent<T> = T extends ComponentWithoutConstructor<infer TPropsDefinition> ? Readonly<TPropsDefinition> : never;
 /**
  * The built-in CodeBlock events.
  *
  * @remarks
  * OnPlayerEnterTrigger: Invoked when the player enters a trigger zone.
  *
  * OnPlayerExitTrigger: Invoked when the player exits a trigger zone.
  *
  * OnEntityEnterTrigger: Invoked when an entity enters a trigger zone.
  *
  * OnEntityExitTrigger: Invoked when an entity exits a trigger zone.
  *
  * OnPlayerCollision: Invoked when a player collides with something.
  *
  * OnEntityCollision: Invoked when an entity collides with something.
  *
  * OnPlayerEnterWorld: Invoked when a player enters the world.
  *
  * OnPlayerExitWorld: Invoked when a player exits the world.
  *
  * OnGrabStart: Invoked when a player starts to grab an entity.
  *
  * OnGrabEnd: Invoked when a player releases an entity.
  *
  * OnMultiGrabStart: Invoked when a player grabs multiple entities.
  *
  * OnMultiGrabEnd: Invoked when a player releases multiple entities.
  *
  * OnIndexTriggerDown: Invoked when the index finger button is pressed.
  *
  * OnIndexTriggerUp: Invoked when the index finger button is released.
  *
  * OnButton1Down: Invoked when button 1 is pressed.
  *
  * OnButton1Up: Invoked when button 1 is released.
  *
  * OnButton2Down: Invoked when button 2 is pressed.
  *
  * OnButton2Up: Invoked when button 2 is released.
  *
  * OnAttachStart: Invoked when an attachment is attached.
  *
  * OnAttachEnd: Invoked when an attachment is detached.
  *
  * OnProjectileLaunched: Invoked when a projectile is launched.
  *
  * OnProjectileHitPlayer: Invoked when a projectile hits a player.
  *
  * OnProjectileHitObject: Invoked when a projectile hits an object.
  *
  * OnProjectileHitWorld: Invoked when a projectile hits something in the world.
  *
  * OnProjectileExpired: Invoked when a projectile expires without hitting anything.
  *
  * OnAchievementComplete: Invoked when a player completes an achievement.
  *
  * OnCameraPhotoTaken: Invoked when the camera captures a photo.
  *
  * OnItemPurchaseSucceeded: Invoked when an item is successfully purchased.
  *
  * OnItemPurchaseFailed: Invoked when an item purchase fails.
  *
  * OnPlayerConsumeSucceeded: Invoked when an item is successfully consumed.
  *
  * OnPlayerConsumeFailed: Invoked when an item fails to be consumed.
  *
  * OnPlayerSpawnedItem: Invoked when an item spawns from the inventory.
  *
  * OnAssetSpawned: Invoked when an asset spawns.
  *
  * OnAssetDespawned: Invoked when an asset despawns.
  *
  * OnAssetSpawnFailed: Invoked when an asset fails to spawn.
  *
  * OnAudioCompleted: Invoked when audio playback completes.
  *
  * OnPlayerEnterAFK: Invoked when a player goes AFK, such as when they open the Oculus menu or remove their headset.
  *
  * OnPlayerExitAFK: Invoked when a players returns from being AFK.
  *
  * OnPlayerEnteredFocusedInteraction: Invoked when a player enters Focused Interaction mode.
  *
  * OnPlayerExitedFocusedInteraction: Invoked when a player exits Focused Interaction mode.
  */
 export declare const CodeBlockEvents: {
     /**
      * The event that is triggered when the player enters a trigger zone.
      */
     OnPlayerEnterTrigger: CodeBlockEvent<[enteredBy: Player]>;
     /**
      * The event that is triggered when a player leaves a trigger zone.
      */
     OnPlayerExitTrigger: CodeBlockEvent<[exitedBy: Player]>;
     /**
      * The event that is triggered when an entity enters a trigger zone.
      */
     OnEntityEnterTrigger: CodeBlockEvent<[enteredBy: Entity]>;
     /**
      * The event that is triggered when an entity exits a trigger zone.
      */
     OnEntityExitTrigger: CodeBlockEvent<[enteredBy: Entity]>;
     /**
      * The event that is triggered when a player collides with something.
      */
     OnPlayerCollision: CodeBlockEvent<[collidedWith: Player, collisionAt: Vec3, normal: Vec3, relativeVelocity: Vec3, localColliderName: string, OtherColliderName: string]>;
     /**
      * The event that is triggered when an entity collides with something.
      */
     OnEntityCollision: CodeBlockEvent<[collidedWith: Entity, collisionAt: Vec3, normal: Vec3, relativeVelocity: Vec3, localColliderName: string, OtherColliderName: string]>;
     /**
      * The event that is triggered when a player enters the world.
      */
     OnPlayerEnterWorld: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when a player exits the world.
      */
     OnPlayerExitWorld: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when a passive instance camera is created.
      */
     OnPassiveInstanceCameraCreated: CodeBlockEvent<[sessionId: Player, cameraMode: string]>;
     /**
      * The event that is triggered when a grab starts.
      */
     OnGrabStart: CodeBlockEvent<[isRightHand: boolean, player: Player]>;
     /**
      * The event that is triggered when a grab is ended.
      */
     OnGrabEnd: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when a multi grab starts.
      */
     OnMultiGrabStart: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when a multi grab is ended.
      */
     OnMultiGrabEnd: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when the index finger button is pressed.
      */
     OnIndexTriggerDown: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when the index finger button is released.
      */
     OnIndexTriggerUp: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when the button 1 is pressed.
      */
     OnButton1Down: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when the button 1 is released.
      */
     OnButton1Up: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when the button 2 is pressed.
      */
     OnButton2Down: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when the button 2 is released.
      */
     OnButton2Up: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when an attachment is attached.
      */
     OnAttachStart: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when an attachment is detached.
      */
     OnAttachEnd: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when a projectile is launched.
      */
     OnProjectileLaunched: CodeBlockEvent<[launcher: Entity]>;
     /**
      * The event that is triggered when a projectile hits a player.
      */
     OnProjectileHitPlayer: CodeBlockEvent<[playerHit: Player, position: Vec3, normal: Vec3, headshot: boolean]>;
     /**
      * The event that is triggered when a projectile hits an object.
      */
     OnProjectileHitObject: CodeBlockEvent<[objectHit: Entity, position: Vec3, normal: Vec3]>;
     /**
      * The event that is triggered when a projectile hits something in the world.
      */
     OnProjectileHitWorld: CodeBlockEvent<[position: Vec3, normal: Vec3]>;
     OnProjectileExpired: CodeBlockEvent<[position: Vec3, rotation: Quaternion, velocity: Vec3]>;
     /**
      * The event that is triggered when an achievement is completed.
      */
     OnAchievementComplete: CodeBlockEvent<[player: Player, scriptId: string]>;
     /**
      * The event that is triggered when camera photo is taken.
      */
     OnCameraPhotoTaken: CodeBlockEvent<[player: Player, isSelfie: boolean]>;
     /**
      * The event that is triggered when a player begins the purchase of an item.
      */
     OnItemPurchaseStart: CodeBlockEvent<[player: Player, item: string]>;
     /**
      * The event that is triggered when a player completes the purchase of an item.
      */
     OnItemPurchaseComplete: CodeBlockEvent<[player: Player, item: string, success: boolean]>;
     /**
      * The event that is triggered when a player initiates consume of an item.
      */
     OnItemConsumeStart: CodeBlockEvent<[player: Player, item: string]>;
     /**
      * The event that is triggered when a player completes consume of an item.
      */
     OnItemConsumeComplete: CodeBlockEvent<[player: Player, item: string, success: boolean]>;
     /**
      * The event that is triggered when an item is successfully purchased.
      * @deprecated use `OnItemPurchaseComplete` instead.
      */
     OnItemPurchaseSucceeded: CodeBlockEvent<[player: Player, item: string]>;
     /**
      * The event that is triggered when an item purchase fails.
      * @deprecated use `OnItemPurchaseComplete` instead.
      */
     OnItemPurchaseFailed: CodeBlockEvent<[player: Player, item: string]>;
     /**
      * The event that is triggered when an item is successfully consumed.
      * @deprecated use `OnItemConsumeComplete` instead.
      */
     OnPlayerConsumeSucceeded: CodeBlockEvent<[player: Player, item: string]>;
     /**
      * The event that is triggered when an item consume fails.
      * @deprecated use `OnItemConsumeComplete` instead
      */
     OnPlayerConsumeFailed: CodeBlockEvent<[player: Player, item: string]>;
     /**
      * The event that is triggered when an item is spawned from the inventory.
      */
     OnPlayerSpawnedItem: CodeBlockEvent<[player: Player, item: Entity]>;
     /**
      * The event that is triggered when an asset is spawned.
      */
     OnAssetSpawned: CodeBlockEvent<[entity: Entity, asset: Asset]>;
     /**
      * The event that is triggered when an asset is despawned.
      */
     OnAssetDespawned: CodeBlockEvent<[entity: Entity, asset: Asset]>;
     /**
      * The event that is triggered when an asset spawn fails.
      */
     OnAssetSpawnFailed: CodeBlockEvent<[asset: Asset]>;
     /**
      * The event that is triggered when an audio playback has completed.
      */
     OnAudioCompleted: CodeBlockEvent<[]>;
     /**
      * The event that is triggered when a player goes AFK (opens the Oculus menu, takes their headset off, etc)
      */
     OnPlayerEnterAFK: CodeBlockEvent<[player: Player]>;
     /**
      * The event that is triggered when a player comes back from being AFK.
      */
     OnPlayerExitAFK: CodeBlockEvent<[player: Player]>;
     OnPlayerEnteredFocusedInteraction: CodeBlockEvent<[player: Player]>;
     OnPlayerExitedFocusedInteraction: CodeBlockEvent<[player: Player]>;
 };
 /**
  * The target or destination of an event.
  *
  * @privateRemarks
  * This needs to be synced with enums in C++ (IScriptingRuntime.cpp)
  * and C# (IScriptingRuntime.cs)
  */
 export declare enum EventTargetType {
     /**
      * An entity.
      */
     Entity = 0,
     /**
      * A player.
      */
     Player = 1,
     /**
      * A broadcast event.
      */
     Broadcast = 2
 }
 declare type TimerHandler = (...args: unknown[]) => void;
 /**
  * A callback used to perform a single registered dispose operation, either automatically at
  * the {@link DisposableObject}'s dispose time, or manually before dispose.
  */
 export declare type DisposeOperation = () => void;
 /**
  * The object returned from a call to {@link DisposableObject.registerDisposeOperation}. This
  * object can be used to run the operation manually before dispose time, or to cancel the
  * operation entirely.
  */
 export interface DisposeOperationRegistration {
     /**
      * Manually run the dispose operation before the {@link DisposableObject} is disposed.
      * Dispose operations are only run once--a call to run guarantees the operation will
      * not run at dispose time.
      */
     run: () => void;
     /**
      * Cancels the dispose operation so that it is never runs.
      */
     cancel: () => void;
 }
 /**
  * An interface for objects that allow registration of additional dispose time operations.
  *
  * @remarks
  * Implemented by {@link Component}, this inteface is typically used to tie the lifetime of API
  * objects to the lifetime of the component that uses them. However, creators can register
  * their own operations instead of implementing dispose, or implement their own disposable object
  * for advanced scenarios requiring custom lifetime management.
  *
  * The implementation of `DisposableObject` on `Component` runs the dispose operations when
  * the component is destroyed (such as at world teardown or asset despawn), or when ownership
  * is transfered between clients. Other implementations of `DisposableObject` may have different
  * semantics.
  *
  * For information about component lifecycles, see the
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/typescript-script-lifecycle#typescript-component-lifecycle | TypeScript component lifecyle} guide.
  */
 export interface DisposableObject {
     /**
      * Called when the disposable object is cleaned up.
      */
     dispose(): void;
     /**
      * Called to register a single dispose operation. The operation is run automatically
      * at Object dispose time, unless it is manually run or canceled before the object is disposed.
      * @param operation - A function called to perform a single dispose operation.
      * @returns A registration object that can be used to manually run or cancel the operation before dispose.
      */
     registerDisposeOperation(operation: DisposeOperation): DisposeOperationRegistration;
 }
 /**
  * The core Component class. You can extended this class to attach functionality
  * to entities in the world.
  *
  * @remarks
  * For more information about using components, see the
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/getting-started/typescript-components-properties-and-variables | TypeScript Components, Properties, and Variables}
  * guide.
  */
 export declare abstract class Component<TComponent = ComponentWithConstructor<Record<string, unknown>>, TSerializableState extends SerializableState = SerializableState> implements DisposableObject {
     /**
      * The set of properties that define the available input and default values of the component.
      */
     static propsDefinition: {};
     private __registeredDisposeOperations;
     private __disposeOperations;
     private __timeoutIds;
     private __intervalIds;
     /**
      * The ID of the entity the component is attached to.
      */
     readonly entityId: number;
     /**
      * The properties that modify the component.
      */
     readonly props: GetPropsFromComponentOrPropsDefinition<TComponent>;
     /**
      * The entity the component is attached to.
      */
     readonly entity: Entity;
     /**
      * The {@link World} instance that contains the component.
      */
     readonly world: World;
     /**
      * Returns a list of all script component instances of the specified type in the world. Only returns script component instances if they're executing in the same context (i.e. On the server or on a particular client).
      * This method should not be used in prestart() as other script component instances may not yet be instantiated.
      *
      * @param type - The specified type of Component.
      * @returns A list of all active instances of the specified component type in the current execution context (i.e., on the server or on a particular client).
      */
     static getComponents<T extends Component<unknown, SerializableState> = Component>(type: new () => T): T[];
     /**
      * Performs initialization tasks before the {@link start} method is called.
      *
      * @remarks
      * This method runs in these scenarios as follows:
      *
      * World start: `preStart` runs for all components before the `start` method of any component is called.
      * Asset spawn: `preStart` runs before any `start` methods are called for any components that are spawning.
      * Ownership transfer: `preStart` is called directly before the `start` method is called.
      */
     preStart(): void;
     /**
      * Called when the component starts running.
      */
     abstract start(): void;
     /**
      * Called when the component is cleaned up.
      *
      * @remarks
      * Subscriptions registered using {@link connectCodeBlockEvent}, {@link connectLocalBroadcastEvent},
      * {@link connectLocalEvent}, and {@link async} are
      * cleaned up automatically.
      */
     dispose(): void;
     /**
      * Called to register a single {@link dispose} operation. The operation runs automatically
      * when the component is disposed unless it is manually run or canceled before the component is disposed.
      * @param operation - A function called to perform a single dispose operation.
      * @returns A registration object that can be used to manually run or cancel the operation before dispose.
      */
     registerDisposeOperation(operation: DisposeOperation): DisposeOperationRegistration;
     private __registerEventDisposeOperation;
     private __removeDisposeOperation;
     private __clearAllTimeoutsAndIntervals;
     private __clearComponentInstanceRegistrations;
     /**
      * Sends a code block event to the specified player or entity. These events are networked automatically,
      * and sent and handled asynchronously.
      *
      * @param target - The entity or player that receives the event.
      * @param event - The {@link CodeBlockEvent} that represents the event.
      * @param args - The data to send with the event.
      */
     sendCodeBlockEvent<TPayload extends BuiltInVariableType[]>(target: Entity | Player, event: CodeBlockEvent<TPayload>, ...args: TPayload): void;
     /**
      * Called when receiving the specified code block event from the given player or entity.
      *
      * @param target - The entity or player to listen to.
      * @param event - The incoming `CodeBlockEvent`.
      * @param callback - Called when the event is received with any data as arguments.
      */
     connectCodeBlockEvent<TEventArgs extends BuiltInVariableType[], TCallbackArgs extends TEventArgs>(target: Entity | Player, event: CodeBlockEvent<TEventArgs>, callback: (...payload: TCallbackArgs) => void): EventSubscription;
     /**
      * Sends a local event to a specific entity from the owner of the entity.
      *
      * @remarks
      * The event is sent immediately and this function does not return until delivery completes.
      *
      * @param target - The entity that receives the event.
      * @param event - The local event to send.
      * @param args - The data to send with the event.
      */
     sendLocalEvent<TPayload extends LocalEventData, TData extends TPayload>(target: Entity | Player, event: LocalEvent<TPayload>, data: TData): void;
     /**
      * Adds a listener to the local event on the given entity. The listener is called when the event is received.
      *
      * @param target - The entity to listen to.
      * @param event - The local event.
      * @param callback - Called when the event is received with any data as arguments.
      */
     connectLocalEvent<TPayload extends LocalEventData>(target: Entity | Player, event: LocalEvent<TPayload>, callback: (payload: TPayload) => void): EventSubscription;
     /**
      * Sends a local event to all listeners.
      *
      * If a local event is sent, it is sent immediately. This function does not return until delivery completes.
      *
      * @param event - The local event to send.
      * @param args - The data to send with the event.
      */
     sendLocalBroadcastEvent<TPayload extends LocalEventData, TData extends TPayload>(event: LocalEvent<TPayload>, data: TData): void;
     /**
      * Adds a listener to the specified local event. The listener is called when the event is received.
      *
      * @param event - The local event to listen to.
      * @param listener - Called when the event is received with any data as arguments.
      */
     connectLocalBroadcastEvent<TPayload extends LocalEventData>(event: LocalEvent<TPayload>, listener: (payload: TPayload) => void): EventSubscription;
     /**
      * Sends a network event to the player that owns the given entity.
      *
      * @remarks
      * The event is only handled if {@link connectNetworkEvent} is called on the same entity on the owner client.
      *
      * @param target - The player or entity that recieves the event.
      * @param event - The network event.
      * @param data - The data to send with the event. the maximum amount data after serialization is 63kB.
      * @param players - The list of player devices to send the event to. If you don't specify this parameter, the
      * event is sent to all devices owned by the player. You should only use specify this parameter if you
      * understand it well.
      */
     sendNetworkEvent<TPayload extends NetworkEventData>(target: Entity | Player, event: NetworkEvent<TPayload>, data: TPayload, players?: Array<Player>): void;
     /**
      * Adds a listener to the specified network event on the given entity. The listener is called when the event
      * is received from network.
      *
      * @param target - The entity or player to listen to.
      * @param event - The network event.
      * @param callback - Called when the event is received with any data as arguments.
      */
     connectNetworkEvent<TPayload extends NetworkEventData>(target: Entity | Player, event: NetworkEvent<TPayload>, callback: (payload: TPayload) => void): EventSubscription;
     /**
      * Broadcasts a network event. The event is only handled if the host listens to the event.
      *
      * @param event - The network event to broadcast.
      * @param data - The data to send with the event. the maximum amount data supported after serialization is 63kB.
      * @param players - The list of players devices to send the event to. If you do not specify this parameter, the event
      * is sent to all devices owned by the player. You should only use this parameter if you are familiar with how it
      * works.
      */
     sendNetworkBroadcastEvent<TPayload extends NetworkEventData>(event: NetworkEvent<TPayload>, data: TPayload, players?: Array<Player>): void;
     /**
      * Adds a listener to the specified network event. The listener is called when the event is received from the network.
      * @param event - The network event to listen to.
      * @param callback - Called when the event is received with any data as arguments.
      */
     connectNetworkBroadcastEvent<TPayload extends NetworkEventData>(event: NetworkEvent<TPayload>, callback: (payload: TPayload) => void): EventSubscription;
     /**
      * Called when the script's ownership is being transferred to a new player. This
      * method allows the new owner to receive the serializable state from the previous
      * owner during ownership transfer.
      *
      * @remarks When changing entity ownership to a new player, you must transfer
      * the state of the entity as well or the state will be lost. You can use the
      * {@link Component.transferOwnership} and {@link Component.receiveOwnership}
      * methods to transfer an entity's state to a new owner. For more information,
      * see {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/local-scripting/maintaining-local-state-on-ownership-change | Maintaining local state on ownership change}.
      *
      * If ownership for a parent entity changes, the ownership change doesn't
      * automatically apply to any child entities.
      *
      * @example
      * ```
      * type State = {ammo: number};
      * class WeaponWithAmmo extends Component<typeof WeaponWithAmmo, State> {
      *   static propsDefinition = {
      *     initialAmmo: {type: PropTypes.Number, default: 20},
      *   };
      *   private ammo: number = 0;
      *   start() {
      *     this.ammo = this.props.initialAmmo;
      *   }
      *   receiveOwnership(state: State | null, fromPlayer: Player, toPlayer: Player) {
      *     this.ammo = state?.ammo ?? this.ammo;
      *   }
      *   transferOwnership(fromPlayer: Player, toPlayer: Player): State {
      *     return {ammo: this.ammo};
      *   }
      * }
      * ```
      *
      * @param _serializableState - The serializable state from prior owner, or null
      * if that state is invalid.
      * @param _oldOwner - The prior owner.
      * @param _newOwner - The current owner.
      */
     receiveOwnership(_serializableState: TSerializableState | null, _oldOwner: Player, _newOwner: Player): void;
     /**
      * Called when transferring the script's ownership to a new player. During the transer,
      * this method can condense the previous owner's state into a serializable
      * format and pass it to the new owner.
      *
      * @remarks When changing entity ownership to a new player, you must transfer
      * the state of the entity as well or the state will be lost. You can use the
      * {@link Component.transferOwnership} and {@link Component.receiveOwnership}
      * methods to transfer an entity's state to a new owner. For more information,
      * see {@link https://developers.meta.com/horizon-worlds/learn/documentation/typescript/local-scripting/maintaining-local-state-on-ownership-change | Maintaining local state on ownership change}.
      *
      * If ownership for a parent entity changes, the ownership change doesn't
      * automatically apply to any child entities.
      *
      * @example
      * ```
      * type State = {ammo: number};
      * class WeaponWithAmmo extends Component<typeof WeaponWithAmmo, State> {
      *   static propsDefinition = {
      *     initialAmmo: {type: PropTypes.Number, default: 20},
      *   };
      *   private ammo: number = 0;
      *   start() {
      *     this.ammo = this.props.initialAmmo;
      *   }
      *   receiveOwnership(state: State | null, fromPlayer: Player, toPlayer: Player) {
      *     this.ammo = state?.ammo ?? this.ammo;
      *   }
      *   transferOwnership(fromPlayer: Player, toPlayer: Player): State {
      *     return {ammo: this.ammo};
      *   }
      * }
      * ```
      *
      * @param _oldOwner - The original owner.
      * @param _newOwner - The new owner.
      * @returns The serializable state to transfer to the new owner.
      */
     transferOwnership(_oldOwner: Player, _newOwner: Player): TSerializableState;
     /**
      * A set of asynchronous helper functions that are scoped to the component
      * for automatic cleanup on dispose.
      *
      * @remarks
      * `setTimeout` -  Sets a timer that executes a function or specified piece
      * of code once the timer expires.
      *
      * `clearTimeout` - Cancels a timeout previously established by calling
      * `setTimeout()`.
      *
      * `setInterval` - Repeatedly calls a function or executes a code snippet,
      * with a fixed time delay between each call.
      *
      * `clearInterval` - Cancels a timed-repeating action that was previously
      * established by a call to `setInterval`.
      */
     async: {
         /**
          * Sets a timer which executes a function or specified piece of code once the timer expires.
          * @param callback - A function to be compiled and executed after the timer expires.
          * @param timeout - The time, in milliseconds that the timer should wait before the specified function or code is executed.
          * If this parameter is omitted, a value of 0 is used, meaning execute "immediately", or more accurately, the next event cycle.
          * @param args - Additional arguments which are passed through to the function specified by callback.
          * @returns The timer created by the call to `setTimeout()`.
          * This value can be passed to `clearTimeout()` to cancel the timeout. It is guaranteed that a timeoutID value will never be reused
          * by a subsequent call to setTimeout() or setInterval() on the same object (a window or a worker).
          */
         setTimeout: (callback: TimerHandler, timeout?: number, ...args: unknown[]) => number;
         /**
          * Cancels a timeout previously established by calling `setTimeout()`.
          * If `id` does not identify a previously established action, this method does nothing.
          * @param id - The identifier of the timeout to cancel. This ID was returned by the corresponding call to `setTimeout()`.
          */
         clearTimeout: (id: number) => void;
         /**
          * Repeatedly calls a function or executes a code snippet, with a fixed time delay between each call.
          * @param callback - A function to be compiled and executed every timeout milliseconds.
          * The first execution happens after delay milliseconds.
          * @param timeout - (optional) The duration, in milliseconds (thousandths of a second), the timer should delay
          * in between executions of the specified function or code. Defaults to 0 if not specified.
          * @param arguments - (optional) Additional arguments which are passed through to the function specified by callback.
          * @returns The numeric, non-zero value which identifies the timer created by the call to setInterval();
          * this value can be passed to clearInterval() to cancel the interval.
          */
         setInterval: (callback: TimerHandler, timeout?: number, ...args: unknown[]) => number;
         /**
          * Cancels a timed, repeating action which was previously established by a call to `setInterval()`.
          * If the parameter does not identify a previously established action, this method does nothing.
          * @param id - The identifier of the repeated action you want to cancel. This ID was returned by the corresponding call to `setInterval()`.
          */
         clearInterval: (id: number) => void;
     };
     /**
      * Registers a component definition so that it can be attached to an object in the UI.
      *
      * @param componentClass - The TypeScript class of the component.
      * @param componentName - The name of component to display in the UI.
      */
     static register<TComponentPropsDefinition>(componentClass: // this needs to be typed with the interface type so we know it can be instantiated (is not abstract)
     ComponentWithConstructor<TComponentPropsDefinition> & typeof Component<ComponentWithConstructor<TComponentPropsDefinition>>, componentName?: string): void;
 }
 /**
  * Options for the {@link MeshEntity.setTexture} method.
  *
  * @remarks players - The players to apply the texture for. If null or empty, applies the texture
  * for all players.
  */
 export declare type SetTextureOptions = {
     players?: Array<Player>;
 };
 /**
  * Options for the {@link MeshEntity.setMaterial} method.
  * @remarks materialSlot - The index or the name of the material slot to update. If null or an
  * empty string, the material is applied to slot 0.
  */
 export declare type SetMaterialOptions = {
     materialSlot?: number | string;
 };
 /**
  * An {@link Entity} that uses a custom model.
  *
  * @remarks
  * A custom model is built outside of Horizon Worlds with a 3D modeling tool
  * exported as an .fbx file, and then consumed in the asset library by the
  * asset pipeline.
  */
 export declare class MeshEntity extends Entity {
     /**
      * Gets a human readable representation of the `MeshEntity`.
      * @returns A string representation of the `MeshEntity`.
      */
     toString(): string;
     /**
      * The style of the `MeshEntity`.
      */
     style: EntityStyle;
     /**
      * Changes the texture of a `MeshEntity` (custom model entity) for the specified
      * players.
      *
      * @remarks This API should only be applied to a custom model entity that uses a texture based material.
      * Additionally, static/nondynamic entities may not update textures if the material shader is GI lit.
      * Otherwise, this call does not take effect and throws an error at runtime.
      *
      * @param texture - The asset containing the texture to apply. The asset must be
      * a texture asset that has been consumed as a texture in the asset pipeline.
      * @param options - Indicates the players to apply the texture for.
      * @returns A promise that resolves when the texture is successfully applied.
      * @example
      * ```
      * import { Component, PropTypes, Entity, AudioGizmo, CodeBlockEvents, Asset } from '@early_access_api/v1';
      * import { MeshEntity, TextureAsset } from '@early_access_api/2p';
      *
      * class Button extends Component<typeof Button> {
      *   static propsDefinition = {
      *     texture: {type: PropTypes.Asset},
      *     panel: {type: PropTypes.Entity},
      *     sound: {type: PropTypes.Entity},
      *   };
      *
      *   start() {
      *     this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, () => this.onClick());
      *   }
      *
      *   onClick() {
      *     this.props.sound.as(AudioGizmo).play();
      *     this.props.panel.as(MeshEntity).setTexture(this.props.texture.as(TextureAsset));
      *   }
      * }
      *
      * Component.register(Button);
      * ```
      */
     setTexture(texture: TextureAsset, options?: SetTextureOptions): Promise<void>;
     /**
      * Changes the mesh and optionally material of a MeshEntity (custom model entity).
      *
      * @remarks You should only apply this API to a custom model entity. Otherwise,
      * this call does not take effect.
      *
      * @param mesh - The new custom model asset to use in the world. You must use a
      * custom model asset that was consumed as a custom model in the asset pipeline.
      * You cannot use a custom model asset that is saved as an asset within
      * Horizon Worlds.
      * @param options - true if players can decide to use the new material that
      * comes with the new custom model; false to use the current material.
      *
      * @returns A promise that resolves when the mesh (and material) has been
      * successfully swapped.
      * @example
      * ```
      * import { Component, PropTypes, Entity, AudioGizmo, CodeBlockEvents, Asset } from '@early_access_api/v1';
      * import { MeshEntity, TextureAsset } from '@early_access_api/v1';
      *
      * class TargetEntity extends Component<{}> {
      *    static propsDefinition = {};
      *
      *    start() {
      *        this.connectLocalEvent(this.entity, buttonPressedEvent, (data: {mesh: Asset}) => {
      *        this.entity.as(MeshEntity).setMesh(data.mesh, {updateMaterial: false});
      *     });
      *   }
      * }
      *
      * type ButtonProps = {
      *   mesh: Asset,
      *   targetEntity: Entity,
      * };
      *
      * class Button extends Component<ButtonProps> {
      *   static propsDefinition = {
      *     mesh: {type: PropTypes.Asset},
      *     targetEntity: {type: PropTypes.Entity},
      *   };
      *
      *   start() {
      *     this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, () => this.onClick());
      *   }
      *
      *   onClick() {
      *     this.sendLocalEvent(this.props.targetEntity, buttonPressedEvent, {mesh: this.props.mesh.as(Asset)});
      *   }
      * }
      *
      * Component.register(Button);
      * ```
      */
     setMesh(mesh: Asset, options: SetMeshOptions): Promise<void>;
     /**
      * Sets the material on a MeshEntity (custom model entity) to a material asset.
      *
      * @param materialAsset - A material asset from the asset library.
      *
      * @returns A promise that resolves when the material has been successfully updated.
      *
      * @example
      * ```
      * class Button extends Component<typeof Button> {
      *   static propsDefinition = {
      *     material: {type: PropTypes.Asset},
      *     materialSlot: {type: PropTypes.Number | Proptypes.String},
      *     targetEntity: {type: PropTypes.Entity},
      *   };
      *
      *   start() {
      *     this.connectCodeBlockEvent(this.entity, CodeBlockEvents.OnPlayerEnterTrigger, () => this.onButtonPress());
      *   }
      *
      *   onButtonPress() {
      *     const options = {materialSlot: this.props.materialSlot};
      *     this.props.targetEntity.as(MeshEntity)!.setMaterial(this.props.material, options);
      *   }
      * }
      * ```
      */
     setMaterial(materialAsset: MaterialAsset, options?: SetMaterialOptions): Promise<void>;
 }
 /**
  * Options that indicate whether players can choose to use new material from
  * a custom model or keep the current material when updating the mesh of a custom model entity.
  *
  * @remarks
  * updateMaterial - true to enable use of the new material; false to use the current material.
  *
  * For information on updating the mesh of a custom model entity, see the
  * {@link MeshEntity.setMesh} method.
  */
 export declare type SetMeshOptions = {
     updateMaterial?: boolean;
 };
 /**
  * Represents a texture {@link Asset}.
  * A texture is a binary image that is applied over the mesh surface.
  * Texture images can be stretched (or shrunk) and attached to a mesh.
  */
 export declare class TextureAsset extends Asset {
     /**
      * Gets a human readable representation of the object.
      * @returns a string representation of this asset.
      */
     toString(): string;
 }
 /**
  * A material {@link Asset | asset}, which describes how the surface of a mesh
  * is rendered.
  */
 export declare class MaterialAsset extends Asset {
     /**
      * Gets a human readable representation of the material asset.
      * @returns A string representation of the material asset.
      */
     toString(): string;
 }
 /**
  * Represents a style for a Custom model entity that can change its style.
  */
 export interface EntityStyle {
     /**
      * @example
      * ```
      * // Augment base color as such:
      *
      * outColor.rgb = lerp(inColor.rgb, Luminance(inColor.rgb) * tintColor, tintStrength) * brightness;
      * ```
      */
     /**
      * Color in the RGB range of 0 - 1; defaults to 1, 1, 1 (no tint color).
      */
     tintColor: HorizonProperty<Color>;
     /**
      * Tint strength in the range of 0 - 1; where 0 is no tint and 1 is fully tinted; defaults to 0.
      */
     tintStrength: HorizonProperty<number>;
     /**
      * Brightness in the range of 0 - 100; where 0 is black, 1 is no adjustment, and 100 is very bright; defaults to 1.
      */
     brightness: HorizonProperty<number>;
 }
 /**
  * The icons to use when binding to custom player inputs. These are used on platforms
  * that display buttons for inputs.
  */
 export declare enum ButtonIcon {
     /**
      * The icon for Ability.
      */
     Ability = 0,
     /**
      * The icon for Aim.
      */
     Aim = 1,
     /**
      * The icon for Airstrike.
      */
     Airstrike = 2,
     /**
      * The icon for Crouch.
      */
     Crouch = 3,
     /**
      * The icon for Door.
      */
     Door = 4,
     /**
      * The icon for Drink.
      */
     Drink = 5,
     /**
      * The icon for Drop.
      */
     Drop = 6,
     /**
      * The icon for Dual Wield.
      */
     DualWield = 7,
     /**
      * The icon for Eagle Eye.
      */
     EagleEye = 8,
     /**
      * The icon for Eat.
      */
     Eat = 9,
     /**
      * The icon for Fire Special.
      */
     FireSpecial = 10,
     /**
      * The icon for Fire.
      */
     Fire = 11,
     /**
      * The icon for Grab.
      */
     Grab = 12,
     /**
      * The icon for Heal.
      */
     Heal = 13,
     /**
      * The icon for Infinite Ammo.
      */
     InfiniteAmmo = 14,
     /**
      * The icon for Inspect.
      */
     Inspect = 15,
     /**
      * The icon for Interact.
      */
     Interact = 16,
     /**
      * The icon for invisible.
      */
     Invisible = 17,
     /**
      * The icon for Jump.
      */
     Jump = 18,
     /**
      * The icon for House Left.
      */
     MouseLeft = 19,
     /**
      * The icon for Mouse Middle.
      */
     MouseMiddle = 20,
     /**
      * The icon for Mouse Right.
      */
     MouseRight = 21,
     /**
      * The icon for Mouse Scroll.
      */
     MouseScroll = 22,
     /**
      * The icon for Net.
      */
     Net = 23,
     /**
      * The icon for None.
      */
     None = 24,
     /**
      * The icon for Place.
      */
     Place = 25,
     /**
      * The icon for Purchase.
      */
     Purchase = 26,
     /**
      * The icon for Reload.
      */
     Reload = 27,
     /**
      * The icon for Rocket Jump.
      */
     RocketJump = 28,
     /**
      * The icon for Rocket Volley.
      */
     RocketVolley = 29,
     /**
      * The icon for Rocket.
      */
     Rocket = 30,
     /**
      * The icon for Shield.
      */
     Shield = 31,
     /**
      * The icon for Speak.
      */
     Speak = 32,
     /**
      * The icon for Special.
      */
     Special = 33,
     /**
      * The icon for Speed Boost.
      */
     SpeedBoost = 34,
     /**
      * The icon for Sprint.
      */
     Sprint = 35,
     /**
      * The icon for Swap.
      */
     Swap = 36,
     /**
      * The icon for Swing Weapon.
      */
     SwingWeapon = 37,
     /**
      * The icon for Throw.
      */
     Throw = 38,
     /**
      * The icon for Use.
      */
     Use = 39,
     /**
      * The icon for Punch.
      */
     Punch = 40,
     /**
      * The icon for Expand.
      */
     Expand = 41,
     /**
      * The icon for Contract.
      */
     Contract = 42,
     /**
      * The icon for Map.
      */
     Map = 43,
     /**
      * The icon for ChevronLeft.
      */
     LeftChevron = 44,
     /**
      * The icon for ChevronRight.
      */
     RightChevron = 45,
     /**
      * The icon for Menu.
      */
     Menu = 46
 }
 /**
  * The available button placements.
  */
 export declare enum ButtonPlacement {
     /**
      * The device's default placement for this button.
      */
     Default = 0,
     /**
      * Centered. Bottom center of the screen on most devices.
      */
     Center = 1
 }
 /**
  * The input actions available for the local player. The actions are bound to
  * specific keys by default on multiple platforms.
  * @remarks
  * The member descriptions contain a list of the default bindings. The bindings are valid
  * with the user setting Jump Controls set to Press A button. These bindings are affected
  * by the Jump Controls user setting.
  */
 export declare enum PlayerInputAction {
     /**
      * Oculus Touch: A
      *
      * Desktop: spacebar
      *
      * Mobile: on-screen button
      */
     Jump = 0,
     /**
      * Oculus Touch: right thumbstick click
      *
      * Desktop: R
      *
      * Mobile: on-screen button
      */
     RightPrimary = 1,
     /**
      * Oculus Touch: B
      *
      * Desktop: F
      *
      * Mobile: on-screen button
      */
     RightSecondary = 2,
     /**
      * Oculus Touch: _Unavailable_
      *
      * Desktop: Y
      *
      * Mobile: on-screen button
      */
     RightTertiary = 3,
     /**
      * Oculus Touch: right analog grip button
      *
      * Desktop: E
      *
      * Mobile: on-screen button
      */
     RightGrip = 4,
     /**
      * Oculus Touch: right analog trigger
      *
      * Desktop: left mouse click
      *
      * Mobile: on-screen button
      */
     RightTrigger = 5,
     /**
      * Oculus Touch: right stick X axis
      *
      * Desktop: _Unavailable_
      *
      * Mobile: _Unavailable_
      */
     RightXAxis = 6,
     /**
      * Oculus Touch: right stick Y axis
      *
      * Desktop: _Unavailable_
      *
      * Mobile: _Unavailable_
      */
     RightYAxis = 7,
     /**
      * Oculus Touch: X
      *
      * Desktop: T
      *
      * Mobile: on-screen button
      */
     LeftPrimary = 8,
     /**
      * Oculus Touch: Y
      *
      * Desktop: G
      *
      * Mobile: on-screen button
      */
     LeftSecondary = 9,
     /**
      * Oculus Touch: left thumbstick click
      *
      * Desktop: H
      *
      * Mobile: on-screen button
      */
     LeftTertiary = 10,
     /**
      * Oculus Touch: left analog grip button
      *
      * Desktop: Q
      *
      * Mobile: on-screen button
      */
     LeftGrip = 11,
     /**
      * Oculus Touch: left analog trigger
      *
      * Desktop: right mouse click
      *
      * Mobile: on-screen button
      */
     LeftTrigger = 12,
     /**
      * Oculus Touch: left stick X Axis
      *
      * Desktop: A/D
      *
      * Mobile: _Unavailable_
      */
     LeftXAxis = 13,
     /**
      * Oculus Touch: left stick Y axis
      *
      * Desktop: W/S
      *
      * Mobile: _Unavailable_
      */
     LeftYAxis = 14
 }
 /**
  * A callback that signals state changes when player input
  * is pressed.
  *
  * @remarks
  * Use {@link PlayerInput.registerCallback} to register this callback.
  *
  * action - The input action that triggered the callback.
  *
  * pressed - true if the input was pressed; false if it was released.
  */
 export declare type PlayerInputStateChangeCallback = (action: PlayerInputAction, pressed: boolean) => void;
 /**
  * A bound player input. It is created by calling
  * {@link PlayerControls.connectLocalInput}.
  */
 export declare class PlayerInput {
     private _action;
     private _held;
     private _pressed;
     private _released;
     private _callback?;
     private _disconnect?;
     /**
      * Disconnects the input.
      * On platforms that display on-screen buttons for actions, the button will be removed.
      * Any callbacks registered to this instance will stop being called.
      */
     disconnect(): void;
     /**
      * Indicates whether the input is currently connected and active.
      */
     connected: ReadableHorizonProperty<boolean>;
     /**
      * The action this input is bound to.
      * For analog inputs, a pressed state corresponds to an axis value greater than 0.5 or lesser than -0.5.
      */
     action: ReadableHorizonProperty<PlayerInputAction>;
     /**
      * Indicates whether the input is being held active.
      * For analog inputs, a pressed state corresponds to an axis value greater than 0.5 or lesser than -0.5.
      */
     held: ReadableHorizonProperty<boolean>;
     /**
      * Indicates whether the input was pressed this frame.
      */
     pressed: ReadableHorizonProperty<boolean>;
     /**
      * Indicates whether the input was released this frame.
      */
     released: ReadableHorizonProperty<boolean>;
     /**
      * Gets the axis value, between 0 and 1.
      * If the input is digital, 0 or 1 will be returned.
      */
     axisValue: ReadableHorizonProperty<number>;
     /**
      * Registers a callback that is called when the input is pressed or released. For
      * analog inputs, a pressed state corresponds to an axis value greater than 0.5 or
      * lesser than -0.5.
      * @param callback - The callback that is called when the pressed state changes.
      */
     registerCallback(callback: PlayerInputStateChangeCallback): void;
     /**
      * Unregisters the currently registered callback, if any.
      */
     unregisterCallback(): void;
 }
 /**
  * The options to pass to {@link PlayerControls.connectLocalInput}.
  *
  * @remarks
  * `preferredButtonPlacement` - The button placement to use, if supported. Certain
  * platforms might not support all placements. Attempting to place multiple buttons
  * at the same location prioritizes the latest button enabled.
  */
 export declare type PlayerControlsConnectOptions = {
     /**
      * The button placement to use, if able. Certain platform might not support all
      * placements. Attempting to place multiple buttons at the same location will give
      * priority to the latest button enabled.
      */
     preferredButtonPlacement?: ButtonPlacement;
 };
 /**
  * Information about an input received from the player during
  * {@link FocusedInteraction | Focused Interaction} mode.
  *
  * @remarks
  * interactionIndex: An index for differentiating between simultaneous inputs. The first input is 0, the second is 1, etc.
  *
  * screenPosition: The screen position of the input normalized to the range (0,0) to (1,1).
  *
  * worldRayOrigin: The origin point of a ray in the world generated from a touch gesture.
  *
  * worldRayDirection: The direction vector of a ray in the world generated from a touch gesture.
  *
  * InteractionInfo is passed by the
  * {@link PlayerControls.onFocusedInteractionInputStarted},
  * {@link PlayerControls.onFocusedInteractionInputMoved}, and
  * {@link PlayerControls.onFocusedInteractionInputEnded} events.
  *
  * For more information, see the
  * {@link https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-use-focused-interaction | Focused Interaction guide}.
  */
 export declare type InteractionInfo = {
     interactionIndex: number;
     screenPosition: Vec3;
     worldRayOrigin: Vec3;
     worldRayDirection: Vec3;
 };
 /**
  * Provides static methods to bind to, and query data about custom player input bindings.
  */
 export declare class PlayerControls {
     /**
      * Indicates whether the action is supported on the current platform.
      * @remarks This function fails if called on the server. Connecting to an unsupported
      * input is allowed, but the input won't activate and its axis value will remain at 0.
      * @param action - The action to query.
      * @returns true if the action is supported on the current platform; otherwise, false.
      */
     static isInputActionSupported(action: PlayerInputAction): boolean;
     /**
      * Connects to input events for the local player.
      * @remarks This function fails if called on the server. On platforms that display
      * on-screen buttons for actions (such as mobile), displays a button with the
      * specified icon.
      * @param input - The action to respond to.
      * @param icon - The icon to use for the button, on platforms that display on-screen buttons for actions.
      * @param disposableObject - The {@link DisposableObject} that controls the lifetime of the connection
      * @param options - Connection options, see {@link PlayerControlsConnectOptions} for defaults.
      * @returns A {@link PlayerInput} instance that can be used to poll the status of the input, or register
      * a state change callback.
      */
     static connectLocalInput(input: PlayerInputAction, icon: ButtonIcon, disposableObject: DisposableObject, options?: PlayerControlsConnectOptions): PlayerInput;
     /**
      * Returns a list of names that represent the physical buttons or keys bound to the specified action.
      * @remarks This function fails if called on the server.
      * @param action - The action to get the key names for.
      * @returns An array of key names.
      */
     static getPlatformKeyNames(action: PlayerInputAction): Array<string>;
     /**
      * This event fires on the first frame of input when the player starts
      * a touch gesture or mouse click while in
      * {@link Player.enterFocusedInteractionMode | Focused Interaction mode}.
      *
      * @remarks
      * You can also recieve input data from the
      * {@link PlayerControls.onFocusedInteractionInputMoved} and
      * {@link PlayerControls.onFocusedInteractionInputEnded} events during
      * Focused Interaction mode.
      *
      * For more information, see the
      * {@link https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-use-focused-interaction | Focused Interaction guide}.
      *
      * @param interactionInfo - An array containing all input that started during this frame.
      */
     static readonly onFocusedInteractionInputStarted: LocalEvent<{
         interactionInfo: InteractionInfo[];
     }>;
     /**
      * This event broadcasts while the player is in
      * {@link Player.enterFocusedInteractionMode | Focused Interaction mode} while
      * using touch gestures or mouse clicks. The event fires on all frames of the
      * input except for the first and last frames which instead fire the
      * {@link PlayerControls.onFocusedInteractionInputStarted} and
      * {@link PlayerControls.onFocusedInteractionInputEnded} events respectively.
      *
      * @remarks
      * For more information, see the
      * {@link https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-use-focused-interaction | Focused Interaction guide}.
      *
      * @param interactionInfo - An array containing all input that continued during
      * this frame.
      */
     static readonly onFocusedInteractionInputMoved: LocalEvent<{
         interactionInfo: InteractionInfo[];
     }>;
     /**
      * This event broadcasts on the last frame of input when the player ends a touch gesture
      * or mouse click while in
      * {@link Player.enterFocusedInteractionMode | Focused Interaction mode}.
      *
      * @remarks
      * You can also recieve input data from the
      * {@link PlayerControls.onFocusedInteractionInputStarted} and
      * {@link PlayerControls.onFocusedInteractionInputMoved} events during
      * Focused Interaction mode.
      *
      * @remarks
      * For more information, see the
      * {@link https://developers.meta.com/horizon-worlds/learn/documentation/create-for-web-and-mobile/references-and-guides/how-to-use-focused-interaction | Focused Interaction guide}.
      *
      * @param interactionInfo - An array containing all input that ended during this frame.
      */
     static readonly onFocusedInteractionInputEnded: LocalEvent<{
         interactionInfo: InteractionInfo[];
     }>;
     /**
      * Disables the on-screen system controls for the local player.
      * @remarks This function fails if called on the server.
      */
     static disableSystemControls(): void;
     /**
      * Enables the on-screen system controls for the local player.
      * @remarks This function fails if called on the server.
      */
     static enableSystemControls(): void;
     /**
      * This event fires when an item is holstered or unholstered. The purpose of
      * this event is to populate a list of holstered items in a UI panel in order
      * to allow the player to switch between them.
      *
      * @param player - The player who's holstered items were updated.
      * @param items - The list of items that are currently holstered
      * @param grabbedItem - The item that the player is currently holding
      * @remarks The grabbedItem also appears in the items list so this will need
      * to be filtered out when iterating the list of items to display in the UI.
      */
     static readonly onHolsteredItemsUpdated: LocalEvent<{
         player: Player;
         items: Entity[];
         grabbedItem: Entity;
     }>;
     /**
      * Triggers a contextual based multi-holstering action if one is available.
      * This function is designed to mirror the behaviour of the system holstering
      * button, and will open the system holstering UI if there is more than one
      * item holstered.
      */
     static triggerContextualMultiHolsterAction(): void;
     /**
      * Equips the next holstered item if there is one
      */
     static equipNextHolsteredItem(): void;
     /**
      * Equips the previous holstered item if there is one
      */
     static equipPreviousHolsteredItem(): void;
     /**
      * Equips the item at the selected holster index if there is one
      */
     static equipHolsteredItem(index: number): void;
     /**
      * Triggers the player action to drop the currently held item
      */
     static triggerDropAction(): void;
     /**
      * Triggers the down event for an input action for the local player.
      * @remarks This function fails if called on the server. On platforms that display
      * on-screen buttons for actions (such as mobile), triggers the specified action.
      * @param inputAction - The action to trigger / activate.
      */
     static triggerInputActionDown(inputAction: PlayerInputAction): void;
     /**
      * Triggers the up event for an input action for the local player.
      * @remarks This function fails if called on the server. On platforms that display
      * on-screen buttons for actions (such as mobile), triggers the specified action.
      * @param inputAction - The action to trigger / activate.
      */
     static triggerInputActionUp(inputAction: PlayerInputAction): void;
 }
 /**
  * Used only in internal tests for compatability between the v1 and v2 APIs.
  */
 export declare abstract class BaseTestComponent<_TProps extends unknown, TComponent extends ComponentWithConstructor<Record<string, unknown>>> extends Component<TComponent> {
 }
 export {};
  }