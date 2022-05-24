// Componenst
import { VSelectionControl } from '../VSelectionControl'

// Composables
import { useProxiedModel } from '@/composables/proxiedModel'

// Utility
import { computed } from 'vue'
import { defineComponent, pick, propsFactory, useRender } from '@/util'
import { makeSelectionControlProps } from '../VSelectionControl/VSelectionControl'

// Types
import type { ExtractPropTypes } from 'vue'

export const makeVCheckboxBtnProps = propsFactory({
  indeterminate: Boolean,
  indeterminateIcon: {
    type: String,
    default: '$checkboxIndeterminate',
  },

  ...makeSelectionControlProps(),

  falseIcon: {
    type: String,
    default: '$checkboxOff',
  },
  trueIcon: {
    type: String,
    default: '$checkboxOn',
  },
})

export const VCheckboxBtn = defineComponent({
  name: 'VCheckboxBtn',

  props: makeVCheckboxBtnProps(),

  emits: {
    'update:modelValue': (value: any) => true,
    'update:indeterminate': (val: boolean) => true,
  },

  setup (props, { slots, emit }) {
    const indeterminate = useProxiedModel(props, 'indeterminate')

    function onChange (v: any) {
      if (indeterminate.value) {
        indeterminate.value = false
      }

      emit('update:modelValue', v)
    }

    const falseIcon = computed(() => {
      return props.indeterminate
        ? props.indeterminateIcon
        : props.falseIcon
    })

    const trueIcon = computed(() => {
      return props.indeterminate
        ? props.indeterminateIcon
        : props.trueIcon
    })

    useRender(() => (
      <VSelectionControl
        { ...props }
        class="v-checkbox-btn"
        type="checkbox"
        inline
        onUpdate:modelValue={ onChange }
        falseIcon={ falseIcon.value }
        trueIcon={ trueIcon.value }
        aria-checked={ props.indeterminate ? 'mixed' : undefined }
        v-slots={ slots }
      />
    ))

    return {}
  },
})

export type VCheckboxBtn = InstanceType<typeof VCheckboxBtn>

export function filterCheckboxBtnProps (props: ExtractPropTypes<ReturnType<typeof makeVCheckboxBtnProps>>) {
  return pick(props, Object.keys(VCheckboxBtn.props) as any)
}
