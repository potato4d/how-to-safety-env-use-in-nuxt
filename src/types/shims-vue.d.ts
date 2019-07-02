import Vue from 'vue'
import { EnvironmentVariables } from '~/plugins/environments'

declare module 'vue/types/vue' {
  interface Vue {
    $environments: EnvironmentVariables
  }
}
