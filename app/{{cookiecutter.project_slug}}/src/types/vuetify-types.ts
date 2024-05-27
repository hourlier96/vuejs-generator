// Custom types definition when required types are not exported by the library
import type { VTextField } from 'vuetify/lib/components/VTextField/index.mjs'
type UnwrapReadonlyArray<A> = A extends Readonly<Array<infer I>> ? I : A

export type ValidationRules = UnwrapReadonlyArray<InstanceType<typeof VTextField>['rules']>

export type Anchor = 'top' | 'left' | 'bottom' | 'right'
